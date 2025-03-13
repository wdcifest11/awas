"use client";

import React from "react";
import {useParams} from "next/navigation";
import {ArrowLeft} from "lucide-react";
import Link from "next/link";
import Badge from "@/components/ui/badge";
import {articles} from "@/data/articles";
import ArticleComments from "./_components/comments";
import ArticleLikes from "./_components/likes";
import ArticleShare from "./_components/share";
import Image from "next/image";

const ArticleDetailPage = () => {
  const {slug} = useParams();

  if (!slug) return <p>Loading...</p>;

  const article = articles.find((item) => item.slug === slug);

  if (!article) return <p>Artikel tidak ditemukan!</p>;

  return (
    <div className='relative p-4 md:p-6 min-h-screen flex justify-center items-center'>
      <div className='w-full max-w-4xl relative rounded-3xl overflow-hidden'>
        <div className='relative h-[70vh]'>
          <Image
            src={article.image}
            alt={article.title}
            width={500}
            height={500}
            className='w-full h-full object-cover object-bottom'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />

          <div className='absolute bottom-10 left-6 text-white space-y-2'>
            <Badge
              text={article.category}
              className='bg-teal-500 bg-opacity-80'
            />
            <h1 className='text-4xl font-bold'>{article.title}</h1>
            <p className='text-sm text-gray-200'>{article.date}</p>
          </div>

          <Link
            href='/education'
            className='absolute top-4 left-4 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition'
          >
            <ArrowLeft className='text-gray-700' />
          </Link>
        </div>

        {/* Article Content Card */}
        <div className='relative -mt-6 p-8 bg-white rounded-t-3xl shadow-2xl'>
          <div className='flex justify-between mb-4'>
            <ArticleShare
              url={`https://ecowearhub.com/articles/${article.slug}`}
            />
            <ArticleLikes />
          </div>
          <article
            className='prose max-w-none text-gray-700 leading-relaxed space-y-4'
            dangerouslySetInnerHTML={{__html: article.content}}
          />
          <ArticleComments />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
