import ErrorMessages from "@/components/error-message";
import {LuTicketPercent} from "react-icons/lu";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {useState} from "react";

const ProductCartCheckout = ({selectedItems}: {selectedItems: any}) => {
  const [message, setMessage] = useState("");
  const totalPrice = selectedItems.reduce(
    (sum: any, product: any) => sum + product.price,
    0
  );

  const router = useRouter();

  const handleCheckout = () => {
    localStorage.setItem("orders", JSON.stringify(selectedItems));
    selectedItems.length > 0
      ? router.push("/checkout")
      : setMessage("Mohon pilih produk terlebih dahulu");
  };

  return (
    <div className='flex flex-col w-full fixed md:sticky p-2 px-4 rounded-md bg-background left-0 right-0 bottom-0 md:left-20 md:right-20 lg:top-20 lg:left-0 lg:right-0 gap-2 z-20'>
      <h4 className='text-md font-semibold'>Ringkasan Belanja</h4>
      <div className='flex justify-between'>
        <p>Total</p>
        <p>
          {totalPrice.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>
      </div>
      <hr className='my-4' />
      <div className='flex items-center gap-4 relative'>
        <LuTicketPercent className='top-[.35rem] left-3 w-6 h-6 text-gray-300 absolute' />
        <Input placeholder='Gunakan Voucher' className='mb-4 pl-10 pr-4 py-2' />
      </div>
      <Button className='w-full' onClick={handleCheckout}>
        Checkout
      </Button>
      <ErrorMessages errors={message} />
    </div>
  );
};

export default ProductCartCheckout;
