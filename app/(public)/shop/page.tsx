import React, {Suspense} from "react";
import ShopContent from "./_components/shop-content";

const ShopPage = () => {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
};

export default ShopPage;
