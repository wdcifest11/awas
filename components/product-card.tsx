"use client";

import Image from "next/image";
import Link from "next/link";
import {IoMdStar, IoMdStarHalf, IoMdStarOutline} from "react-icons/io";
import {MdOutlineAddShoppingCart} from "react-icons/md";
import {useEffect, useState} from "react";
import {useAuth} from "@/context/auth";
import {getUser} from "@/app/actions/auth";
import AuthModals from "./auth-modals";

export interface ProductCardProps {
  slug: string;
  title: string;
  price: number;
  brand: string;
  thumbnail: string;
  user: {
    name: string;
    slug: string;
    rating: number;
  };
  isSold: boolean;
}

const ProductCard = ({
  slug,
  title,
  price,
  thumbnail,
  brand,
  user,
  isSold,
}: ProductCardProps) => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [existingCart, setExistingCart] = useState<any>([]);
  const [authenticatdUser, setAuthenticatedUser] = useState<any>(null);
  const isProductInCart = existingCart.some((item: any) => item.slug === slug);
  const {isAuthenticated} = useAuth();
  const isAuthenticatedUser = authenticatdUser?.slug === user.slug;

  const formattedPrice = price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

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

  useEffect(() => {
    setExistingCart(JSON.parse(localStorage.getItem("cart") || "[]"));

    const fetchUser = async () => {
      const user = await getUser();
      setAuthenticatedUser(user);
    };

    fetchUser();
  }, []);

  return (
    <>
      <li className='shadow-sm bg-white rounded-md overflow-hidden relative'>
        <div className='absolute top-0 z-10'>
          {isSold && (
            <span className='text-[.8rem] w-full rounded-br-lg block bg-gradient-to-r from-teal-600 to-100 text-white md:text-sm font-semibold p-1 md:p-2 px-6'>
              Terjual
            </span>
          )}
        </div>
        <div className='relative'>
          <button
            onClick={handleAddToCart}
            disabled={isSold || isAuthenticatedUser}
            className='absolute top-3 right-3 p-2 px-2.5 rounded-full z-10 border-2 border-gray-200 bg-gray-50 hover:bg-gray-100 duration-300'
          >
            <MdOutlineAddShoppingCart className='w-4 h-4 md:w-6 md:h-6' />
          </button>
          <Link href={`/product/${slug}`} className='block'>
            <Image
              src={thumbnail}
              alt={title}
              width={300}
              height={300}
              className='w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-t-md object-cover hover:cursor-pointer hover:scale-105 transition-transform duration-300'
            />

            <div className='grid my-2 p-2 px-4'>
              <div className='flex flex-col sm:flex-row justify-between'>
                <h3 className='text-sm lg:text-lg font-semibold'>
                  {title.substring(0, 23)}...
                </h3>
              </div>
              <div className='flex items-center my-1'>
                {Array.from({length: 5}).map((_, index) => {
                  if (index < Math.floor(user.rating)) {
                    return (
                      <IoMdStar
                        className='w-3 h-3 lg:w-5 lg:h-5 text-yellow-500'
                        key={index}
                      />
                    );
                  } else if (index < user.rating) {
                    return (
                      <IoMdStarHalf
                        className='w-3 h-3 lg:w-5 lg:h-5 text-yellow-500'
                        key={index}
                      />
                    );
                  } else {
                    return (
                      <IoMdStarOutline
                        className='w-3 h-3 lg:w-5 lg:h-5 text-gray-400'
                        key={index}
                      />
                    );
                  }
                })}
                <span className='text-[.8rem] sm:text-sm'>({user.rating})</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm lg:text-md font-semibold block'>
                  {formattedPrice}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </li>

      <AuthModals
        isLoginModalOpen={isLoginModalOpen}
        isSignUpModalOpen={isSignUpModalOpen}
        isResetPasswordModalOpen={isResetPasswordModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        setIsSignUpModalOpen={setIsSignUpModalOpen}
        setIsResetPasswordModalOpen={setIsResetPasswordModalOpen}
      />
    </>
  );
};

export default ProductCard;
