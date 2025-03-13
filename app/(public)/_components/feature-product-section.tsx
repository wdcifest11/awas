import Image from "next/image";
import Link from "next/link";

const FeatureProductSection = () => {
  return (
    <section className='px-4 md:px-8 lg:px-12'>
      <div className='grid md:grid-cols-2 gap-4 items-center'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl'>
          Lawan Fast Fashion <b>Pilih Preloved Fashion & Selamatkan Bumi!</b>
        </h2>
        <p className=''>
          Tidak perlu selalu membeli yang baru untuk tetap tampil keren. Dengan
          preloved fashion, kamu bisa menemukan pakaian unik, berkualitas, dan
          tetap menjaga lingkungan. Setiap pakaian bekas yang kita pakai kembali
          adalah langkah kecil dalam mengurangi limbah dan mendukung fashion
          yang lebih berkelanjutan. Jadi, sudah siap berburu harta karun
          fashionmu?{" "}
          <Link href='' className='font-semibold'>
            Pelajari lebih lanjut
          </Link>
        </p>
      </div>
      <div className='grid grid-cols-3 gap-2 my-12'>
        <Link
          href='/shop?genders=Pria'
          className='relative overflow-hidden rounded'
        >
          <Image
            src='/images/man-model-full.jpg'
            alt='a'
            width={1000}
            height={1000}
            className='w-full h-[600px] object-cover rounded-lg hover:scale-105 duration-300'
          />
          <div className='absolute bottom-0 p-4 bg-gradient-to-t from-black w-full'>
            <h3 className='text-sm md:text-lg font-semibold text-white'>
              Kategori Pria
            </h3>
            <p className='text-white text-[.7rem] sm:text-base'>
              Semua Jenis Pakaian Pria
            </p>
          </div>
        </Link>
        <div className='grid gap-2'>
          <Link
            href='/shop?categories=Jaket'
            className='relative overflow-hidden rounded'
          >
            <Image
              src='/images/man-tops.webp'
              alt='a'
              width={1000}
              height={1000}
              className='w-full h-[290px] rounded-lg object-cover  hover:scale-105 duration-300'
            />
            <div className='absolute bottom-0 p-4 bg-gradient-to-t from-black w-full'>
              <h3 className='text-sm md:text-lg font-semibold text-white'>
                Kategori Atasan
              </h3>
              <p className='text-white text-[.7rem] sm:text-base'>
                Semua Jenis Pakaian Atas
              </p>
            </div>
          </Link>
          <Link
            href='/shop?categories=Celana'
            className='relative overflow-hidden rounded'
          >
            <Image
              src='/images/woman-bottom.jpg'
              alt='a'
              width={1000}
              height={1000}
              className='w-full h-[290px] rounded-lg object-cover  hover:scale-105 duration-300'
            />
            <div className='absolute bottom-0 p-4 bg-gradient-to-t from-black w-full'>
              <h3 className='text-sm md:text-lg font-semibold text-white'>
                Kategori Bawahan
              </h3>
              <p className='text-white text-[.7rem] sm:text-base'>
                Semua Jenis Pakaian Bawah
              </p>
            </div>
          </Link>
        </div>
        <Link
          href='/shop?genders=Wanita'
          className='relative overflow-hidden rounded'
        >
          <Image
            src='/images/woman-model-full.jpg'
            alt='a'
            width={1000}
            height={1000}
            className='w-full h-[600px] object-cover rounded-lg hover:scale-105 duration-300'
          />
          <div className='absolute bottom-0 p-4 bg-gradient-to-t from-black w-full'>
            <h3 className='text-sm md:text-lg font-semibold text-white'>
              Kategori Wanita
            </h3>
            <p className='text-white text-[.7rem] sm:text-base'>
              Semua Jenis Pakaian Wanita
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default FeatureProductSection;
