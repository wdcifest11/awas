"use client";

import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import ProductCard from "@/components/product-card";
import products from "@/data/products";

const ProductSection = () => {
  return (
    <section className='px-4 md:px-8 lg:px-12 container'>
      <div className='relative w-full'>
        <button
          onClick={() => {
            document
              .getElementById("scroll-container")
              ?.scrollBy({left: -200, behavior: "smooth"});
          }}
          className='absolute -left-3 top-1/2 -translate-y-1/2 p-0 bg-gradient-to-l from-100 to-teal-300 rounded-full shadow-md z-10'
        >
          <IoIosArrowBack className='text-white w-10 h-10' />
        </button>
        <div
          id='scroll-container'
          className='flex relative xxs:w-[280px] xs:w-[320px] py-4 sm:w-[600px] md:w-[700px] lg:w-full overflow-x-auto snap-mandatory snap-x mx-auto scrollbar-none'
        >
          <ul className='snap-center flex-shrink-0 flex gap-6 items-center'>
            {products.slice(0, 7).map((product) => (
              <ProductCard {...product} key={product.title} />
            ))}
          </ul>
        </div>
        <button
          onClick={() => {
            document
              .getElementById("scroll-container")
              ?.scrollBy({left: 200, behavior: "smooth"});
          }}
          className='absolute -right-3 top-1/2 -translate-y-1/2 p-0 bg-gradient-to-r from-100 to-teal-500 rounded-full shadow-md z-10'
        >
          <IoIosArrowForward className='text-white w-10 h-10' />
        </button>
      </div>
    </section>
  );
};

export default ProductSection;
