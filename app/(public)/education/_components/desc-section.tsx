import Image from "next/image";

const DescriptionSection = () => {
  return (
    <div className='flex flex-col text-center items-center gap-6 px-4 sm:px-6 lg:px-8 my-12'>
      <p className='text-3xl sm:text-3xl font-bold'>Apa Itu Fast Fashion?</p>
      <Image
        src={"/images/descimage.png"}
        width={1000}
        height={1000}
        alt='desc image'
        className='w-[500px] rounded-lg shadow-lg'
      />
      <p className='text-base sm:text-lg max-w-4xl'>
        Fast fashion adalah istilah yang digunakan untuk menggambarkan model
        bisnis di industri fashion yang berfokus pada produksi pakaian secara
        cepat, murah, dan dalam jumlah besar untuk merespons tren terbaru.
        Tujuan utamanya adalah memungkinkan konsumen mendapatkan produk fashion
        yang sedang populer dengan harga terjangkau, tetapi sering kali
        mengorbankan kualitas, keberlanjutan, dan etika kerja.
      </p>
    </div>
  );
};

export default DescriptionSection;
