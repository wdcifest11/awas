import Particles from "@/components/particles";
import {FaBookOpen, FaGift, FaHandshake, FaShoppingCart} from "react-icons/fa";
import {RiShirtFill} from "react-icons/ri";

const FeatureSection = () => {
  return (
    <section className='mx-auto px-4 flex flex-col relative'>
      <Particles style='w-[100px] md:w-[300px] h-[200px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
      <div className=' flex text-center flex-col'>
        <p className='text-3xl md:text-4xl lg:text-5xl font-bold'>
          Menuju Fashion Berkelanjutan dengan EcoWearHub
        </p>
        <div className='my-10'>
          <p>
            Kita bisa mengurangi dampak fast fashion dengan memilih alternatif
            yang lebih ramah lingkungan
          </p>
          <p className='font-bold'>
            EcoWearHub hadir sebagai solusi dengan beberapa fitur
          </p>
        </div>
      </div>
      <div className='flex flex-row flex-wrap justify-center items-center gap-5'>
        {[
          {
            title: "Jual Beli Pakaian",
            Icon: FaShoppingCart,
            desc: "Jual-Beli Pakaian Bekas Berkualitas",
          },
          {
            title: "Barter Pakaian",
            Icon: FaHandshake,
            desc: "Barter Pakaian dengan Mudah",
          },
          {
            title: "Sewa Pakaian",
            Icon: RiShirtFill,
            desc: "Sewa pakaian untuk keperluan Khusus",
          },
          {
            title: "Donasi & Perbaikan Pakaian",
            Icon: FaGift,
            desc: "Donasi dan Perbaikan pakaian dengan reward poin",
          },
          {
            title: "Artikel Edukatif",
            Icon: FaBookOpen,
            desc: "Artikel Edukatif tentang Fashion Berkelanjutan",
          },
        ].map(({title, Icon, desc}, index) => (
          <div
            key={index}
            className='w-[280px] md:w-[300px] lg:w-auto border bg-white rounded-lg p-8 flex flex-col items-center'
          >
            <div className='my-auto w-full'>
              <Icon
                className='w-10 h-10 mx-auto'
                style={{fill: "url(#gradient)"}}
              />
              <svg width='0' height='0'>
                <defs>
                  <linearGradient
                    id='gradient'
                    x1='0%'
                    y1='0%'
                    x2='100%'
                    y2='0%'
                  >
                    <stop offset='50%' stopColor='#43C6AC' />
                    <stop offset='100%' stopColor='#319795' />
                  </linearGradient>
                </defs>
              </svg>
              <div className='my-2'>
                <h3 className='text-lg font-semibold text-center'>{title}</h3>
                <p className='text-center'>{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
