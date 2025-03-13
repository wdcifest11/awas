import Banner from "./_components/banner";
import DescriptionSection from "./_components/desc-section";
import SolutionSection from "./_components/solution-section";
import ImpactSection from "./_components/impact-section";
import ArticleSection from "./_components/article-section";

const articles = [
  {
    title: "Cara Mengurangi Dampak Fast Fashion",
    excerpt:
      "Fast fashion memiliki dampak negatif bagi lingkungan. Pelajari cara-cara untuk mengurangi dampak tersebut dengan pilihan berbelanja yang lebih bijak dan ramah lingkungan...",
    image: "/images/cara-mengurangi-dampak.webp",
    slug: "cara-mengurangi-dampak-fast-fashion",
    category: "Edukasi",
    date: "10 Maret 2025",
  },
  {
    title: "DIY: Mengubah Pakaian Lama Menjadi Baru",
    excerpt:
      "Tutorial mudah untuk upcycling pakaian di rumah. Dapatkan inspirasi untuk memberikan sentuhan baru pada pakaian lama Anda dengan teknik DIY sederhana...",
    image: "/images/diy-upcycling-pakaian.webp",
    slug: "#",
    category: "Tutorial",
    date: "8 Maret 2025",
  },
  {
    title: "Panduan Membeli Pakaian Second Hand",
    excerpt:
      "Tips dan trik memilih pakaian preloved berkualitas. Pahami cara mendapatkan pakaian second hand dengan kondisi terbaik dan tetap gaya...",
    image: "/images/panduan-membeli-pakaian-second-hand.webp",
    slug: "#",
    category: "Tips",
    date: "5 Maret 2025",
  },
];

export default function Home() {
  return (
    <div>
      <Banner />
      <DescriptionSection />
      <ImpactSection />
      <SolutionSection />
      <ArticleSection articles={articles} />
    </div>
  );
}
