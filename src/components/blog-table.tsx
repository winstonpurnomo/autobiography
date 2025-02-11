"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Post } from "@/lib/get-blog-posts";
import { motion } from "motion/react";

export default function BlogTable({ posts }: { posts: Post[] }) {
  const columns = useMemo<ColumnDef<Post>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: (info) => (
          <Link
            href={`/blog/${info.row.original.slug}`}
            className="text-blue-500 hover:underline"
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
    [],
  );

  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Blog Posts
      </motion.h1>
      <motion.div
        className="p-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <table className="w-full border-collapse border-0">
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
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
