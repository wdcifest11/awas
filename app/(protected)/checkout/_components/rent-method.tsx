"use client";

import {Button} from "@/components/ui/button";
import Image from "next/image";
import {AiFillInfoCircle} from "react-icons/ai";
import {ProductBarterCard} from "./barter-method";
import {useState} from "react";

const paymentMethods = [
  {
    name: "BCA",
    description: "Bayar dengan transfer ke rekening BCA",
    imageUrl: "/images/bca.webp",
  },
  {
    name: "BRI",
    description: "Bayar dengan transfer ke rekening BRI",
    imageUrl: "/images/bri.webp",
  },
  {
    name: "BNI",
    description: "Bayar dengan transfer ke rekening BNI",
    imageUrl: "/images/bni.webp",
  },
  {
    name: "Mandiri",
    description: "Bayar dengan transfer ke rekening Mandiri",
    imageUrl: "/images/mandiri.webp",
  },
  {
    name: "QRIS",
    description: "Bayar dengan scan QRIS",
    imageUrl: "/images/qris.jpg",
  },
];

const RentMethod = ({orders}: {orders: any}) => {
  const [rentalDays, setRentalDays] = useState(1);
  const rentalPricePerDay = 20000;

  const totalPrice = rentalDays * rentalPricePerDay;

  return (
    <>
      <div className='p-4 xxs:text-[.8rem] text-sm flex flex-col items-start sm:flex-row sm:items-center gap-2'>
        <AiFillInfoCircle className='w-5 h-5 text-100' />
        <div className='text-teal-700'>
          <p>
            Pilih berapa lama Anda akan menyewa produk ini dan pilih metode
            pembayaran.
          </p>
          <p>Setelah pembayaran selesai, barang dapat disewa.</p>
        </div>
      </div>
      <p className='text-md font-semibold mb-2'>Produk akan disewa</p>
      <ul className='grid gap-2'>
        {Array.isArray(orders) &&
          orders.map((order: any) => (
            <ProductBarterCard order={order} key={order.slug} />
          ))}
      </ul>
      <div className='mt-4'>
        <div className='flex justify-between mb-4'>
          <div className='flex items-center gap-2'>
            <label className='font-medium'>Lama Sewa (hari):</label>
            <input
              type='number'
              min='1'
              value={rentalDays}
              onChange={(e) => setRentalDays(Number(e.target.value))}
              className='border px-3 py-1 rounded-md w-20 text-center'
            />
          </div>
          <p className='font-semibold'>
            Total Harga: Rp {totalPrice.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
      <div className='rounded-lg grid grid-cols-2'>
        {paymentMethods.map((method) => (
          <label
            key={method.name}
            className='hover:cursor-pointer shadow-sm shadow-slate-200 p-2 bg-background hover:bg-gray-100 duration-300 rounded-md my-2 payment relative'
          >
            <input
              name='payments_method'
              className='opacity-0 absolute'
              value={method.name}
              type='radio'
            ></input>
            <Image
              src={method.imageUrl}
              width={100}
              height={100}
              className='my-auto rounded-lg'
              alt={method.name}
            />
            <span className='text-slate-900 text-xs p-2'>
              {method.description}
            </span>
          </label>
        ))}
      </div>
      <div className='w-full flex justify-end'>
        <Button className='my-8'>Lanjut</Button>
      </div>
    </>
  );
};

export default RentMethod;
