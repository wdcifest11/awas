"use client";

import AuthModals from "@/components/auth-modals";
import {Button} from "@/components/ui/button";
import {getUser} from "@/app/actions/auth";
import {useEffect, useState} from "react";
import Link from "next/link";

const HeroSection = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const user = await getUser();
      setIsUserAuthenticated(!!user);
    };

    checkUser();
  }, []);

  return (
    <>
      <section className='px-4'>
        <div className='lg:flex items-center gap-12'>
          <h1 className='text-3xl md:text-4xl xl:text-6xl'>
            Bersama Wujudkan{" "}
            <b className='text-transparent bg-clip-text bg-gradient-to-r inline-block from-100 to-teal-600'>
              Fashion
            </b>{" "}
            Berkelanjutan dan Ramah{" "}
            <b className='text-transparent bg-clip-text bg-gradient-to-r inline-block from-100 to-teal-600 pb-1'>
              Lingkungan
            </b>
          </h1>
          <div className='space-y-4 w-full lg:w-[90%]'>
            <p className='leading-relaxed my-6 md:my-12'>
              Platform digital untuk memperpanjang siklus hidup pakaian melalui
              tukar-menukar, penjualan bekas, perbaikan, dan donasi. Mulai
              langkah kecilmu untuk mengurangi limbah fashion dan ciptakan pola
              konsumsi yang lebih ramah lingkungan
            </p>
            <div className='flex gap-4 items-center justify-center md:justify-start'>
              <Button asChild>
                <Link href='/how'>Cara Kerja</Link>
              </Button>
              <Button variant={"outline"}>
                {isUserAuthenticated ? (
                  <Link href='/dashboard'>Mulai Menjual</Link>
                ) : (
                  <span onClick={() => setIsAuthModalOpen(true)}>
                    Mulai Menjual
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {!isUserAuthenticated && (
        <AuthModals
          isLoginModalOpen={isAuthModalOpen}
          isResetPasswordModalOpen={isResetPasswordModalOpen}
          isSignUpModalOpen={isSignUpModalOpen}
          setIsLoginModalOpen={setIsAuthModalOpen}
          setIsResetPasswordModalOpen={setIsResetPasswordModalOpen}
          setIsSignUpModalOpen={setIsSignUpModalOpen}
        />
      )}
    </>
  );
};

export default HeroSection;
