import products from "./products";
import bcrypt from "bcryptjs";
import {v4 as uuidv4} from "uuid";

// Hash password sekali untuk menghindari perubahan setiap import
const hashPassword = (password: string) => bcrypt.hashSync(password, 10);

const users = [
  {
    id: uuidv4(),
    name: "Thrift Store",
    slug: "thrift-store",
    slugUrl: "thrift-store",
    email: "thriftstore@gmail.com",
    password: hashPassword("password"),
    role: "admin",
    location: "Jakarta",
    rating: 4,
    address: null, // Default address kosong
    products: products.filter((p) => p.user?.slug === "thrift-store"),
    reviews: [
      {
        id: uuidv4(),
        rating: 4.5,
        comment: "Barangnya bagus dan sesuai deskripsi, pengiriman cepat!",
        reviewerName: "Budi Santoso",
        date: "2 hari yang lalu",
        productId: 1,
      },
      {
        id: uuidv4(),
        rating: 3.8,
        comment: "Barangnya oke, tapi pengiriman agak lama.",
        reviewerName: "Ani Wijaya",
        date: "5 hari yang lalu",
        productId: 1,
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Vintage Corner",
    slug: "vintage-corner",
    slugUrl: "#",
    email: "vintagecorner@gmail.com",
    password: hashPassword("password"),
    role: "seller",
    location: "Bandung",
    rating: 5,
    address: {
      fullName: "Vintage Corner Owner",
      phone: "0813-9876-5432",
      fullAddress: "Jl. Asia Afrika No. 15, Bandung, Jawa Barat",
      details: "",
    },
    products: products.filter((p) => p.user?.slug === "vintage-corner"),
    reviews: [
      {
        id: uuidv4(),
        rating: 5,
        comment: "Barang vintage keren banget, kualitas premium!",
        reviewerName: "Rina Amelia",
        date: "1 hari yang lalu",
        productId: 1,
      },
      {
        id: uuidv4(),
        rating: 4.7,
        comment: "Pengiriman cepat, barang sesuai ekspektasi.",
        reviewerName: "Doni Pratama",
        date: "3 hari yang lalu",
        productId: 1,
      },
      {
        id: uuidv4(),
        rating: 4.9,
        comment: "Suka banget dengan koleksinya, bakal belanja lagi!",
        reviewerName: "Sari Dewi",
        date: "1 minggu yang lalu",
        productId: 1,
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Secondhand Store",
    slug: "secondhand-store",
    slugUrl: "#",
    email: "secondhandstore@gmail.com",
    password: hashPassword("password"),
    role: "seller",
    location: "Surabaya",
    rating: 4.5,
    address: {
      fullName: "Secondhand Store Admin",
      phone: "0812-1122-3344",
      fullAddress: "Jl. Raya Darmo No. 99, Surabaya, Jawa Timur",
      details: "Samping minimarket",
    },
    products: products.filter((p) => p.user?.slug === "secondhand-store"),
    reviews: [
      {
        id: uuidv4(),
        rating: 4.2,
        comment: "Barangnya murah dan berkualitas, recommended!",
        reviewerName: "Fajar Nugraha",
        date: "4 hari yang lalu",
        productId: 1,
      },
      {
        id: uuidv4(),
        rating: 4.8,
        comment: "Pengiriman tepat waktu, barang sesuai foto.",
        reviewerName: "Lina Marlina",
        date: "6 hari yang lalu",
        productId: 1,
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Sneakers Hub",
    slug: "sneakers-hub",
    slugUrl: "#",
    email: "sneakershub@gmail.com",
    password: hashPassword("password"),
    role: "seller",
    location: "Semarang",
    rating: 5,
    address: {
      fullName: "Sneakers Hub Manager",
      phone: "0817-6543-2109",
      fullAddress: "Jl. Pemuda, Semarang, Jawa Tengah",
      details: "Dekat mall utama",
    },
    products: products.filter((p) => p.user?.slug === "sneakers-hub"),
    reviews: [
      {
        id: uuidv4(),
        rating: 5,
        comment: "Sneakers original, harga bersahabat!",
        reviewerName: "Andi Setiawan",
        date: "2 hari yang lalu",
        productId: 1,
      },
      {
        id: uuidv4(),
        rating: 4.5,
        comment: "Barangnya keren, tapi ukuran agak kecil.",
        reviewerName: "Rizky Pratama",
        date: "1 minggu yang lalu",
        productId: 1,
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Casual Wear",
    slug: "casual-wear",
    slugUrl: "#",
    email: "casualwear@gmail.com",
    password: hashPassword("password"),
    role: "seller",
    location: "Bali",
    rating: 4.2,
    address: {
      fullName: "Casual Wear Owner",
      phone: "0819-8765-4321",
      fullAddress: "Jl. Sunset Road No. 20, Kuta, Bali",
      details: "",
    },
    products: products.filter((p) => p.user?.slug === "casual-wear"),
    reviews: [
      {
        id: uuidv4(),
        rating: 4.0,
        comment: "Bahan nyaman dipakai, cocok untuk sehari-hari.",
        reviewerName: "Dewi Lestari",
        date: "3 hari yang lalu",
        productId: 1,
      },
      {
        id: uuidv4(),
        rating: 4.3,
        comment: "Pengiriman cepat, barang sesuai deskripsi.",
        reviewerName: "Agus Supriyadi",
        date: "5 hari yang lalu",
        productId: 1,
      },
    ],
  },
  {
    id: uuidv4(),
    name: "EcoWear",
    slug: "eco-wear",
    slugUrl: "#",
    email: "ecowear@gmail.com",
    password: hashPassword("password"),
    role: "admin", // Samakan role dengan format lainnya
    location: "Semarang",
    rating: 4.99,
    address: {
      fullName: "Eco Wear Owner",
      phone: "0819-8765-4321",
      fullAddress: "Jl. Baskoro No. 20, Semarang, Jawa Tengah",
      details: "",
    },
    products: products.filter((p) => p.user?.slug === "eco-wear"),
    reviews: [
      {
        id: uuidv4(),
        rating: 5,
        comment: "Barang ramah lingkungan, kualitas premium!",
        reviewerName: "Rina Fitriani",
        date: "1 hari yang lalu",
        productId: 1,
      },
      {
        id: uuidv4(),
        rating: 4.9,
        comment: "Sangat puas dengan produknya, bakal beli lagi.",
        reviewerName: "Hendra Kurniawan",
        date: "2 hari yang lalu",
        productId: 1,
      },
    ],
  },
];

export default users;
