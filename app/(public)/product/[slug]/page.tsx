import {
  AnotherProductSection,
  ProductInformationSection,
  SimilarProductSection,
} from "../_components";

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{slug: string}>;
}) => {
  const {slug} = await params;

  return (
    <>
      <ProductInformationSection slug={slug} />
      <AnotherProductSection currentProductSlug={slug} />
      <SimilarProductSection />
    </>
  );
};

export default ProductDetailPage;
