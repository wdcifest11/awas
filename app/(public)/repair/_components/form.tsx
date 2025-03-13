"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useState} from "react";

const RepairForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [points, setPoints] = useState(0);
  const [quantity, setQuantity] = useState("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form Submitted", {name, description, image});
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) || 0;
    setQuantity(event.target.value);
    setPoints(value * 100);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <label className='block font-medium text-gray-700'>Nama</label>
      <Input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='w-full'
        placeholder='Masukkan nama Anda'
      />

      <label className='block font-medium text-gray-700'>
        Deskripsi Perbaikan
      </label>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='w-full'
        placeholder='Jelaskan kerusakan pakaian Anda'
      ></Textarea>
      <div>
        <label className='block font-medium text-gray-700'>Alamat</label>
        <Textarea
          // value={description}
          // onChange={(e) => setDescription(e.target.value)}
          className='w-full'
          placeholder='Masukkan Alamat Lengkap'
        ></Textarea>
      </div>

      <div>
        <label className='block font-medium text-gray-700'>
          Jumlah Pakaian
        </label>
        <Input
          type='number'
          value={quantity}
          onChange={handleQuantityChange}
          className='w-full'
          placeholder='Masukkan jumlah pakaian yang ingin diperbaiki'
        />
        {points > 0 && (
          <div className='flex gap-2 items-center'>
            <p className='mt-2 text-teal-600'>
              Anda akan mendapatkan {points} poin!
            </p>
          </div>
        )}
      </div>

      <label className='block font-medium text-gray-700'>Upload Gambar</label>
      <Input
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        className='w-full'
      />
      {image && (
        <div className='mt-4'>
          <img
            src={URL.createObjectURL(image)}
            alt='Preview'
            className='h-40 rounded-lg shadow-md'
          />
        </div>
      )}

      <Button type='submit' className='w-full'>
        Kirim Perbaikan
      </Button>
    </form>
  );
};

export default RepairForm;
