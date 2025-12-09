const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// SMTP конфиг берём из переменных среды Functions (firebase functions:config:set smtp.user=... smtp.pass=... smtp.host=... smtp.port=465)
const mailUser = process.env.SMTP_USER || functions.config().smtp?.user;
const mailPass = process.env.SMTP_PASS || functions.config().smtp?.pass;
const mailHost = process.env.SMTP_HOST || functions.config().smtp?.host;
const mailPort = Number(process.env.SMTP_PORT || functions.config().smtp?.port || 465);
const mailTo = process.env.BOOKING_NOTIFY_TO || functions.config().booking?.to || "vproninn@ya.ru";

const transporter = nodemailer.createTransport({
  host: mailHost,
  port: mailPort,
  secure: mailPort === 465,
  auth: {
    user: mailUser,
    pass: mailPass,
  },
});

exports.onBookingCreated = functions.firestore
  .document("bookings/{bookingId}")
  .onCreate(async (snap) => {
    const data = snap.data();
    if (!data) return null;

    const { start, end, name, phone, email } = data;
    const subject = `Новая бронь: ${start} — ${end}`;
    const text = [
      "Получена новая бронь",
      "",
      `Даты: ${start} — ${end}`,
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Email: ${email}`,
      "",
      "Документ:",
      `bookings/${snap.id}`,
    ].join("\n");

    if (!mailUser || !mailPass || !mailHost) {
      console.warn("SMTP не сконфигурирован. Пропускаю отправку письма.");
      return null;
    }

    await transporter.sendMail({
      from: `"Holiday Home" <${mailUser}>`,
      to: mailTo,
      subject,
      text,
    });

    return null;
  });

