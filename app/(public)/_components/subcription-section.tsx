import Particles from "@/components/particles";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import Image from "next/image";

const SubcriptionSection = () => {
  return (
    <section className='px-4 md:px-8 lg:px-20'>
      <Card className='md:p-12 relative'>
        <Image
          src='/images/woman-model.png'
          alt=''
          width={1000}
          height={1000}
          className='hidden lg:block absolute w-[200px] h-[300px] bottom-0 left-0 z-20 drop-shadow-xl'
        />
        <Image
          src='/images/man-model.png'
          alt=''
          width={1000}
          height={1000}
          className='hidden lg:block absolute w-[200px] h-auto bottom-0 right-0 z-20 drop-shadow-xl'
        />
        <Particles style='w-[100px] md:w-[300px] h-[150px] absolute left-10 top-20 -z-10' />
        <Particles style='hidden md:block w-[300px] h-[150px] absolute right-0 bottom-20 -z-10' />
        <CardHeader className='w-full'>
          <CardTitle className='text-center lg:w-[70%] mx-auto text-xl md:text-3xl lg:text-4xl font-bold'>
            Bergabunglah dalam Gerakan Fashion Berkelanjutan!
          </CardTitle>
          <CardDescription className='w-full py-4 md:text-md'>
            <p className='lg:w-[70%] text-center mx-auto'>
              Dengan berlangganan newsletter kami, Anda tidak hanya mendapatkan
              akses ke barang preloved terbaik, tetapi juga ikut berkontribusi
              menjaga lingkungan.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className='text-sm sm:text-base'>
          <div className='flex gap-4 items-center w-full'>
            <div className='w-full lg:w-1/2 flex flex-col sm:flex-row gap-2 mx-auto'>
              <Input type='email' placeholder='Gabung Sekarang!' />
              <Button>Gabung</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SubcriptionSection;
