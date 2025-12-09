import GalleryGrid from "../components/GalleryGrid";

const images = [
  "https://srub.store/wa-data/public/shop/products/21/19/1921/images/8077/8077.970.jpg",
  "https://srub.store/wa-data/public/shop/products/21/19/1921/images/8077/8077.970.jpg",
  "https://srub.store/wa-data/public/shop/products/21/19/1921/images/8077/8077.970.jpg",
  "https://srub.store/wa-data/public/shop/products/21/19/1921/images/8077/8077.970.jpg",
  "https://img.samoletplus.ru/insecure/plain/s3://smltplus-public-media/article-block-images/a11ef2ddc56b4c4c84f396ead0592dd0.jpg",
  "https://srub.store/wa-data/public/shop/products/21/19/1921/images/8077/8077.970.jpg",
  "https://srub.store/wa-data/public/shop/products/21/19/1921/images/8077/8077.970.jpg",
  "https://srub.store/wa-data/public/shop/products/21/19/1921/images/8077/8077.970.jpg",
];

export default function Gallery() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-600">Галерея</p>
          <h1 className="text-3xl font-semibold">Дом внутри и снаружи</h1>
        </div>
      </div>
      <GalleryGrid images={images} />
    </main>
  );
}

