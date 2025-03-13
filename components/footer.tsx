import {FaXTwitter, FaInstagram, FaYoutube, FaLinkedin} from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className='container mx-auto p-4 md:p-8 bg-background w-full border-t block z-10'>
      <div className='md:flex grid'>
        <div className='md:w-1/2 mb-6 mx-auto'>
          <p className='text-3xl font-bold my-4 font-[family-name:var(--font-playfair)]'>
            EcoWearHub
          </p>
          <p className='text-sm md:text-base text-center lg:text-left'>
            Platform digital untuk memperpanjang siklus hidup pakaian melalui
            tukar-menukar, penjualan bekas, perbaikan, dan donasi. Mulai langkah
            kecilmu untuk mengurangi limbah fashion dan ciptakan pola konsumsi
            yang lebih ramah lingkungan.
          </p>
          <div className='flex mt-10 gap-4'>
            {[
              {Icon: FaXTwitter, href: "x.com"},
              {Icon: FaInstagram, href: "instagram.com"},
              {Icon: FaYoutube, href: "youtube.com"},
              {Icon: FaLinkedin, href: "linkedin.com"},
            ].map(({Icon, href}) => (
              <Link href={href} key={href}>
                <Icon size={20} />
              </Link>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-2 md:w-8/12 md:ml-12'>
          <div className='mx-auto text-sm md:text-base'>
            <h2 className='text-lg md:text-xl font-bold mt-4 my-4'>
              Useful Links
            </h2>
            <ul className='grid gap-1'>
              {[
                {label: "Belanja", href: "/shop"},
                {label: "Edukasi", href: "/education"},
                {label: "Perbaiki Pakaian", href: "/repair"},
                {label: "Donasi Pakaian", href: "/donation"},
                {label: "Cara Kerja", href: "/how"},
              ].map(({label, href}) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='mx-auto text-sm md:text-base'>
            <h2 className='text-lg md:text-xl font-bold my-4'>Discover</h2>
            <ul className='grid gap-1'>
              {[
                {label: "Pakaian Pria", href: "/shop?categories=Pria"},
                {label: "Pakaian Wanita", href: "/shop?categories=Wanita"},
                {label: "Pakaian Atas", href: "/shop?categories=Atasan"},
                {label: "Pakaian Bawah", href: "/shop?categories=Bawahan"},
              ].map(({label, href}) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className='text-center mt-12 md:mt-3'>
        <ul className='flex justify-center gap-4 items-center'></ul>
        <p className='text-sm mt-4'>&copy; 2025 EcoWearHub </p>
      </div>
    </footer>
  );
};

export default Footer;
