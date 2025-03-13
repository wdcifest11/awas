"use client";
import React, {useState} from "react";
import {IoMdStar, IoMdStarOutline} from "react-icons/io";
import {Button} from "@/components/ui/button";
import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react";
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
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

export type Pesanan = {
  id: number;
  price: number;
  title: string;
  sellingType: "Beli Langsung" | "Barter" | "Sewa";
  user: {
    name: string;
  };
  thumbnail: string;
  status: "dikemas" | "dikirim" | "selesai" | "dibatalkan";
};

export const pesanancolumns: ColumnDef<Pesanan>[] = [
  {
    accessorKey: "thumbnail",
    header: "Image",
    cell: ({row}) => {
      return (
        <Image
          src={row.original.thumbnail}
          alt={row.original.title}
          className='w-16 h-16 object-cover rounded'
          width={500}
          height={500}
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: ({column}) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pesanan Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      const handleStatusClick = () => {
        const status = row.getValue("status");
        if (status === "dikemas" || status === "dikirim") {
          setIsDialogOpen(true);
        }
      };

      return (
        <div>
          <span
            onClick={handleStatusClick}
            className='cursor-pointer text-blue-500 hover:underline'
          >
            {row.getValue("status")}
          </span>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Status Detail</DialogTitle>
                <DialogDescription>
                  Informasi lebih lanjut tentang status:{" "}
                  {row.getValue("status")}
                </DialogDescription>
              </DialogHeader>
              <Label>Info Pengiriman</Label>
              <p>J&T : JT081762357</p>
              <p className='text-bold'>
                Pesanan Sedang {row.getValue("status")}
              </p>
              <Label className='text-bold'>Alamat Pengiriman</Label>
              <div className='border rounded p-2 flex flex-col md:flex-row md:items-center'>
                <div className='flex-1'>
                  <p>Surur</p>
                  <p>08192345678</p>
                  <p>
                    Jl Pahlawan No 99, Kota Semarang, Jawa Tengah, Indonesia
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsDialogOpen(false)}>Tutup</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
  {
    accessorKey: "button",
    header: "Action",
    cell: ({row}) => {
      const status = row.original.status;

      const handleAccept = () => {
        console.log(`Accepted payment with ID: ${row.original.id}`);
      };

      const handleDecline = () => {
        console.log(`Declined payment with ID: ${row.original.id}`);
      };
      const [rating, setRating] = useState(0);

      const handleRating = (value: number) => {
        setRating(value);
      };
      return (
        <div className='flex space-x-2'>
          {status === "dikemas" || status === "dikirim" ? (
            <Button variant='destructive' onClick={handleDecline}>
              Batalkan Pesanan
            </Button>
          ) : status === "selesai" ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Beri Rating</Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Tambah Produk</DialogTitle>
                  <DialogDescription>
                    Tambahkan Produk anda secara detail disini
                  </DialogDescription>
                </DialogHeader>
                <div className='flex justify-center'>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div
                      key={value}
                      onClick={() => handleRating(value)}
                      className='cursor-pointer'
                    >
                      {value <= rating ? (
                        <IoMdStar className='text-yellow-500 h-6 w-6' />
                      ) : (
                        <IoMdStarOutline className='text-gray-400 h-6 w-6' />
                      )}
                    </div>
                  ))}
                  <span className='ml-2 text-lg'>{rating} / 5</span>{" "}
                </div>
                <div className='items-center gap-4'>
                  <Label htmlFor='username' className='text-right'>
                    Deskripsi
                  </Label>
                  <Textarea placeholder='Tambahkan Deskripsi Produk disini' />
                </div>
                <DialogFooter>
                  <Button>Beri Rating</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : null}{" "}
        </div>
      );
    },
  },
];
