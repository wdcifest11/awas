"use client";

import {useState, useEffect} from "react";
import {useSearchParams, usePathname, useRouter} from "next/navigation";
import products from "@/data/products";
import ProductCard from "@/components/product-card";
import FilterSidebar from "../_components/filter-sidebar";
import {Button} from "@/components/ui/button";
import {FaFilter} from "react-icons/fa6";

export default function ShopContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filterVisible, setFilterVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      setVisibleCount((prev) => prev + 3);
    }
  };

  const [filters, setFilters] = useState({
    genders: searchParams.getAll("gender"),
    categories: searchParams.getAll("category"),
    brands: searchParams.getAll("brand"),
    conditions: searchParams.getAll("condition"),
    sizes: searchParams.getAll("size"),
    colors: searchParams.getAll("color"),
    materials: searchParams.getAll("material"),
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const filteredProducts = products.filter((product) => {
    return (
      (!filters.genders.length || filters.genders.includes(product.gender)) &&
      (!filters.categories.length ||
        filters.categories.includes(product.category)) &&
      (!filters.brands.length || filters.brands.includes(product.brand)) &&
      (!filters.conditions.length ||
        filters.conditions.includes(product.condition)) &&
      (!filters.sizes.length || filters.sizes.includes(product.size)) &&
      (!filters.colors.length || filters.colors.includes(product.color)) &&
      (!filters.materials.length ||
        filters.materials.includes(product.material)) &&
      (!filters.minPrice || product.price >= parseInt(filters.minPrice)) &&
      (!filters.maxPrice || product.price <= parseInt(filters.maxPrice))
    );
  });

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item));
      } else if (value) {
        params.set(key, value);
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  }, [filters]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='px-2 lg:px-0 lg:flex lg:gap-8 lg:p-8 relative'>
      <Button
        className='lg:hidden z-30 fixed bottom-5 left-1/2 -translate-x-1/2'
        onClick={() => setFilterVisible(!filterVisible)}
      >
        <FaFilter />
        Filter
      </Button>
      <div className='lg:min-h-screen lg:w-1/4'>
        <FilterSidebar
          visible={filterVisible}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      <section className='lg:w-3/4'>
        {filteredProducts.length > 0 ? (
          <ul className='grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6'>
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <ProductCard {...product} key={product.id} />
            ))}
          </ul>
        ) : (
          <p className='text-center text-xl font-semibold'>
            Tidak ada produk yang ditemukan
          </p>
        )}
      </section>
    </div>
  );
}
