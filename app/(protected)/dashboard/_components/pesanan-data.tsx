
import {Pesanan} from "./pesanan-columns";

async function getData(): Promise<Pesanan[]> {
  return [
    {
      id: 1,
      title: "Reworked Carhartt Jacket - Large Black Cotton",
      price: 385000,
      thumbnail: "/images/reworked-carhartt-jacket.webp",
      sellingType: "Beli Langsung",
      user: {
        name: "Thrift Store",
      },
      status:"dikemas"
    },
    {
      id: 2,
      title: "Jordan T-Shirt - 2XL Red Cotton",
      price: 250000,
      thumbnail: "/images/jordan-tshirt.webp",
      user: {
        name: "Vintage Corner",
      },
      sellingType: "Barter",
      status:"dikirim",
    },
    {
        id: 3,
        title:
          "True Love & False Idols Graphic Long Sleeve T-Shirt - XL Black Cotton",
        price: 180000,
        thumbnail: "/images/graphic-long-sleeve.webp",
  
        user: {
          name: "Secondhand Store",
        },
        sellingType: "Sewa",
        status:"selesai"
    },
    
  ];
}

// Komponen Server
export default async function PesananData() {
  const data = await getData();
  return data; // Mengembalikan data untuk digunakan di Client Component
}
