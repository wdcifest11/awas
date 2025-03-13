"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function DIYGuides() {
  const guides = [
    {
      id: 1,
      title: "Menjahit Lubang",
      videoUrl: "https://www.youtube.com/embed/mytiObraCSY",
    },
    {
      id: 2,
      title: "Mengganti Resleting",
      videoUrl: "https://www.youtube.com/embed/JPQFqJ_9N28",
    },
    {
      id: 3,
      title: "Menambal Robekan",
      videoUrl: "https://www.youtube.com/embed/q73Df5lHHps",
    },
  ];

  return (
    <section className='bg-white p-6 md:p-8 lg:p-10 rounded-xl shadow-lg mb-8 w-full'>
      <h2 className='text-xl md:text-2xl font-semibold text-[#43C6AC] text-center mb-6'>
        Panduan DIY untuk Memperbaiki Pakaian 🛠️
      </h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        breakpoints={{
          640: {slidesPerView: 1}, // 1 item di layar kecil
          768: {slidesPerView: 2}, // 2 item di tablet
          1024: {slidesPerView: 3}, // 3 item di desktop
        }}
        navigation
        pagination={{clickable: true}}
        autoplay={{delay: 3000}}
        className='w-full'
      >
        {guides.map((guide) => (
          <SwiperSlide key={guide.id} className='flex flex-col items-center'>
            <div className='w-full max-w-sm md:max-w-md lg:max-w-lg aspect-video'>
              <iframe
                src={guide.videoUrl}
                title={guide.title}
                allowFullScreen
                className='w-full h-full rounded-lg'
              ></iframe>
            </div>
            <p className='text-gray-700 mt-3 text-sm md:text-base'>
              {guide.title}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
