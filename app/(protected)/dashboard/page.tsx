"use client";

import {useState, useEffect} from "react";
import {
  CiInboxIn,
  CiInboxOut,
  CiSettings,
  CiHome,
  CiShoppingTag,
  CiEdit,
  CiGift,
} from "react-icons/ci";
import {Payment, columns} from "./_components/columns";
import ServerComponent from "./_components/server-components";
import {DataTable} from "./_components/data-table";
import {ProductTable} from "./_components/product-table";
import {Product, productcolumns} from "./_components/product-columns";
import products from "@/data/products";
import {Checkbox} from "@/components/ui/checkbox";
import {Switch} from "@/components/ui/switch";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {BsCoin} from "react-icons/bs";
import {Textarea} from "@/components/ui/textarea";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {PesananTable} from "./_components/pesanan-table";
import {Pesanan, pesanancolumns} from "./_components/pesanan-columns";
import PesananData from "./_components/pesanan-data";
import {getUser} from "@/app/actions/auth";
import {Slider} from "@/components/ui/slider";
import {Progress} from "@/components/ui/progress";

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "hadiah" | "produk" | "pesanan1" | "pesanan2" | "settings"
  >("dashboard");
  const [data, setData] = useState<Payment[]>([]);
  const [dataPesanan, setDataPesanan] = useState<Pesanan[]>([]);
  const [dataProduct, setDataProduct] = useState<Product[]>(products);
  const [authenticatdUser, setAuthenticatedUser] = useState<any>(null);

  const salesStats = {
    totalSales: 5000000,
    totalOrders: 20,
    totalProducts: 50,
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await ServerComponent();
      setData(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await PesananData();
      setDataPesanan(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUser();
      setAuthenticatedUser(result);
    };

    fetchUser();
  }, []);

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <div className='relative md:w-60 bg-white rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none'>
        <div className=' md:w-60 h-full p-4'>
          <nav className='space-y-2 flex flex-col  items-center'>
            <div className='flex flex-col gap-2' id='profil'>
              <div className='flex flex-row items-center gap-2 rounded-md p-2'>
                <div className='w-10 h-10 md:w-12 md:h-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto md:mx-0'>
                  <span className='text-2xl text-white md:text-3xl font-bold'>
                    {authenticatdUser?.name.charAt(0)}
                  </span>
                </div>
                <div className='text-sm'>
                  <p>{authenticatdUser?.name}</p>
                  <p>{authenticatdUser?.email}</p>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant='outline'
                    className='rounded-lg mx-auto bg-zinc-900 text-white'
                  >
                    + Tambah Produk
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Tambah Produk</DialogTitle>
                    <DialogDescription>
                      Tambahkan Produk anda secara detail disini
                    </DialogDescription>
                  </DialogHeader>
                  <div className='flex flex-col gap-4 py-4'>
                    <div className='flex flex-row'>
                      <Input
                        id='name'
                        placeholder='Nama'
                        className='col-span-3'
                        type='text'
                      />
                    </div>
                    <div className='flex flex-row gap-4 '>
                      <Input
                        id='brand'
                        className='col-span-3'
                        placeholder='Brand'
                        type='text'
                      />
                      <Input
                        id='price'
                        className='col-span-3'
                        placeholder='Harga'
                        type='number'
                      />
                    </div>

                    <div className='flex flex-row items-center gap-4'>
                      <Input
                        id='category'
                        className='col-span-3'
                        placeholder='Kategori'
                        type='text'
                      />
                      <Select>
                        <SelectTrigger className='w-[180px]'>
                          <SelectValue placeholder='Pilih Jenis Kelamin' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Jenis Kelamin</SelectLabel>
                            <SelectItem value='Laki-laki'>Laki-laki</SelectItem>
                            <SelectItem value='Perempuan'>Perempuan</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='flex flex-row items-center gap-4'>
                      <div className='border p-1 text-center rounded-xl'>
                        <Label>Jenis Penjualan</Label>
                        <ToggleGroup type='multiple' variant='outline'>
                          <ToggleGroupItem
                            className='text-100 font-semibold'
                            value='jual'
                          >
                            Jual
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            className='text-100 font-semibold'
                            value='barter'
                          >
                            Barter
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            className='text-100 font-semibold'
                            value='sewa'
                          >
                            Sewa
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </div>
                      <Input
                        id='username'
                        readOnly
                        className='col-span-3'
                        placeholder='Kondisi Barang'
                      />
                    </div>
                    <div className='flex flex-row items-center gap-4'>
                      <Select>
                        <SelectTrigger className='w-[180px]'>
                          <SelectValue placeholder='Ukuran Produk' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Ukuran</SelectLabel>
                            <SelectItem value='xs'>XS</SelectItem>
                            <SelectItem value='s'>S</SelectItem>
                            <SelectItem value='m'>M</SelectItem>
                            <SelectItem value='l'>L</SelectItem>
                            <SelectItem value='xl'>XL</SelectItem>
                            <SelectItem value='2xl'>2XL</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className='w-[180px]'>
                          <SelectValue placeholder='Tipe Produk' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Tipe</SelectLabel>
                            <SelectItem value='casual'>Casual</SelectItem>
                            <SelectItem value='sport'>Sport</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='flex flex-row items-center gap-4'>
                      <Input
                        id='color'
                        className='col-span-3'
                        placeholder='Warna'
                        type='text'
                      />
                      <Input
                        id='material'
                        className='col-span-3'
                        placeholder='Material'
                        type='text'
                      />
                    </div>
                    <div>
                      <Label>Foto Produk</Label>
                      <Input
                        id='images'
                        className='col-span-3'
                        type='file'
                        multiple
                      />
                    </div>
                    <div className='items-center gap-4'>
                      <Label htmlFor='username' className='text-right'>
                        Deskripsi
                      </Label>
                      <Textarea placeholder='Tambahkan Deskripsi Produk disini' />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type='submit'>Simpan</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className='flex md:flex-col flex-row gap-2'>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full text-left p-2 rounded-lg flex flex-row gap-2 text-black shadow hover:bg-gradient-to-r hover:from-teal-600 hover:to-100 transition-all duration-500 ease-in-out hover:brightness-125 hover:text-white ${
                  activeTab === "dashboard" ? "bg-[#45C6AB] text-white" : ""
                }`}
              >
                <CiHome size={25} />
                <p className='hidden md:block'>Overview</p>
              </button>
              <button
                onClick={() => setActiveTab("hadiah")}
                className={`w-full text-left p-2 rounded-lg flex flex-row gap-2 text-black shadow hover:bg-gradient-to-r hover:from-teal-600 hover:to-100 transition-all duration-500 ease-in-out hover:brightness-125 hover:text-white ${
                  activeTab === "hadiah" ? "bg-[#45C6AB] text-white" : ""
                }`}
              >
                <CiGift size={25} className='bg-opacity-5' />
                <p className='hidden md:block'>Rewards</p>
              </button>
              <button
                onClick={() => setActiveTab("produk")}
                className={`w-full text-left p-2 rounded-lg flex flex-row gap-2 text-black shadow hover:bg-gradient-to-r hover:from-teal-600 hover:to-100 transition-all duration-500 ease-in-out hover:brightness-125 hover:text-white ${
                  activeTab === "produk" ? "bg-[#45C6AB] text-white" : ""
                }`}
              >
                <CiShoppingTag size={25} />
                <p className='hidden md:block'>Produk</p>
              </button>
              <button
                onClick={() => setActiveTab("pesanan1")}
                className={`w-full text-left p-2 rounded-lg flex flex-row gap-2  text-black shadow hover:bg-gradient-to-r hover:from-teal-600 hover:to-100 transition-all duration-500 ease-in-out hover:brightness-125 hover:text-white ${
                  activeTab === "pesanan1" ? "bg-[#45C6AB] text-white" : ""
                }`}
              >
                <CiInboxIn size={25} />
                <p className='hidden md:block'>Pesanan Masuk</p>
              </button>
              <button
                onClick={() => setActiveTab("pesanan2")}
                className={`w-full text-left p-2 rounded-lg flex flex-row gap-2  text-black shadow hover:bg-gradient-to-r hover:from-teal-600 hover:to-100 transition-all duration-500 ease-in-out hover:brightness-125 hover:text-white ${
                  activeTab === "pesanan2" ? "bg-[#45C6AB] text-white" : ""
                }`}
              >
                <CiInboxOut size={25} />
                <p className='hidden md:block'>Pesanan Saya</p>
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full text-left p-2 rounded-lg flex flex-row gap-2  text-black shadow hover:bg-gradient-to-r hover:from-teal-600 hover:to-100 transition-all duration-500 ease-in-out hover:brightness-125 hover:text-white ${
                  activeTab === "settings" ? "bg-[#45C6AB] text-white" : ""
                }`}
              >
                <CiSettings size={25} />
                <p className='hidden md:block'>Settings</p>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Konten Utama */}
      <div className='flex-1 p-3 md:p-6 bg-gray-100 rounded-r-xl'>
        {activeTab === "dashboard" && (
          <div>
            <h1 className='text-xl md:text-2xl font-bold mb-6'>Overview</h1>
            <div className='grid grid-cols-1 justify-center sm:grid-cols-4 gap-6'>
              <div className='bg-white p-6 rounded-lg shadow-md flex flex-row gap-5'>
                <div>
                  <h3 className='text-lg font-semibold'>Total Penjualan</h3>
                  <div className='text-xl md:text-2xl font-bold'>
                    Rp {salesStats.totalSales}
                  </div>
                </div>
                <div className='flex items-center'>
                  {/* <GrMoney size={35} /> */}
                </div>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-md flex flex-row gap-5'>
                <div>
                  <h3 className='text-lg font-semibold'>Pesanan Masuk</h3>
                  <p className='text-xl md:text-2xl font-bold'>
                    {salesStats.totalOrders}
                  </p>
                </div>
                <div className='flex items-center'>
                  {/* <MdInput size={35} /> */}
                </div>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-md flex flex-row gap-5'>
                <div>
                  <h3 className='text-lg font-semibold'>Produk Terjual</h3>
                  <p className='text-xl md:text-2xl font-bold'>
                    {salesStats.totalProducts}
                  </p>
                </div>
                <div className='flex items-center'>
                  {/* <SiBookstack size={35} /> */}
                </div>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-md flex flex-row gap-5'>
                <div>
                  <h3 className='text-lg font-semibold'>Total Produk</h3>
                  <p className='text-xl md:text-2xl font-bold'>
                    {salesStats.totalProducts}
                  </p>
                </div>
                <div className='flex items-center'>
                  {/* <SiBookstack size={35} /> */}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "hadiah" && (
          <div>
            <h1 className='text-2xl font-bold mb-6'>Rewards</h1>
            <div className='container mx-auto md:p-5 p-1 bg-card rounded'>
              <div className='container bg-gradient-to-r from-100 to-teal-600 rounded-md p-6'>
                <p className='text-white'>
                  Hi {authenticatdUser?.name}, Berikut Detail Poinmu
                </p>
                <div className='bg-white rounded w-52 p-3 shadow-md flex flex-row items-center gap-2 my-2 text-2xl'>
                  <BsCoin size={40} />
                  <p className='text-center '>600</p>
                  <p className='font-bold'> Point </p>
                </div>
                <Progress value={60} />
              </div>
              <div className='flex flex-col gap-5 mt-5'>
                <p>
                  Berikut adalah benefit yang bisa ditukarkan dari jumlah poinmu
                  :
                </p>
                <div className='grid grid-cols-1 justify-center sm:grid-cols-4 gap-6'>
                  <div className='bg-white p-6 rounded-lg shadow-md flex flex-col gap-5'>
                    <div className='flex flex-col justify-between h-full'>
                      <div className='text-sm md:text-sm'>
                        <p className='text-2xl font-semibold'>Gratis Ongkir</p>
                        Gratis ongkir 5rb Min belanja 75rb
                      </div>
                    </div>
                    <Button>Klaim</Button>
                  </div>
                  <div className='bg-white p-6 rounded-lg shadow-md flex flex-col gap-5'>
                    <div className='flex flex-col justify-between h-full'>
                      <div className='text-sm md:text-sm'>
                        <p className='text-2xl font-semibold'>Gratis Ongkir</p>
                        Gratis ongkir 10rb Min belanja 150rb
                      </div>
                    </div>
                    <Button>Klaim</Button>
                  </div>
                  <div className='bg-white p-6 rounded-lg shadow-md flex flex-col gap-5'>
                    <div className='flex flex-col justify-between h-full'>
                      <div className='text-sm md:text-sm'>
                        <p className='text-2xl font-semibold'>Potongan Harga</p>
                        Potongan harga 5rb Min belanja 150rb
                      </div>
                    </div>
                    <Button>Klaim</Button>
                  </div>
                  <div className='bg-white p-6 rounded-lg shadow-md flex flex-col gap-5'>
                    <div className='flex flex-col justify-between h-full'>
                      <div className='text-sm md:text-sm'>
                        <p className='text-2xl font-semibold'>Potongan Harga</p>
                        Potongan harga 10rb Min Belanja 300rb
                      </div>
                    </div>
                    <Button>Klaim</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "produk" && (
          <div>
            <h1 className='text-2xl font-bold mb-6'>Daftar Produk</h1>
            <div className='container mx-auto md:p-5 p-1 bg-card rounded'>
              <ProductTable columns={productcolumns} data={dataProduct} />
            </div>
          </div>
        )}
        {activeTab === "pesanan1" && (
          <div>
            <h1 className='text-2xl font-bold mb-6'>Daftar Pesanan Masuk</h1>
            <div className='container mx-auto md:p-5 p-1 bg-card rounded'>
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        )}
        {activeTab === "pesanan2" && (
          <div>
            <h1 className='text-2xl font-bold mb-6'>Pesanan Saya</h1>
            <div className='container mx-auto md:p-5 p-1 bg-card rounded'>
              <PesananTable columns={pesanancolumns} data={dataPesanan} />
            </div>
          </div>
        )}
        {activeTab === "settings" && (
          <div>
            <h1 className='text-2xl font-bold mb-6'>Settings</h1>
            <div className='container mx-auto p-5 bg-card rounded grid grid-cols-1 gap-8'>
              <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-1/2'>
                  <p className='font-bold'>Alamat Penjemputan</p>
                  <p>
                    Untuk barang yang Anda jual, pastikan alamat penjemputan
                    kurir selalu terbaru.
                  </p>
                </div>
                <div className='border rounded p-2 flex flex-col md:flex-row md:items-center'>
                  <div className='flex-1'>
                    <p>Surur</p>
                    <p>08192345678</p>
                    <p>
                      Jl Pahlawan No 99, Kota Semarang, Jawa Tengah, Indonesia
                    </p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <CiEdit className='cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px]'>
                      <DialogHeader>
                        <DialogTitle>Edit Alamat</DialogTitle>
                        <DialogDescription>
                          Edit Alamat Anda disini
                        </DialogDescription>
                      </DialogHeader>
                      <div className='flex flex-col gap-4 py-4'>
                        <Input
                          id='name'
                          placeholder='Nama'
                          className='col-span-3'
                          defaultValue='Surur'
                        />
                        <Input
                          id='no'
                          defaultValue='08192345678'
                          className='col-span-3'
                          placeholder='No Telepon'
                        />
                        <Input
                          id='alamat'
                          defaultValue='Jl Pahlawan No 99, Kota Semarang, Jawa Tengah, Indonesia'
                          className='col-span-3'
                          placeholder='Alamat Lengkap'
                        />
                      </div>
                      <DialogFooter>
                        <Button type='submit'>Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-1/2'>
                  <p className='font-bold'>Kurir Pengiriman</p>
                  <p>
                    Perhatian! Sistem secara otomatis hanya memperlihatkan kurir
                    yang tersedia di lokasi pelangganmu. Disarankan untuk
                    mengaktifkan semua kurir.
                  </p>
                </div>
                <div className='p-2 grid grid-cols-2 gap-2 w-full md:w-1/2'>
                  {["Grab", "Gojek", "JNE", "J&T"].map((kurir) => (
                    <div
                      key={kurir}
                      className='items-center flex space-x-2 border p-2 rounded'
                    >
                      <Checkbox id={kurir} />
                      <div className='grid gap-1.5 leading-none'>
                        <label
                          htmlFor={kurir}
                          className='text-sm font-medium leading-none'
                        >
                          {kurir}
                        </label>
                        <p className='text-sm text-muted-foreground'>
                          {kurir === "Grab" || kurir === "Gojek"
                            ? "Hanya pick up kurir"
                            : "Pick up kurir dan Drop off di agen terdekat"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='flex flex-col border p-2 rounded w-full md:w-1/2'>
                <div className='flex flex-row gap-5 items-center'>
                  <p className='font-bold'>Mode liburan</p>
                  <Switch />
                </div>
                <p className='text-sm text-muted-foreground'>
                  Ini akan sementara menonaktifkan pelanggan untuk membeli
                  barang-barangmu, jadi kamu bisa fokus liburanmu yang
                  menyenangkan!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
