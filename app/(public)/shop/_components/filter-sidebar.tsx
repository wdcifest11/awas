import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {Checkbox} from "@/components/ui/checkbox";
import {useRouter, usePathname} from "next/navigation";
import {AnimatePresence, motion} from "motion/react";

const categories = ["Kaos", "Jaket", "Celana", "Sepatu"];
const genders = ["Pria", "Wanita"];
const brands = ["Erigo", "Jordan", "3Second", "Eiger", "Hammer", "Cottonology"];
const conditions = ["Bagus", "Sangat Baggus", "Baru", "Bekas"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["Hitam", "Putih", "Biru", "Merah", "Hijau"];
const materials = ["Katun", "Denim", "Kulit", "Polyester", "Linen"];

export default function FilterSidebar({filters, setFilters, visible}: any) {
  const router = useRouter();
  const pathname = usePathname();

  const handleCheckboxChange = (category: any, option: any) => {
    setFilters((prev: any) => ({
      ...prev,
      [category]: prev[category].includes(option)
        ? prev[category].filter((item: any) => item !== option)
        : [...prev[category], option],
    }));
  };

  return (
    <aside className=''>
      <div className='fixed w-1/5 top-20 hidden lg:block border-r pr-4 space-y-4'>
        <h2 className='font-semibold text-lg mb-3'>Filter</h2>
        <Accordion type='multiple' className='space-y-2'>
          {[
            "categories",
            "genders",
            "brands",
            "conditions",
            "sizes",
            "colors",
            "materials",
          ].map((category, index) => (
            <AccordionItem key={index} value={category}>
              <AccordionTrigger>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </AccordionTrigger>
              <AccordionContent className='space-y-2 px-2'>
                {(category === "categories"
                  ? categories
                  : category === "genders"
                  ? genders
                  : category === "brands"
                  ? brands
                  : category === "conditions"
                  ? conditions
                  : category === "sizes"
                  ? sizes
                  : category === "colors"
                  ? colors
                  : materials
                ).map((option) => (
                  <label key={option} className='flex items-center gap-2'>
                    <Checkbox
                      checked={filters[category].includes(option)}
                      onCheckedChange={() =>
                        handleCheckboxChange(category, option)
                      }
                    />
                    {option}
                  </label>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div>
          <h3 className='font-medium mb-2'>Harga</h3>
          <div className='flex gap-2'>
            <Input
              type='number'
              placeholder='Min'
              value={filters.minPrice}
              onChange={(e) =>
                setFilters((prev: any) => ({...prev, minPrice: e.target.value}))
              }
            />
            <Input
              type='number'
              placeholder='Max'
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((prev: any) => ({...prev, maxPrice: e.target.value}))
              }
            />
          </div>
        </div>
        <Button
          variant='outline'
          className='mt-4 w-full'
          onClick={() => {
            setFilters({
              genders: [],
              categories: [],
              brands: [],
              conditions: [],
              sizes: [],
              colors: [],
              materials: [],
              minPrice: "",
              maxPrice: "",
            });
            router.push(pathname);
          }}
        >
          Reset Filter
        </Button>
      </div>
      <AnimatePresence>
        {visible && (
          <motion.aside
            initial={{y: 50, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            exit={{y: 50, opacity: 0}}
            transition={{duration: 0.2, ease: "easeOut"}}
            className=' overflow-y-auto h-screen fixed flex flex-col items-center justify-center inset-0 bg-white z-20 px-4'
          >
            <h2 className='font-semibold text-lg mb-3'>Filter</h2>
            <Accordion type='multiple' className='space-y-2 w-full'>
              {[
                "categories",
                "genders",
                "brands",
                "conditions",
                "sizes",
                "colors",
                "materials",
              ].map((category, index) => (
                <AccordionItem key={index} value={category}>
                  <AccordionTrigger>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </AccordionTrigger>
                  <AccordionContent className='space-y-2 px-2'>
                    {(category === "categories"
                      ? categories
                      : category === "genders"
                      ? genders
                      : category === "brands"
                      ? brands
                      : category === "conditions"
                      ? conditions
                      : category === "sizes"
                      ? sizes
                      : category === "colors"
                      ? colors
                      : materials
                    ).map((option) => (
                      <label key={option} className='flex items-center gap-2'>
                        <Checkbox
                          checked={filters[category].includes(option)}
                          onCheckedChange={() =>
                            handleCheckboxChange(category, option)
                          }
                        />
                        {option}
                      </label>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div>
              <h3 className='font-medium mb-2'>Harga</h3>
              <div className='flex gap-2'>
                <Input
                  type='text'
                  placeholder='Min'
                  value={filters.minPrice.toLocaleString("id-ID")}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, ""); // Hapus karakter selain angka
                    setFilters((prev: any) => ({
                      ...prev,
                      minPrice: rawValue ? parseInt(rawValue, 10) : "",
                    }));
                  }}
                />
                <Input
                  type='text'
                  placeholder='Max'
                  value={filters.maxPrice.toLocaleString("id-ID")}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, "");
                    setFilters((prev: any) => ({
                      ...prev,
                      maxPrice: rawValue ? parseInt(rawValue, 10) : "",
                    }));
                  }}
                />
              </div>
            </div>
            <Button
              variant='outline'
              className='mt-4 w-full'
              onClick={() => router.push(pathname)}
            >
              Reset Filter
            </Button>
          </motion.aside>
        )}
      </AnimatePresence>
    </aside>
  );
}
