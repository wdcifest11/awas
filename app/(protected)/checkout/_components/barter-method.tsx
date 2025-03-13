"use client";

import ErrorMessages from "@/components/error-message";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {SelectContent} from "@radix-ui/react-select";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {AiFillInfoCircle} from "react-icons/ai";
import {getUser} from "@/app/actions/auth";

const BarterMethod = ({orders}: {orders: any}) => {
  const [authenticatedUser, setAuthenticatedUser] = useState<any | null>(null);
  const productUser = authenticatedUser?.products ?? [];
  const isUserHaveProduct = !!authenticatedUser?.products?.length;
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const productLocation = orders.map((order: any) => order.user.location);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setAuthenticatedUser(user);
    };
    fetchUser();
  }, []);

  const handleBarterMethodClick = () => {
    if (
      !authenticatedUser ||
      !Array.isArray(productLocation) ||
      !productLocation.includes(authenticatedUser.location)
    )
      return;
  };

  return (
    <>
      <div className='p-4 xxs:text-[.8rem] text-sm flex flex-col items-start sm:flex-row sm:items-center gap-2'>
        <AiFillInfoCircle className='w-5 h-5 text-100' />
        <div className='text-teal-700'>
          <p>
            Anda dapat menukar produk ini dengan produk lain yang Anda miliki.
          </p>
          <p>
            Dengan ketentuan produk memiliki nilai tukar yang sama (tidak lebih
            dan kurang).
          </p>
        </div>
      </div>
      {!productLocation.includes(authenticatedUser?.location) && (
        <div className='text-center w-full my-4'>
          <div className='w-[80%] mx-auto'>
            <ErrorMessages
              errors={`Lokasi produk (${productLocation}) tidak sesuai dengan lokasi Anda (${authenticatedUser?.location}). Silahkan pilih produk lain dengan kota yang sama.`}
            />
          </div>
        </div>
      )}
      <div>
        <div className='my-2'>
          {isUserHaveProduct ? (
            <>
              <p className='text-md font-semibold mb-2'>
                Produkmu yang ingin ditukar
              </p>
              <Select onValueChange={(value) => setSelectedProduct(value)}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Pilih produk' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className='w-full bg-white'>
                    <SelectLabel>Pilih produk</SelectLabel>
                    {productUser.map((product: any) => (
                      <SelectItem
                        key={product.slug}
                        value={product.slug}
                        className='line-clamp-1'
                      >
                        {product.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {selectedProduct && (
                <ul className='my-4'>
                  {productUser
                    .filter((product: any) => product.slug === selectedProduct)
                    .map((filteredProduct: any) => (
                      <ProductBarterCard
                        order={filteredProduct}
                        key={filteredProduct.slug}
                      />
                    ))}
                </ul>
              )}
            </>
          ) : (
            <>
              <h3 className='font-semibold my-4'>
                Anda belum memiliki produk. Isi form dibawah ini
              </h3>
              <form action='' method='post'>
                <div className='grid gap-4'>
                  <div>
                    <Input type='file' multiple accept='image/*' />
                    <span className='text-xs'>
                      Pilih lebih dari 1 gambar, untuk kejelasan produk.
                    </span>
                  </div>
                  <div>
                    <Textarea
                      id='description'
                      name='description'
                      rows={3}
                      placeholder='Deskripsi Produk (Ukuran, Warna, dll)'
                    ></Textarea>
                  </div>
                  <div>
                    <Input
                      type='text'
                      placeholder='Kondisi (Robek, Bagus, Sangat Bagus)'
                    />
                  </div>
                  <div>
                    <Input type='text' placeholder='Harga Produk' />
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
        <p className='text-md font-semibold mb-2'>Produk dari penjual</p>
        <ul className='grid gap-2'>
          {Array.isArray(orders) &&
            orders.map((order: any) => (
              <ProductBarterCard order={order} key={order.slug} />
            ))}
        </ul>
      </div>

      <div className='w-full flex justify-end'>
        <Button className='my-8' onClick={handleBarterMethodClick}>
          Lanjut
        </Button>
      </div>
    </>
  );
};

export const ProductBarterCard = ({order}: {order: any}) => {
  return (
    <li className='flex justify-between gap-8 items-center'>
      <div className='flex gap-4 items-center'>
        <Image
          src={order.thumbnail}
          alt=''
          width={500}
          height={500}
          className='w-[70px] h-[70px] object-cover rounded-lg'
        />
        <div className='grid gap-2'>
          <p className='font-semibold line-clamp-2'>{order.title}</p>
          <p className='text-gray-500'>
            {order.price.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
        </div>
      </div>
    </li>
  );
};

export default BarterMethod;
