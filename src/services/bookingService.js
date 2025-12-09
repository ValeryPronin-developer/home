import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const bookingsRef = collection(db, "bookings");

export function datesOverlap(aStart, aEnd, bStart, bEnd) {
  // Полуоткрытые интервалы [start, end): день выезда свободен для следующего гостя
  return aStart < bEnd && aEnd > bStart;
}

export async function fetchBookings() {
  const snapshot = await getDocs(bookingsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function createBooking({ start, end, name, phone, email, existingBookings }) {
  const existing = existingBookings && existingBookings.length
    ? existingBookings
    : await fetchBookings();

  const hasOverlap = existing.some((b) =>
    datesOverlap(start, end, b.start, b.end),
  );

  if (hasOverlap) {
    const err = new Error("Эти даты уже забронированы.");
    err.code = "dates-overlap";
    throw err;
  }

  const docRef = await addDoc(bookingsRef, {
    start,
    end,
    name,
    phone,
    email,
    createdAt: serverTimestamp(),
  });

  return { id: docRef.id, start, end, name, phone, email };
}

