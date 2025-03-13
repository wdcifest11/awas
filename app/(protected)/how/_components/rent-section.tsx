const SewaBarang = () => {
  return (
    <div className='py-10 flex flex-col items-center px-4 sm:px-6 lg:px-8'>
      {/* Judul */}
      <div className='text-left w-full max-w-6xl'>
        <h2 className='text-2xl font-bold mb-6'>Beli barang bekas online</h2>

        {/* Grid untuk Step */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[1, 2, 3].map((step) => (
            <div key={step} className='bg-gray-100 p-4 rounded-lg'>
              {/* Placeholder Gambar */}
              <div className='h-40 bg-gray-300 rounded-lg mb-4'></div>

              {/* Judul Step */}
              <h3 className='font-bold'>{step}. Step</h3>

              {/* Deskripsi Step */}
              <p className='text-gray-600 text-sm'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                sapien fringilla, mattis ligula consectetur, ultricies mauris.
                Maecenas vitae mattis tellus.
              </p>
            </div>
          ))}
        </div>
      </div>

      <button className='mt-6 bg-[#45C6AB] text-white px-6 py-2 rounded-lg hover:bg-green-500 transition'>
        Sewa Sekarang
      </button>
    </div>
  );
};
export default SewaBarang;
