"use client";

import {IoMdStar, IoMdStarHalf, IoMdStarOutline} from "react-icons/io";
import InformationModal from "./information-modal";
import AuthModals from "@/components/auth-modals";
import {RiInformation2Fill} from "react-icons/ri";
import {Button} from "@/components/ui/button";
import {getUser} from "@/app/actions/auth";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useAuth} from "@/context/auth";
import Image from "next/image";
import Link from "next/link";
import {ProductsType} from "@/types/products";

const ProductDescription = ({
  title,
  thumbnail,
  slug,
  brand,
  price,
  description,
  user,
  category,
  gender,
  sellingType,
  condition,
  size,
  type,
  isSold,
  likes,
  comments,
}: ProductsType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const formattedPrice = price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const [existingCart, setExistingCart] = useState<any>([]);
  const [authenticatdUser, setAuthenticatedUser] = useState<any>(null);
  const isProductInCart = existingCart.some((item: any) => item.slug === slug);
  const {isAuthenticated} = useAuth();
  const router = useRouter();
  const isAuthenticatedUser = authenticatdUser?.slug === user.slug;

  const product = [
    {
      title,
      thumbnail,
      slug,
      brand,
      price,
      user,
    },
  ];

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    } else {
      if (isAuthenticatedUser) {
        return;
      }
      if (!isProductInCart) {
        const updateCart = [
          ...existingCart,
          {slug, title, price, thumbnail, brand, user},
        ];
        localStorage.setItem("cart", JSON.stringify(updateCart));
        window.dispatchEvent(new Event("storage"));
      }
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    } else {
      if (isAuthenticatedUser) {
        return;
      }
      localStorage.setItem("orders", JSON.stringify(product));
      window.dispatchEvent(new Event("storage"));
      router.push("/checkout");
    }
  };

  useEffect(() => {
    setExistingCart(JSON.parse(localStorage.getItem("cart") || "[]"));

    const fetchUser = async () => {
      const user = await getUser();
      setAuthenticatedUser(user);
    };

    fetchUser();
  }, []);

  return (
    <div className='flex flex-col gap-y-6'>
      <div>
        <h3 className='text-xl font-semibold'>
          <span className='font-bold'>{isSold && "(Terjual)"}</span>
          {" " + title}
        </h3>
        <ul className='text-sm flex gap-4 items-center'>
          <li>{type}</li>
          <li>{condition}</li>
          <li>{size}</li>
          <li>{brand}</li>
        </ul>
        <h2 className='text-2xl font-semibold my-6'>{formattedPrice}</h2>
        <div className='grid gap-2'>
          <div className='grid w-full gap-4'>
            <div className='flex justify-between gap-4 items-center'>
              <Button
                // asChild
                className='w-full'
                disabled={isSold}
              >
                {!isAuthenticatedUser ? (
                  isAuthenticated ? (
                    <span className='block w-full' onClick={handleCheckout}>
                      Beli sekarang
                    </span>
                  ) : (
                    <span
                      className='block w-full'
                      onClick={() => setIsLoginModalOpen(true)}
                    >
                      Beli sekarang
                    </span>
                  )
                ) : (
                  <span>Produk Anda</span>
                )}
              </Button>
              <Button
                asChild
                variant='ghost'
                onClick={() => setIsModalOpen(!isModalOpen)}
                className='w-12 p-0'
              >
                <RiInformation2Fill className='text-100 hover:text-teal-500 hover:cursor-pointer w-12 h-12' />
              </Button>
            </div>
            <Button
              variant='outline'
              className='w-full border-100 text-teal-500 shadow-md py-5'
              disabled={isSold || isAuthenticatedUser}
              onClick={handleAddToCart}
            >
              {!isAuthenticatedUser
                ? isProductInCart
                  ? "Sudah di keranjang"
                  : "+ Keranjang"
                : "Produk Anda"}
            </Button>
          </div>
        </div>
      </div>
      <div className='prose prose-sm'>
        <h3>{description.title}</h3>
        <p>{description.name}</p>
        <ul>
          {description.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
        <span>{description.features.join(", ")}</span>
        <p>Kondisi {condition}</p>
      </div>
      <hr />
      <Link href={`/user/thrift-store`}>
        <div className='flex items-center gap-2'>
          <Image
            src='/images/clothes.png'
            alt='Profile'
            width={500}
            height={500}
            className='w-[50px] h-[50px] rounded-full'
          />
          <div className=''>
            <h4 className='font-semibold'>{user.name}</h4>
            <p className='text-sm'>{user.location}</p>
            <div className='flex gap-2 items-center'>
              <p className='text-sm'>{user.rating}</p>
              <div className='flex items-center'>
                {Array.from({length: 5}).map((_, index) => {
                  if (index < Math.floor(user.rating)) {
                    return (
                      <IoMdStar
                        className='w-5 h-5 text-yellow-500'
                        key={index}
                      />
                    );
                  } else if (index < user.rating) {
                    return (
                      <IoMdStarHalf
                        className='w-5 h-5 text-yellow-500'
                        key={index}
                      />
                    );
                  } else {
                    return (
                      <IoMdStarOutline
                        className='w-5 h-5 text-gray-400'
                        key={index}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </Link>
      {isModalOpen && (
        <InformationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <AuthModals
        isLoginModalOpen={isLoginModalOpen}
        isSignUpModalOpen={isSignUpModalOpen}
        isResetPasswordModalOpen={isResetPasswordModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        setIsSignUpModalOpen={setIsSignUpModalOpen}
        setIsResetPasswordModalOpen={setIsResetPasswordModalOpen}
      />
    </div>
  );
};

export default ProductDescription;
