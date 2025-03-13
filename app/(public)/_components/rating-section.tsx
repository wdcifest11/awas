import {IoMdStar, IoMdStarHalf, IoMdStarOutline} from "react-icons/io";
import {reviews} from "@/data/reviews";
import Image from "next/image";

interface ReviewProps {
  user: string;
  comments: string;
  rating: number;
  hours: number;
  product: {
    title: string;
    imageUrl: string;
    newPrice: number;
  };
}

const Rating = ({user, comments, rating, product, hours}: ReviewProps) => {
  return (
    <div className='border bg-white rounded-lg p-2 lg:p-4 w-full shadow-sm'>
      <div className='lg:flex justify-between gap-2'>
        <div className='grid gap-y-1'>
          <div className='flex items-center gap-2'>
            <div className='w-6 h-6 bg-zinc-900 rounded-full flex items-center justify-center mx-auto md:mx-0'>
              <span className='text-sm text-white font-bold'>
                {user.charAt(0)}
              </span>
            </div>
            <span className='font-semibold text-sm line-clamp-3'>{user}</span>
          </div>
          <div className='flex text-yellow-400'>
            {Array.from({length: 5}).map((_, index) => {
              if (index < Math.floor(rating)) {
                return (
                  <IoMdStar
                    className='w-4 h-4 sm:w-5 sm:h-5 text-yellow-500'
                    key={index}
                  />
                );
              } else if (index < rating) {
                return (
                  <IoMdStarHalf
                    className='w-4 h-4 sm:w-5 sm:h-5 text-yellow-500'
                    key={index}
                  />
                );
              } else {
                return (
                  <IoMdStarOutline
                    className='w-4 h-4 sm:w-5 sm:h-5 text-gray-400'
                    key={index}
                  />
                );
              }
            })}
          </div>
        </div>
        <span className='text-gray-500 text-[.8rem]'>
          {hours} jam yang lalu
        </span>
      </div>
      <p className='text-gray-700 my-2 line-clamp-1 text-[.8rem] lg:text-base'>
        {comments}
      </p>
      <div className='flex items-center gap-4'>
        <img
          src={product.imageUrl}
          alt='Product Image'
          width={50}
          height={50}
          className='rounded-lg border'
        />
        <div className='flex flex-col gap-1 line-clamp-1 text-[.8rem] lg:text-sm'>
          <p className='font-semibold'>{product.title}</p>
          <p className='text-gray-500 hidden lg:block'>
            {product.newPrice.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

const RatingSection = () => {
  return (
    <section className='px-4'>
      <div className='flex flex-col lg:hidden p-6 text-center w-full'>
        <p className='text-3xl md:text-4xl lg:text-5xl lg:w-[70%] mx-auto font-bold'>
          Bergabung dengan Komunitas Fashion Ramah Lingkungan
        </p>
        <div className='my-10 lg:my-5'>
          <p>Percayakan Pengalamanmu pada mereka yang sudah mencoba!</p>
          <p>
            Beberapa Ulasan dari pengguna yang telah berkontribusi dalam Gerakan
            Fashion berkelanjutan bersama EcoWearHub
          </p>
        </div>
      </div>
      <div className='px-2 sm:px-4 h-[500px] bg-gradient-to-r from-teal-600 to-100 rounded-lg'>
        <div className='grid md:grid-cols-2'>
          <div className='hidden md:flex flex-col p-6 text-white my-auto'>
            <p className='text-3xl md:text-4xl lg:text-5xl font-bold'>
              Bergabung dengan Komunitas Fashion Ramah Lingkungan
            </p>
            <div className='my-10'>
              <p>Percayakan Pengalamanmu pada mereka yang sudah mencoba!</p>
              <p>
                Beberapa Ulasan dari pengguna yang telah berkontribusi dalam
                Gerakan Fashion berkelanjutan bersama EcoWearHub
              </p>
            </div>
          </div>
          <div className='overflow-hidden h-[500px] relative sm:px-2'>
            <div className='min-h-screen flex gap-2 sm:gap-4'>
              <div className='flex flex-col gap-2 sm:gap-5 animate-marquee'>
                {[...reviews.slice(0, 10), ...reviews.slice(0, 10)].map(
                  (review, index) => (
                    <Rating key={index} {...review} />
                  )
                )}
              </div>

              <div className='flex flex-col gap-2 sm:gap-5 animate-marquee-bottom'>
                {[...reviews.slice(10, 20), ...reviews.slice(10, 20)].map(
                  (review, index) => (
                    <Rating key={index} {...review} />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RatingSection;
