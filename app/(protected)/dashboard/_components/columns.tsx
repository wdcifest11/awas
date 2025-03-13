"use client";

import {Button} from "@/components/ui/button";
import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: number;
  price: number;
  title: string;
  sellingType: "Beli Langsung" | "Barter" | "Sewa";
  user: {
    name: string;
  };
  thumbnail: string;
};

export const columns: ColumnDef<Payment>[] = [
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
          Product Name
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
    accessorKey: "sellingType",
    header: ({column}) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type Selling
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "button",
    header: "Action",
    cell: ({row}) => {
      const handleAccept = () => {
        // Logic for accepting the payment
        console.log(`Accepted payment with ID: ${row.original.id}`);
      };

      const handleDecline = () => {
        // Logic for declining the payment
        console.log(`Declined payment with ID: ${row.original.id}`);
      };

      return (
        <div className='flex space-x-2'>
          <Button onClick={handleAccept}>Accept</Button>
          <Button variant='destructive' onClick={handleDecline}>
            Decline
          </Button>
        </div>
      );
    },
  },
];
