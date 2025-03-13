"use client";

import {motion} from "framer-motion";
import RepairForm from "./_components/form";
import DIYSection from "./_components/diy-section";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("./_components/map"), {
  ssr: false,
});

const RepairPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-start md:px-4 py-8'>
      <h1 className='text-3xl md:text-4xl font-bold text-center'>
        Perbaiki Pakaianmu, Kurangi Limbah!
      </h1>

      <p className='text-gray-700 mt-4 max-w-4xl text-center text-lg md:text-xl lg:text-xl'>
        Setiap jahitan yang kamu buat adalah langkah menuju dunia tanpa limbah.
        Cari penjahit terdekat atau kirim permintaan perbaikan dalam beberapa
        klik. Yuk, kurangi limbah bersama!
      </p>

      {/* Daftar Penjahit */}
      <div className='mt-10 w-full max-w-3xl lg:max-w-6xl'>
        <DynamicComponentWithNoSSR />
      </div>

      {/* Form Perbaikan - Lebih Optimal di Mobile */}
      <div className='mt-6 w-full max-w-md md:max-w-lg lg:max-w-6xl bg-white p-4 md:p-6 rounded-lg shadow-md'>
        <RepairForm />
      </div>
    </div>
  );
};

export default RepairPage;
