"use client";

import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {IoMdCloseCircle} from "react-icons/io";
import BuyDirectlyMethod from "./buy-directly-method";
import BarterMethod from "./barter-method";
import RentMethod from "./rent-method";

const OrderModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;
  const [selectedMethod, setSelectedMethod] = useState("Beli Langsung");
  const [storedOrders, setStoredOrders] = useState([]);
  useEffect(() => {
    setStoredOrders(JSON.parse(localStorage.getItem("orders") || "null"));
  }, []);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-2 z-20'>
      <div className='bg-white md:w-1/2 p-6 rounded-lg shadow-lg h-[80vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold'>Pilih Metode Pembelian</h2>
          <button onClick={onClose}>
            <IoMdCloseCircle className='w-7 h-7 text-foreground' />
          </button>
        </div>

        <div className='flex flex-wrap w-full gap-4'>
          {["Beli Langsung", "Barter", "Sewa"].map((method) => (
            <Button
              key={method}
              className={`py-2 px-4
                ${
                  selectedMethod === method
                    ? "text-white"
                    : "bg-gray-200 text-black "
                }
              `}
              onClick={() => setSelectedMethod(method)}
            >
              {method}
            </Button>
          ))}
        </div>

        <div className='w-full mt-4'>
          {selectedMethod === "Beli Langsung" && <BuyDirectlyMethod />}
          {selectedMethod === "Barter" && (
            <BarterMethod orders={storedOrders} />
          )}
          {selectedMethod === "Sewa" && <RentMethod orders={storedOrders} />}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
