import {IoIosPeople, IoIosWater} from "react-icons/io";
import {RiTShirtAirFill} from "react-icons/ri";
import {GiClothes} from "react-icons/gi";
import {MdAir} from "react-icons/md";
import Image from "next/image";

const EducationSection = () => {
  return (
    <section className='px-4 md:px-8 lg:px-12'>
      <h2 className='text-2xl md:text-4xl font-bold text-center'>
        Apa Itu Fast Fashion?
      </h2>
      <div className='w-full grid'>
        <p className='text-center mx-auto my-4 md:w-[80%]'>
          Fast fashion adalah model industri pakaian yang berfokus pada produksi
          cepat dan murah untuk mengikuti tren terbaru. Meskipun tampak
          menguntungkan bagi konsumen, sistem ini memiliki dampak besar terhadap
          lingkungan dan sosial.
        </p>
      </div>
      <div className='grid md:grid-cols-2 gap-6 items-center my-8'>
        <div className='grid gap-y-4 md:gap-y-8 mx-auto'>
          <h3 className='text-lg font-bold'>
            Dampak fast fashion terhadap lingkungan
          </h3>
          <div className='flex gap-2 items-center'>
            <GiClothes className='w-5 h-5' />
            <p className='font-semibold'>Limbah tekstil berlebih</p>
          </div>
          <div className='flex gap-2 items-center'>
            <IoIosWater className='w-5 h-5' />
            <p className='font-semibold'>Konsumsi air yang tinggi</p>
          </div>
          <div className='flex gap-2 items-center'>
            <RiTShirtAirFill className='w-5 h-5' />
            <p className='font-semibold'>Polusi mikroplastik</p>
          </div>
          <div className='flex gap-2 items-center'>
            <MdAir className='w-5 h-5' />
            <p className='font-semibold'>Emisi karbon yang tinggi</p>
          </div>
          <div className='flex gap-2 items-center'>
            <IoIosPeople className='w-5 h-5' />
            <p className='font-semibold'>Ekploitasi pekerja</p>
          </div>
        </div>
        <div>
          <Image
            src='/images/limbah-tekstil.webp'
            alt='Limbah Tekstil'
            width={500}
            height={500}
            className='rounded-lg w-[550px]'
          />
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
