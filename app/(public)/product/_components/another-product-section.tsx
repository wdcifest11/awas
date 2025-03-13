import ProductCard from "@/components/product-card";
import products from "@/data/products";

const AnotherProductSection = ({
  currentProductSlug,
}: {
  currentProductSlug: string;
}) => {
  const currentProduct = products.filter(
    (product) => product.slug === currentProductSlug
  )[0];
  const currentUser = currentProduct.user.slug;
  const anotherProductsFromUser = products.filter(
    (product) => product.user.slug === currentUser
  );

  return (
    <section className='px-4 md:px-8 lg:px-12'>
      <h3 className='text-xl font-semibold'>Lainnya dari seller</h3>
      <p>Scroll ke samping untuk melihat lebih banyak</p>
      <div className='flex xxs:w-[280px] xs:w-[320px] py-4 sm:w-[600px] md:w-[700px] lg:w-full overflow-x-auto snap-mandatory snap-x mx-auto scrollbar-none'>
        <ul className='snap-center flex-shrink-0 flex gap-6 items-center'>
          {anotherProductsFromUser.slice(5, 10).map((product) => (
            <ProductCard {...product} key={product.title} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AnotherProductSection;
