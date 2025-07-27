"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { motion } from "motion/react";
import Link from "next/link";
import { useMemo } from "react";
import type { Post } from "@/lib/get-blog-posts";

export default function BlogTable({ posts }: { posts: Post[] }) {
  const columns = useMemo<ColumnDef<Post>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: (info) => (
          <Link
            className="text-blue-500 hover:underline"
            href={`/blog/${info.row.original.slug}`}
          >
            {info.getValue<string>()}
          </Link>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: (info) => new Date(info.getValue<string>()).toLocaleDateString(),
      },
    ],
    []
  );

  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <motion.h1
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Blog Posts
      </motion.h1>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="p-4"
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <table className="w-full border-collapse border-0">
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className="p-2" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </>
  );
}
