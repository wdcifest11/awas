import Image from "next/image";

const impacts = [
  {
    image: "/images/dampak1.png",
    title: "Limbah Tekstil yang Meningkat",
    text: "Fast fashion memproduksi pakaian dalam jumlah besar, tetapi tren cepat membuat banyak pakaian dibuang setelah hanya beberapa kali dipakai. Setiap tahunnya, jutaan ton pakaian berakhir di tempat pembuangan sampah, dan banyak di antaranya sulit terurai karena mengandung bahan sintetis seperti polyester dan nilon.",
  },
  {
    image: "/images/dampak2.png",
    title: "Konsumsi Air yang Besar",
    text: "Industri tekstil adalah salah satu penyumbang terbesar dalam konsumsi air. Misalnya, untuk memproduksi satu celana jeans, diperlukan sekitar 7.500 liter air, setara dengan konsumsi air minum seseorang selama lebih dari 7 tahun. Selain itu, pewarna tekstil sering kali mencemari sumber air di sekitar pabrik produksi.",
  },
  {
    image: "/images/dampak3.png",
    title: "Polusi Mikroplastik",
    text: "Banyak pakaian fast fashion dibuat dari bahan sintetis seperti polyester, acrylic, dan nylon yang melepaskan mikroplastik saat dicuci. Partikel kecil ini masuk ke saluran air, mencemari laut, dan dapat masuk ke rantai makanan, membahayakan ekosistem laut serta kesehatan manusia.",
  },
];

const ImpactSection = () => {
  return (
    <div className='py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Main Heading */}
        <div className='text-center mb-16'>
          <h1 className='text-3xl font-bold'>
            Dampak Fast Fashion Terhadap Lingkungan
          </h1>
          <p className='mt-4 text-gray-600'>
            Temukan bagaimana industri fast fashion memengaruhi lingkungan dan
            apa yang bisa kita lakukan untuk mengurangi dampaknya.
          </p>
        </div>

        {/* Impact Cards */}
        {impacts.map((impact, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center gap-12 mb-16`}
          >
            {/* Image Section */}
            <div className='w-full lg:w-1/2'>
              <Image
                src={impact.image}
                alt={`dampak${index + 1}`}
                width={523}
                height={318}
                className='rounded-lg shadow-lg'
              />
            </div>

            {/* Text Section */}
            <div className='w-full lg:w-1/2'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                {impact.title}
              </h2>
              <p className='leading-relaxed'>{impact.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactSection;