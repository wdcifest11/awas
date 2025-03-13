"use client";

import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {FaRegTrashAlt} from "react-icons/fa";
import OrderModal from "./order-modal";
import ErrorMessages from "@/components/error-message";
import {getUser} from "@/app/actions/auth";
import Cookies from "js-cookie";
import {LuTicketPercent} from "react-icons/lu";
import {Input} from "@/components/ui/input";

type Order = {
  slug: string;
  thumbnail: string;
  title: string;
  price: number;
};

const OrderInformation = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [authenticatedUser, setAuthenticatedUser] = useState<any | null>(null);
  const isAddressFilled = !!authenticatedUser?.address;

  const totalItem = orders.length;
  const totalPrice = orders.reduce((sum, order) => sum + order.price, 0);

  const handleRemove = (slug: string) => {
    if (orders.length === 1) {
      setMessage("Pesananan tidak bisa dihapus. Minimal harus ada 1 pesanan.");
      return;
    }

    const updatedOrders = orders.filter((order) => order.slug !== slug);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const handleOrderModal = () => {
    if (!Cookies.get("user")) {
      setMessage("Alamat pengiriman belum diisi");
      return;
    } else {
      setMessage(null);
    }
    setIsOrderModalOpen(true);
  };

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "null");
    if (storedOrders) {
      setOrders(Array.isArray(storedOrders) ? storedOrders : [storedOrders]);
    }

    const fetchUser = async () => {
      const user = await getUser();
      setAuthenticatedUser(user);
    };

    fetchUser();
  }, []);

  return (
    <div className='mx-auto'>
      <h3 className='text-xl font-semibold mb-8'>Produk Dipesan</h3>
      <ul className='grid gap-2'>
        {orders.map((order) => (
          <li
            key={order.slug}
            className='flex justify-between gap-8 items-center'
          >
            <Link
              href={`/product/${order.slug}`}
              className='flex gap-4 items-center'
            >
              <Image
                src={order.thumbnail}
                alt=''
                width={500}
                height={500}
                className='w-[70px] h-[70px] object-cover rounded-lg'
              />
              <div className='grid gap-2'>
                <p className='font-semibold line-clamp-2  '>{order.title}</p>
                <p className='text-gray-500'>
                  {order.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
              </div>
            </Link>
            <Button
              variant='ghost'
              className='text-red-500 hover:bg-transparent hover:text-red-600'
              onClick={() => handleRemove(order.slug)}
            >
              <FaRegTrashAlt className='w-7 h-7' />
            </Button>
          </li>
        ))}
      </ul>
      <div className='my-6'>
        <div className='flex justify-between'>
          <p>Total item</p>
          <p>{totalItem} Item</p>
        </div>
        <hr className='my-2' />
        <div className='flex justify-between'>
          <h4 className='font-semibold'>Total Bayar</h4>
          <h4 className='font-semibold'>
            {totalPrice.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </h4>
        </div>
      </div>
      <div className='flex items-center gap-4 relative'>
        <LuTicketPercent className='top-[.35rem] left-3 w-6 h-6 text-gray-300 absolute' />
        <Input placeholder='Gunakan Voucher' className='mb-4 pl-10 pr-4 py-2' />
      </div>
      <Button className='w-full mb-2' onClick={handleOrderModal}>
        Pilih Metode Pembelian
      </Button>
      <ErrorMessages errors={message} />
      {isOrderModalOpen && (
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OrderInformation;
