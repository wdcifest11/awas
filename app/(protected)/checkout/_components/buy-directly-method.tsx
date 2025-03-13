import {Button} from "@/components/ui/button";
import Image from "next/image";
import {AiFillInfoCircle} from "react-icons/ai";

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

const BuyDirectlyMethod = () => {
  return (
    <>
      <div className='p-4 xxs:text-[.8rem] text-sm flex flex-col items-start sm:flex-row sm:items-center gap-2'>
        <AiFillInfoCircle className='w-5 h-5 text-100' />
        <div className='text-teal-700'>
          <p>
            Anda dapat membeli produk ini secara langsung dengan harga penuh.
          </p>
          <p>Setelah pembayaran selesai, barang akan menjadi milik Anda.</p>
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
              // onChange={(e) => setmethodmentMethod(e.target.value)}
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

export default BuyDirectlyMethod;
