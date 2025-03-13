// components/ServerComponent.tsx
import {Payment} from "./columns";

async function getData(): Promise<Payment[]> {
  // Mengembalikan data dummy
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
    },
    {
      id: 4,
      title: "Nautica Cargo Trousers - 36W 31L Beige Cotton",
      price: 320000,
      thumbnail: "/images/nautica-cargo.webp",
      user: {
        name: "Sneakers Hub",
      },
      sellingType: "Beli Langsung",
    },
    {
      id: 5,
      title: "Contragrip Salomon Trainers - UK 6 Green Gore-Tex",
      price: 210000,
      thumbnail: "/images/contagrip-salomon-shoes.webp",
      user: {
        name: "Casual Wear",
      },
      sellingType: "Barter",
    },
  ];
}

// Komponen Server
export default async function ServerComponent() {
  const data = await getData();
  return data; // Mengembalikan data untuk digunakan di Client Component
}
