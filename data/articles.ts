// data/articles.ts

export interface Article {
  slug: string;
  title: string;
  image: string;
  category: string;
  date: string;
  content: string;
}

export const articles: Article[] = [
  {
    slug: "cara-mengurangi-dampak-fast-fashion",
    title: "Cara Mengurangi Dampak Fast Fashion",
    image: "/images/cara-mengurangi-dampak.webp",
    category: "Edukasi",
    date: "10 Maret 2025",
    content: `
      <p>Fast fashion merupakan fenomena di industri pakaian yang menawarkan tren terbaru dengan harga terjangkau. Namun, di balik harganya yang murah dan koleksi yang selalu berganti, terdapat dampak besar terhadap lingkungan dan sosial. Dalam artikel ini, kita akan membahas lebih dalam mengenai dampak fast fashion dan bagaimana cara kita menguranginya.</p>
      
      <h2 class="text-lg font-semibold mt-4">Mengapa Fast Fashion Berbahaya?</h2>
      <p>Industri fast fashion beroperasi dengan siklus produksi cepat untuk mengikuti tren mode terbaru. Sayangnya, praktik ini menyebabkan peningkatan konsumsi sumber daya alam, penggunaan bahan kimia berbahaya, dan limbah tekstil yang berlebihan. Berikut adalah beberapa alasan mengapa fast fashion berbahaya:</p>
      <ul class="list-disc ml-5">
        <li>Produksi berlebihan yang menciptakan masalah limbah tekstil serius.</li>
        <li>Pencemaran air dari proses pewarnaan tekstil di sekitar pabrik.</li>
        <li>Emisi karbon tinggi dari produksi tekstil berbahan sintetis.</li>
        <li>Eksploitasi tenaga kerja di pabrik dengan kondisi kerja buruk dan upah rendah.</li>
      </ul>

      <h2 class="text-lg font-semibold mt-4">Dampak Fast Fashion Terhadap Lingkungan</h2>
      <p>Industri fashion cepat tidak hanya menghasilkan limbah dalam jumlah besar tetapi juga menghabiskan sumber daya alam. Berikut beberapa dampak lingkungan yang ditimbulkan:</p>
      <ol class="list-decimal ml-5">
        <li>Limbah tekstil berbahan sintetis membutuhkan waktu ratusan tahun untuk terurai.</li>
        <li>Konsumsi air yang sangat tinggi, terutama untuk produk denim.</li>
        <li>Pencemaran mikroplastik dari bahan polyester ke laut setiap kali dicuci.</li>
        <li>Penggunaan bahan kimia berbahaya yang mencemari air dan tanah.</li>
      </ol>

      <h2 class="text-lg font-semibold mt-4">Pengaruh Sosial dari Fast Fashion</h2>
      <p>Selain dampak lingkungan, fast fashion juga memberikan pengaruh negatif terhadap masyarakat, terutama di negara berkembang:</p>
      <ul class="list-disc ml-5">
        <li>Kondisi kerja yang buruk dengan jam kerja panjang dan lingkungan kerja tidak aman.</li>
        <li>Eksploitasi pekerja, termasuk penggunaan tenaga kerja anak.</li>
        <li>Menekan pengrajin lokal dan bisnis kecil yang sulit bersaing.</li>
      </ul>

      <h2 class="text-lg font-semibold mt-4">Cara Mengurangi Dampak Fast Fashion</h2>
      <p>Mengubah perilaku belanja dan memilih opsi yang lebih berkelanjutan dapat membantu mengurangi dampak negatif fast fashion:</p>
      <ul class="list-disc ml-5">
        <li>Pilih pakaian berkualitas yang tahan lama agar tidak cepat dibuang.</li>
        <li>Manfaatkan pakaian lama dengan memadupadankan gaya atau melakukan upcycling.</li>
        <li>Donasikan atau jual kembali pakaian yang masih layak pakai melalui platform preloved.</li>
        <li>Dukung merek yang memiliki komitmen terhadap keberlanjutan.</li>
        <li>Kurangi pembelian impulsif dan pikirkan kebutuhan sebelum membeli pakaian baru.</li>
        <li>Sewa pakaian untuk acara tertentu daripada membeli baru.</li>
      </ul>

      <h2 class="text-lg font-semibold mt-4">Kesimpulan</h2>
      <p>Mengurangi dampak fast fashion membutuhkan perubahan pola pikir dalam berbelanja pakaian. Dengan memilih pakaian berkualitas, mendukung merek berkelanjutan, dan menghindari pembelian berlebihan, kita dapat membantu menjaga lingkungan tetap lestari. Setiap keputusan pembelian yang kita buat memiliki dampak besar bagi masa depan planet ini.</p>

      <p class="mt-4 text-center font-semibold">Mari bersama-sama membangun masa depan yang lebih berkelanjutan dengan fashion yang bijak!</p>
    `,
  },
];
