import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative w-screen h-[80vh] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      {/* Gambar Banner */}
      <Image
        src="/images/banner-cara-kerja.webp" 
        alt="Banner Cara Kerja"
        fill
        className="object-cover object-bottom brightness-50"
      />

      {/* Overlay Teks */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Mulai Langkah Mudah Anda di Sini
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-medium">
          Temukan cara mudah untuk menjual, membeli, menukar dan menyewa barang bekas
        </p>
      </div>
    </div>
  );
}