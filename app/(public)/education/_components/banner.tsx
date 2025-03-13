import Image from "next/image";

export default function Banner() {
  return (
    <div className='w-screen relative h-[80vh] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-clip'>
      <Image
        src='/images/banner-edukasi.webp'
        alt='Banner Education'
        fill
        className='object-cover object-bottom brightness-50'
      />

      {/* Overlay Teks */}
      <div className='absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4'>
          Kurangi Fast Fashion
        </h1>
        <p className='text-lg sm:text-xl md:text-2xl font-medium'>
          Beli Barang Second, Perbaiki Gaya, Perbaiki Bumi
        </p>
      </div>
    </div>
  );
}
