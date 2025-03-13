"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import dynamic from "next/dynamic";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {BsCoin} from "react-icons/bs";

const DynamicComponentWithNoSSR = dynamic(() => import("../_components/map"), {
  ssr: false,
});

const DonationForm = () => {
  const [donorName, setDonorName] = useState("");
  const [selectedOrphanage, setSelectedOrphanage] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [points, setPoints] = useState(0);
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) || 0;
    setQuantity(event.target.value);
    setPoints(value * 1000);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted", {
      donorName,
      selectedOrphanage,
      description,
      quantity,
      points,
      image,
    });
  };

  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center mb-12'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-6xl mx-auto space-y-6 bg-white p-6 shadow-lg rounded-lg'
      >
        {/* Peta */}
        <div>
          <label className='block font-medium text-gray-700 mb-2'>
            Pilih Panti Asuhan
          </label>
          <DynamicComponentWithNoSSR
            key={selectedOrphanage}
            onSelectOrphanage={setSelectedOrphanage}
          />
          {selectedOrphanage && (
            <p className='text-center mt-2 text-green-600'>
              ✅ Anda memilih: {selectedOrphanage}
            </p>
          )}
        </div>

        {/* Nama Pendonasi */}
        <div>
          <label className='block font-medium text-gray-700'>
            Nama Pendonasi
          </label>
          <Input
            type='text'
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className='w-full'
            placeholder='Masukkan nama Anda'
          />
        </div>

        {/* Upload Gambar */}
        <div>
          <label className='block font-medium text-gray-700'>
            Upload Gambar
          </label>
          <Input
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            className='w-full p-2'
          />
          {image && (
            <div className='mt-4'>
              <img
                src={URL.createObjectURL(image)}
                alt='Preview Donasi'
                className='h-40 rounded-lg shadow-md'
              />
            </div>
          )}
        </div>

        {/* Jumlah Pakaian */}
        <div>
          <label className='block font-medium text-gray-700'>
            Jumlah Pakaian
          </label>
          <Input
            type='number'
            value={quantity}
            onChange={handleQuantityChange}
            className='w-full'
            placeholder='Masukkan jumlah pakaian yang ingin didonasikan'
          />
          {points > 0 && (
            <div className='flex gap-2 items-center'>
              <p className='mt-2 text-teal-600'>
                Anda akan mendapatkan {points} poin!
              </p>
            </div>
          )}
        </div>

        {/* Deskripsi */}
        <div>
          <label className='block font-medium text-gray-700'>Deskripsi</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full'
            placeholder='Deskripsikan pakaian yang akan didonasikan'
          ></Textarea>
        </div>

        {/* Tombol Submit */}
        <Button className='w-full'>Donasi Sekarang</Button>
      </form>
    </div>
  );
};

export default DonationForm;
