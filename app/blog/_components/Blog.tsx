import React, { useState } from "react";
import Link from "next/link";
import { blogs } from "@/app/(data)/Blogs";

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="bg-gray-900">
      <div className="min-h-screen text-gray-100 px-6 py-12 max-w-3xl mx-auto">
        <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-pink-500 text-transparent bg-clip-text">
          Latest
        </h1>
        <p className="text-gray-400 mb-12">
          The Latest and greatest from our team
        </p>

        {currentBlogs.map((post) => (
          <div key={post.slug} className="mb-12 border-t border-gray-800 pt-8">
            <div className="flex items-baseline mb-2">
              <p className="text-gray-400 text-sm mr-4 w-24">{post.date}</p>
              <h2 className="text-1xl font-semibold text-white">
                {post.title}
              </h2>
            </div>
            <div className="flex gap-2 mb-2 ml-28">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded bg-white text-pink-500 uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-400 mb-2 ml-28 text-sm">{post.excerpt}</p>
            <div className="ml-28">
              <Link href={`/blog/${post.slug}`}>
                <span className="text-pink-500 hover:underline text-sm">
                  Read more →
                </span>
              </Link>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-0.5 mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-1 py-0.5 text-xs rounded bg-pink-500 text-white disabled:opacity-50"
          >
            &lt; previous
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-1.5 py-0.5 text-xs rounded ${
                currentPage === number
                  ? "bg-pink-500 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-1 py-0.5 text-xs rounded bg-pink-500 text-white disabled:opacity-50"
          >
            next &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
