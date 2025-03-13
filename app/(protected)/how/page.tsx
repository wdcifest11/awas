import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Banner from "./_components/banner";

const steps = [
  {
    title: "Jual barang bekas online",
    step: [
      {
        title: "Step 1",
        imageUrl: "/images/jual-step1.png",
        description:
          "Daftar akun, lalu masuk ke dashboard dan pilih menu jual barang bekas.",
      },
      {
        title: "Step 2",
        imageUrl: "/images/jual-step2.png",
        description:
          "Klik tambah produk, lalu masukkan detail barang yang ingin dijual. Jangan lupa upload foto barang yang jelas.",
      },
      {
        title: "Step 3",
        imageUrl: "/images/jual-step3.png",
        description:
          "Pilih metode jual, lalu masukkan harga barang yang diinginkan. Jangan lupa atur pengiriman dibagian settings. Lalu barang siap dijual.",
      },
    ],
    button: "Beli Sekarang",
  },
  {
    title: "Beli barang bekas online",
    step: [
      {
        title: "Step 1",
        imageUrl: "/images/beli-step1.png",
        description:
          "Cari barang bekas yang kamu inginkan di website, lihat detail barang. Jika tertarik bisa melakukan pembelian.",
      },
      {
        title: "Step 2",
        imageUrl: "/images/beli-step2.png",
        description:
          "Pilih metode beli langsung, kemudian pilih metode pembayaran yang kamu inginkan.",
      },
      {
        title: "Step 3",
        imageUrl: "/images/beli-step3.png",
        description:
          "Bayar sesuai nominal yang tertera, lalu tunggu barang yang kamu beli sampai di rumah.",
      },
    ],
    button: "Beli Sekarang",
  },
  {
    title: "Barter barang bekas",
    step: [
      {
        title: "Step 1",
        imageUrl: "/images/beli-step1.png",
        description:
          "Cari barang bekas yang kamu inginkan di website, lihat detail barang. Jika tertarik bisa melakukan penukaran.",
      },
      {
        title: "Step 2",
        imageUrl: "/images/barter-step2.png",
        description:
          "Pilih metode barter, kemudian pilih barangmu yang ingin ditukar (jika belum ada barang, isi formulir).",
      },
      {
        title: "Step 3",
        imageUrl: "/images/barter-step2.png",
        description:
          "Tukar barang jika harga barang setara dan berada di Kota yang sama.",
      },
    ],
    button: "Barter Sekarang",
  },
  {
    title: "Sewa barang bekas",
    step: [
      {
        title: "Step 1",
        imageUrl: "/images/beli-step1.png",
        description:
          "Cari barang bekas yang kamu inginkan di website, lihat detail barang. Jika tertarik bisa melakukan sewa barang.",
      },
      {
        title: "Step 2",
        imageUrl: "/images/sewa-step2.png",
        description:
          "Pilih metode sewa, kemudian masukkan berapa hari peminjaman. Maka harga otomatis bertambah sesuai hari.",
      },
      {
        title: "Step 3",
        imageUrl: "/images/sewa-step3.png",
        description:
          "Pilih metode pembayaran, dan lakukan pembayaran sesuai harga yang tertera.",
      },
    ],
    button: "Sewa Sekarang",
  },
];

export default function Home() {
  return (
    <div className="py-0">
      {/* Tambahkan Banner di sini */}
      <Banner />

      {/* Konten steps */}
      {steps.map((step) => (
        <div key={step.title} className="py-8 flex flex-col items-center px-4 sm:px-6 lg:px-8">
          <div className="text-left w-full">
            <h2 className="text-2xl font-bold mb-8">{step.title}</h2>
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {step.step.map((s, i) => (
                  <div key={i} className="flex flex-col">
                    {/* Container gambar */}
                    <div className="relative h-50 w-full rounded-md overflow-hidden mb-4">
                      <Image
                        src={s.imageUrl}
                        alt={s.title}
                        width={500}
                        height={500}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-left">{s.title}</h3>
                    <p className="text-gray-800 text-sm font-medium leading-relaxed text-left">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button asChild className="w-52 mt-8">
            <Link href="/shop">{step.button}</Link>
          </Button>
        </div>
      ))}
    </div>
  );
}