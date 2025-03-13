"use client";

import {useMemo, useState} from "react";
import {useProductInCart} from "@/lib/local-storage";
import ProductInCart from "./_components/product-cart";
import ProductCartCheckout from "./_components/product-cart-checkout";

const CartPage = () => {
  const {cart: productInCart} = useProductInCart();
  const [selectedProducts, setSelectedProducts] = useState<{
    [slug: string]: boolean;
  }>({});

  const selectedItems = useMemo(() => {
    return productInCart.filter((product) => selectedProducts[product.slug]);
  }, [productInCart, selectedProducts]);

  return (
    <section className='px-4 md:px-8 lg:px-12 relative'>
      <h3 className='text-xl font-semibold'>Keranjang</h3>
      <div className='grid md:flex md:justify-between gap-4 my-8'>
        <div className='w-full min-h-screen'>
          <ProductInCart
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        </div>
        <div className='md:min-h-screen w-full md:w-1/2 relative'>
          <ProductCartCheckout selectedItems={selectedItems} />
        </div>
      </div>
    </section>
  );
};

export default CartPage;
