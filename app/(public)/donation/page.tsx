import {FaEarthAsia, FaPeopleRoof} from "react-icons/fa6";
import DonationForm from "./_components/donation-form";
import {FaRecycle} from "react-icons/fa";
import {GiField} from "react-icons/gi";
import {IoMdShirt} from "react-icons/io";

const donation = [
  {
    title: "Membantu Mereka yang Membutuhkan",
    description:
      "Pakaian Anda dapat memberikan kehangatan dan harapan bagi mereka yang kurang beruntung.",
    icon: <FaPeopleRoof className='w-10 h-10 text-100' />,
  },
  {
    title: "Mengurangi Limbah Tekstil",
    description:
      "Donasi pakaian membantu mengurangi limbah tekstil yang merusak lingkungan. Serta membuat pakaian bekas Anda kembali berguna.",
    icon: <FaRecycle className='w-10 h-10 text-100' />,
  },
  {
    title: "Berkontribusi pada Lingkungan yang Lebih Baik",
    description:
      "Setiap donasi adalah langkah kecil menuju dunia yang lebih hijau dan berkelanjutan.",
    icon: <GiField className='w-10 h-10 text-100' />,
  },
];

const donationImpact = [
  {
    title: "Pakaian Didonasikan",
    value: "+5,000",
    icon: <IoMdShirt className='w-10 h-10 text-100' />,
  },
  {
    title: "Orang Terbantu",
    value: "+2,000",
    icon: <FaPeopleRoof className='w-10 h-10 text-100' />,
  },
  {
    title: "Limbah Tekstil Dikurangi",
    value: "+10 Ton",
    icon: <FaEarthAsia className='w-10 h-10 text-100' />,
  },
];

const testimonials = [
  {
    name: "Warseno",
    role: "Donatur",
    message:
      "Saya sangat senang bisa berkontribusi melalui donasi pakaian ini. Prosesnya mudah dan bermanfaat!",
  },
  {
    name: "Arya",
    role: "Relawan",
    message:
      "Terima kasih telah membantu kami mengurangi limbah dan membantu orang lain.",
  },
  {
    name: "Miftachussurur",
    role: "Donatur",
    message:
      "Donasi pakaian ini membantu saya merasa lebih bermanfaat dan peduli pada sesama.",
  },
];

export default function DonasiPage() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-start md:px-4 py-8'>
      {/* Hero Section */}
      <section className='w-full max-w-4xl text-center mb-4'>
        <h1 className='text-4xl md:text-4xl font-bold mb-4'>
          Berbagi Pakaian, Menebar Kebaikan
        </h1>
        <p className='text-lg md:text-xl text-gray-700'>
          Setiap lembar pakaian yang Anda donasikan membawa kehangatan dan
          harapan bagi mereka yang membutuhkan.
        </p>
      </section>

      {/* Form Donasi */}
      <DonationForm />

      <section className='bg-white p-8 rounded-xl shadow-lg w-full max-w-6xl mx-auto mb-8'>
        <h3 className='text-3xl font-bold text-center mb-6'>
          Kenapa Donasi Pakaian itu Penting?
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {donation.map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-center text-center space-y-2 '
            >
              <div className='p-4 bg-[#E8F5F3] rounded-full'>{item.icon}</div>
              <h4 className='text-lg font-semibold text-gray-800'>
                {item.title}
              </h4>
              <p className='text-gray-600'>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Statistik Donasi */}
      <section className='w-full max-w-6xl bg-white p-8 rounded-xl shadow-lg mb-8 mx-auto'>
        <h3 className='text-3xl font-bold text-center mb-8'>
          Dampak Donasi Kami
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {donationImpact.map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-center text-center space-y-2'
            >
              <div className='p-4 bg-[#E8F5F3] rounded-full'>{item.icon}</div>
              <h4 className='text-lg font-semibold text-gray-800'>
                {item.title}
              </h4>
              <p className='bg-clip-text text-transparent bg-gradient-to-r from-100 to-teal-600 font-bold text-3xl'>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className='w-full max-w-6xl bg-white p-8 rounded-xl shadow-lg mb-8 mx-auto'>
        <h3 className='text-3xl font-bold text-center mb-8'>
          Apa Kata Mereka? 💬
        </h3>
        <div className='flex flex-col md:flex-row gap-6'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='bg-gray-100 p-6 rounded-lg text-center'>
              <p className='text-gray-700 italic'>"{testimonial.message}"</p>
              <p className='text-100 font-semibold mt-4'>
                — {testimonial.name}, {testimonial.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action */}
      <section className='w-full max-w-6xl bg-gradient-to-r from-teal-600 to-100 p-8 rounded-xl text-center text-white mb-8'>
        <h3 className='text-3xl font-bold mb-4'>
          Mari Bergabung dalam Gerakan Ini! 🌟
        </h3>
        <p className='text-lg mb-6'>
          Setiap donasi pakaian Anda adalah langkah besar menuju dunia yang
          lebih peduli dan berbagi.
        </p>
        <button className='bg-white text-100 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition duration-300'>
          Donasi Sekarang
        </button>
      </section>
    </div>
  );
}
