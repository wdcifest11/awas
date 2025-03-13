"use client";

import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import {FiMessageCircle, FiUserCheck} from "react-icons/fi";
import {IoMdStar, IoMdStarHalf, IoMdStarOutline} from "react-icons/io";
import users from "@/data/users";
import products from "@/data/products";
import {motion} from "framer-motion";
import {useParams} from "next/navigation";
import {getUser} from "@/app/actions/auth";
import {UserType} from "@/types/user";

const UserProfile = () => {
  const {slug} = useParams();
  const user = users.find((u) => u.slug === slug);
  const [isFollowing, setIsFollowing] = useState(false);
  const [authenticatdUser, setAuthenticatedUser] = useState<
    UserType | null | undefined
  >(null);

  if (!user)
    return (
      <p className='text-center mt-20 text-gray-500'>User tidak ditemukan</p>
    );

  const handleSendMessage = () => {
    alert(`Mengirim pesan ke ${user.name}`);
  };

  const handleFollow = () => {
    !authenticatdUser && setIsFollowing(!isFollowing);
  };

  const getProductById = (productId: number) => {
    return products.find((product) => product.id === productId);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setAuthenticatedUser(user);
    };

    fetchUser();
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen p-4 md:p-8 rounded-xl'>
      <header className='flex flex-col md:flex-row items-center justify-between mb-6'>
        <h1 className='text-2xl md:text-4xl font-extrabold text-center md:text-left mb-4 md:mb-0'>
          Profil Pengguna
        </h1>
        <div className='flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto'>
          {!authenticatdUser && (
            <Button onClick={handleSendMessage}>
              <FiMessageCircle className='mr-2' /> Kirim Pesan
            </Button>
          )}
          <Button
            className={`
                ${isFollowing ? "bg-teal-700 text-white hover:bg-teal-700" : ""}
                transition duration-300 ease-in-out flex-1 md:flex-none
               
            `}
            onClick={handleFollow}
          >
            {isFollowing && <FiUserCheck className='mr-2' />}
            {authenticatdUser
              ? "Top Seller"
              : isFollowing
              ? "Diikuti"
              : "Ikuti"}
          </Button>
        </div>
      </header>

      <section className='bg-white rounded-2xl shadow-lg space-y-6'>
        <div className='flex flex-col md:flex-row items-center md:space-x-6 bg-gradient-to-r from-teal-600 to-100 rounded-t-xl p-4 text-white'>
          <div className='w-20 h-20 md:w-24 md:h-24 bg-zinc-900 rounded-full flex items-center justify-center mx-auto md:mx-0'>
            <span className='text-2xl md:text-3xl font-bold'>
              {user.name.charAt(0)}
            </span>
          </div>
          <div className='text-center md:text-left mt-4 md:mt-0'>
            <h2 className='text-xl md:text-3xl font-semibold'>{user.name}</h2>
            <p className='text-base md:text-lg'>{user.location}</p>
            <div className='flex items-center justify-center md:justify-start mt-3'>
              <span className='text-sm mr-2'>{user.rating}</span>
              <div className='flex'>
                {Array.from({length: 5}).map((_, index) => {
                  if (index < Math.floor(user.rating)) {
                    return (
                      <IoMdStar
                        className='w-4 h-4 md:w-5 md:h-5 text-yellow-400'
                        key={index}
                      />
                    );
                  } else if (index < user.rating) {
                    return (
                      <IoMdStarHalf
                        className='w-4 h-4 md:w-5 md:h-5 text-yellow-400'
                        key={index}
                      />
                    );
                  } else {
                    return (
                      <IoMdStarOutline
                        className='w-4 h-4 md:w-5 md:h-5 text-gray-100'
                        key={index}
                      />
                    );
                  }
                })}
              </div>
            </div>
            <p className='mt-2 text-sm md:text-base'>
              <span className='font-semibold'>{user.products.length}</span>{" "}
              Produk •{" "}
              <span className='font-semibold'>{user.products.length * 25}</span>{" "}
              Pengikut • <span className='font-semibold'>20</span> Mengikuti
            </p>
          </div>
        </div>

        <div className='p-4 md:p-8'>
          <h3 className='text-xl font-semibold'>Produk</h3>
          <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
            {user.products.map((product) => (
              <ProductCard {...product} key={product.slug} />
            ))}
          </ul>
        </div>
      </section>
      <section className='mt-6 md:mt-10'>
        <h3 className='text-xl font-bold mb-4 md:mb-6'>Ulasan</h3>
        <div className='space-y-4'>
          {user.reviews.map((review) => {
            const product = getProductById(review.productId);
            return (
              <motion.div
                key={review.id}
                className='bg-white p-4 md:p-6 rounded-xl shadow-md border border-gray-200'
                whileHover={{scale: 1.01}}
                transition={{type: "spring", stiffness: 300}}
              >
                <div className='flex flex-col md:flex-row items-start gap-4 md:gap-4'>
                  <div className='flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-teal-100 text-teal-600 font-bold rounded-full flex items-center justify-center mx-auto md:mx-0'>
                    {review.reviewerName.charAt(0)}
                  </div>
                  <div className='flex-1 w-full'>
                    <div className='flex flex-col md:flex-row items-start md:items-center justify-between w-full'>
                      <div>
                        <p className='text-base md:text-lg font-semibold'>
                          {review.reviewerName}
                        </p>
                        <p className='text-xs md:text-sm text-gray-500'>
                          {review.date}
                        </p>
                      </div>
                      <div className='flex items-center mt-2 md:mt-0'>
                        <span className='text-xs md:text-sm text-gray-500 mr-2'>
                          {review.rating}
                        </span>
                        <div className='flex'>
                          {Array.from({length: 5}).map((_, idx) => {
                            if (idx < Math.floor(review.rating)) {
                              return (
                                <IoMdStar
                                  className='w-3 h-3 md:w-5 md:h-5 text-yellow-500'
                                  key={idx}
                                />
                              );
                            } else if (idx < review.rating) {
                              return (
                                <IoMdStarHalf
                                  className='w-3 h-3 md:w-5 md:h-5 text-yellow-500'
                                  key={idx}
                                />
                              );
                            } else {
                              return (
                                <IoMdStarOutline
                                  className='w-3 h-3 md:w-5 md:h-5 text-gray-400'
                                  key={idx}
                                />
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                    <p className='text-base md:text-lg text-gray-800 mt-2 md:mt-3 italic'>
                      "{review.comment}"
                    </p>
                    {product && (
                      <div className='mt-3 md:mt-4 p-3 md:p-4 bg-gray-50 border rounded-lg flex flex-col md:flex-row items-center gap-3 md:gap-4'>
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className='w-12 h-12 md:w-16 md:h-16 object-cover rounded-md'
                        />
                        <div className='text-center md:text-left'>
                          <p className='text-sm md:text-md font-semibold'>
                            {product.title}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
