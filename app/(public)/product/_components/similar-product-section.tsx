import ProductCard from "@/components/product-card";
import products from "@/data/products";

const SimilarProductSection = () => {
  return (
    <section className='px-4 md:px-8 lg:px-12'>
      <h3 className='text-xl font-semibold'>Rekomendasi barang serupa</h3>
      <p>Scroll ke samping untuk melihat lebih banyak</p>
      <div className='flex xxs:w-[280px] xs:w-[320px] py-4 sm:w-[600px] md:w-[700px] lg:w-full overflow-x-auto snap-mandatory snap-x mx-auto scrollbar-none'>
        <ul className='snap-center flex-shrink-0 flex gap-6 items-center'>
          {products.slice(5, 10).map((product) => (
            <ProductCard {...product} key={product.title} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SimilarProductSection;
