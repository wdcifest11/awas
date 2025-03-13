"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
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
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: number;
  price: number;
  title: string;
  user: {
    name: string;
  };
  thumbnail: string;
};

export const productcolumns: ColumnDef<Product>[] = [
  {
    accessorKey: "thumbnail",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.thumbnail}
          alt={row.original.title}
          className="w-16 h-16 object-cover rounded"
          width={500}
          height={500}
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  // {
  //   accessorKey: "sellingType",
  //   header: ({column}) => {
  //     return (
  //       <Button
  //         variant='ghost'
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Type Selling
  //         <ArrowUpDown className='ml-2 h-4 w-4' />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "button",
    header: "Action",
    cell: ({ row }) => {
      const handleAccept = () => {
        // Logic for accepting the payment
        console.log(`Accepted payment with ID: ${row.original.id}`);
      };

      const handleDecline = () => {
        // Logic for declining the payment
        console.log(`Declined payment with ID: ${row.original.id}`);
      };

      return (
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={handleAccept}>Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Tambah Produk</DialogTitle>
                <DialogDescription>
                  Tambahkan Produk anda secara detail disini
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex flex-row">
                  <Input
                    id="name"
                    placeholder="Nama"
                    className="col-span-3"
                    type="text"
                  />
                </div>
                <div className="flex flex-row gap-4 ">
                  <Input
                    id="brand"
                    className="col-span-3"
                    placeholder="Brand"
                    type="text"
                  />
                  <Input
                    id="price"
                    className="col-span-3"
                    placeholder="Harga"
                    type="number"
                  />
                </div>

                <div className="flex flex-row items-center gap-4">
                  <Input
                    id="category"
                    className="col-span-3"
                    placeholder="Kategori"
                    type="text"
                  />
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Pilih Jenis Kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Jenis Kelamin</SelectLabel>
                        <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <div className="border p-1 text-center rounded-xl">
                    <Label>Jenis Penjualan</Label>
                    <ToggleGroup type="multiple" variant="outline">
                      <ToggleGroupItem
                        className="text-100 font-semibold"
                        value="jual"
                      >
                        Jual
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        className="text-100 font-semibold"
                        value="barter"
                      >
                        Barter
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        className="text-100 font-semibold"
                        value="sewa"
                      >
                        Sewa
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  <Input
                    id="username"
                    readOnly
                    className="col-span-3"
                    placeholder="Kondisi Barang"
                  />
                </div>
                <div className="flex flex-row items-center gap-4">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Ukuran Produk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Ukuran</SelectLabel>
                        <SelectItem value="xs">XS</SelectItem>
                        <SelectItem value="s">S</SelectItem>
                        <SelectItem value="m">M</SelectItem>
                        <SelectItem value="l">L</SelectItem>
                        <SelectItem value="xl">XL</SelectItem>
                        <SelectItem value="2xl">2XL</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipe Produk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tipe</SelectLabel>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="sport">Sport</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <Input
                    id="color"
                    className="col-span-3"
                    placeholder="Warna"
                    type="text"
                  />
                  <Input
                    id="material"
                    className="col-span-3"
                    placeholder="Material"
                    type="text"
                  />
                </div>
                <div>
                  <Label>Foto Produk</Label>
                  <Input
                    id="images"
                    className="col-span-3"
                    type="file"
                    multiple
                  />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Deskripsi
                  </Label>
                  <Textarea placeholder="Tambahkan Deskripsi Produk disini" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Simpan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger onClick={handleDecline} className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600">Hapus</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Apa kamu yakin ingin menghapus produk ini?</AlertDialogTitle>
                <AlertDialogDescription>
                Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus produk Anda secara permanen.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction className="bg-red-500 hover:bg-red-600">Hapus</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
