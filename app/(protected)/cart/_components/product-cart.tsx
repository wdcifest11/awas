"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {useProductInCart} from "@/lib/local-storage";
import Image from "next/image";
import Link from "next/link";
import {FaRegTrashAlt} from "react-icons/fa";

const ProductInCart = ({
  selectedProducts,
  setSelectedProducts,
}: {
  selectedProducts: Record<string, boolean>;
  setSelectedProducts: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}) => {
  const {cart: productInCart, setProductInCart} = useProductInCart();
  const [selectedStores, setSelectedStores] = useState<{
    [storeSlug: string]: boolean;
  }>({});
  const [selectAll, setSelectAll] = useState(false);

  const groupedProducts = productInCart.reduce((acc, product) => {
    if (!acc[product.user.slug]) {
      acc[product.user.slug] = {seller: product.user, products: []};
    }
    acc[product.user.slug].products.push(product);
    return acc;
  }, {} as Record<string, {seller: any; products: any[]}>);

  const handleSelectProduct = (slug: string) => {
    setSelectedProducts((prev) => {
      const newSelected = {...prev, [slug]: !prev[slug]};

      const product = productInCart.find((p) => p.slug === slug);

      const storeSlug = product.user?.slug;
      if (!groupedProducts[storeSlug]) return newSelected;

      const allProductsSelected = groupedProducts[storeSlug].products.every(
        (p: any) => newSelected[p.slug]
      );

      setTimeout(() => {
        setSelectedStores((prevStores) => ({
          ...prevStores,
          [storeSlug]: allProductsSelected,
        }));
      }, 0);

      return newSelected;
    });
  };

  const handleSelectStore = (storeSlug: string) => {
    const newSelected = !selectedStores[storeSlug];
    const updatedProducts = {...selectedProducts};
    groupedProducts[storeSlug].products.forEach((product: any) => {
      updatedProducts[product.slug] = newSelected;
    });

    setSelectedStores((prev) => ({...prev, [storeSlug]: newSelected}));
    setSelectedProducts(updatedProducts);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const updatedProducts: {[slug: string]: boolean} = {};
    const updatedStores: {[storeSlug: string]: boolean} = {};

    productInCart.forEach((product) => {
      updatedProducts[product.slug] = newSelectAll;
      updatedStores[product.user.slug] = newSelectAll;
    });

    setSelectedProducts(updatedProducts);
    setSelectedStores(updatedStores);
  };

  const removeProductFromCart = (slug: string) => {
    const updatedCart = productInCart.filter(
      (product) => product.slug !== slug
    );
    setProductInCart(updatedCart);
    setTimeout(() => {
      window.dispatchEvent(new Event("storage"));
    }, 0);
  };

  return (
    <>
      {productInCart.length === 0 ? (
        <>
          <p className='text-lg font-semibold mt-4'>
            Tidak ada barang di keranjang
          </p>
          <Link href='/shop' className='font-semibold underline'>
            Kembali Belanja
          </Link>
        </>
      ) : (
        <>
          <div className='flex gap-2 items-center'>
            <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
            <p className='font-semibold'>Pilih Semua</p>
          </div>

          <ul>
            {Object.values(
              groupedProducts as Record<string, {seller: any; products: any[]}>
            ).map(({seller, products}) => (
              <li key={seller.slug}>
                <div className='flex gap-2 items-center my-auto mt-8 mb-4'>
                  <Checkbox
                    checked={selectedStores[seller.slug] || false}
                    onCheckedChange={() => handleSelectStore(seller.slug)}
                  />
                  <p className='font-semibold'>{seller.name}</p>
                  <span className='text-sm text-gray-500'>
                    {seller.location}
                  </span>
                </div>

                {products.map((product) => (
                  <div key={product.slug} className='flex gap-4 mb-4'>
                    <Checkbox
                      checked={selectedProducts[product.slug] || false}
                      onCheckedChange={() => handleSelectProduct(product.slug)}
                    />
                    <Link href={`/product/${product.slug}`}>
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        width={500}
                        height={500}
                        className='w-[100px] object-cover md:w-[100px] md:h-[100px] rounded-lg'
                      />
                    </Link>
                    <div className='space-y-1 w-full'>
                      <Link href={`/product/${product.slug}`}>
                        <h4 className='font-semibold line-clamp-2'>
                          {product.title}
                        </h4>
                        <p className='text-sm'>
                          {product.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </p>
                      </Link>
                      <Button
                        onClick={() => removeProductFromCart(product.slug)}
                        variant='ghost'
                        className='text-sm text-red-500 p-0 hover:bg-transparent hover:text-red-700 font-semibold'
                      >
                        <div className='flex gap-2 items-center'>
                          <FaRegTrashAlt className='w-7 h-7' />
                          <p>Hapus</p>
                        </div>
                      </Button>
                    </div>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default ProductInCart;
