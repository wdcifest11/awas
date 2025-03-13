const solutions = [
  {
    id: 1,
    title: "Tukar & Jual-Beli Pakaian Bekas",
    description: [
      "Memperpanjang siklus hidup pakaian dengan sistem barter dan thrifting.",
      "Mengurangi produksi pakaian baru yang berkontribusi pada pencemaran lingkungan.",
    ],
  },
  {
    id: 2,
    title: "Sewa Pakaian Untuk Acara Tertentu",
    description: [
      "Daripada membeli pakaian yang hanya dipakai sekali, opsi rental pakaian menjadi solusi hemat dan ramah lingkungan.",
    ],
  },
  {
    id: 3,
    title: "Donasi & Daur Ulang Pakaian Bekas",
    description: [
      "Pakaian layak pakai bisa didonasikan ke yang membutuhkan.",
      "Pakaian tidak layak pakai bisa didaur ulang menjadi kain baru atau produk lain seperti tas dan aksesori.",
    ],
  },
];

const SolutionSection = () => {
  return (
    <div className='py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold mb-2'>Solusi Dari EcoWearHub</h2>
          <p className='mt-2 text-gray-600'>
            Temukan solusi ramah lingkungan untuk mengurangi dampak fast
            fashion.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className='relative bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300'
            >
              <div className='absolute -top-5 -left-5 flex items-center justify-center w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full text-white text-xl font-bold'>
                {solution.id}
              </div>

              <h3 className='px-8 sm:px-8 md:px-14 text-lg text-center font-semibold text-gray-800 mb-4'>
                {solution.title}
              </h3>

              <ul className='space-y-3'>
                {solution.description.map((desc, index) => (
                  <li key={index} className='text-gray-600 flex items-start'>
                    <span className='mr-2 text-teal-500'>•</span>
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolutionSection;
