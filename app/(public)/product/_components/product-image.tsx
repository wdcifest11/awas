"use client";

import Image from "next/image";
import {useState} from "react";

const ProductImage = ({
  thumbnail,
  images,
}: {
  thumbnail: string;
  images: Array<{url: string}>;
}) => {
  const [previewImage, setPreviewImage] = useState(thumbnail);

  return (
    <div className='grid gap-4 relative'>
      <Image
        src={previewImage}
        alt='Jaket'
        width={500}
        height={500}
        className='w-full rounded-lg'
      />
      <div className='flex flex-wrap gap-2'>
        {images.map(({url}) => (
          <button
            key={url}
            className={`w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] rounded-xl ${
              previewImage === url
                ? "border-[3px] border-gray-300 grayscale-0"
                : "border-none grayscale"
            }`}
            onClick={() => setPreviewImage(url)}
          >
            <Image
              src={url}
              alt='Jaket'
              width={500}
              height={500}
              className='w-full h-auto object-cover rounded-lg'
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
