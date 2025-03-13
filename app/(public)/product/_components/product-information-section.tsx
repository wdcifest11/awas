import products from "@/data/products";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductImage from "./product-image";
import ProductDescription from "./product-description";

const ProductInformationSection = ({slug}: {slug: string}) => {
  const product = products.filter((product) => product.slug === slug)[0];

  return (
    <section className='px-4 md:px-8 lg:px-12 relative'>
      <Breadcrumb className='absolute md:-top-20 xl:-left-0'>
        <BreadcrumbList className='text-sm'>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/shop?${
                product.gender == "Pria"
                  ? "Pria"
                  : product.gender == "Wanita"
                  ? "Wanita"
                  : product.gender == "Unisex"
                  ? "Unisex"
                  : "Anak"
              }`}
            >
              {product.gender}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Jaket</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='grid md:grid-cols-2 gap-8 my-12 sm:my-0'>
        <ProductImage
          thumbnail={product.thumbnail}
          images={product.productImage}
        />
        <ProductDescription {...product} />
      </div>
    </section>
  );
};

export default ProductInformationSection;
