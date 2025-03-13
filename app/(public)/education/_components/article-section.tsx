"use client";

import React from "react";
import {useRouter} from "next/navigation";
import Badge from "@/components/ui/badge";
import {ArrowRight, CalendarDays} from "lucide-react";

interface Article {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  category: string;
  date: string;
}

interface ArticleSectionProps {
  articles: Article[];
}

const ArticleSection: React.FC<ArticleSectionProps> = ({articles}) => {
  const router = useRouter();

  return (
    <section className='my-12'>
      <div className='text-center mb-16'>
        <h2 className='text-3xl font-bold mb-2 mx-16'>Temukan Wawasan Baru!</h2>
        <p className='text-gray-600 mx-4'>
          Baca artikel menarik dan dapatkan pengetahuan baru seputar edukasi dan
          fashion berkelanjutan.
        </p>
      </div>

      <div className='mx-4 md:mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {articles.map((article) => (
          <div
            key={article.title}
            className='bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105'
            onClick={() => router.push(`/education/${article.slug}`)}
          >
            <img
              src={article.image}
              alt={article.title}
              className='w-full h-48 object-cover object-bottom bg-gray-200'
            />
            <div className='p-4'>
              <Badge text={article.category} />
              <h3 className='text-xl font-bold my-2'>{article.title}</h3>
              <div className='flex items-center text-sm text-gray-500 mb-2'>
                <CalendarDays className='w-4 h-4 mr-2' />
                <span>{article.date}</span>
              </div>
              <p className='text-gray-700 text-sm line-clamp-3 mb-4'>
                {article.excerpt}
              </p>
              <button
                className='text-blue-600 font-medium hover:text-blue-800 flex items-center'
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/education/${article.slug}`);
                }}
              >
                Baca Selengkapnya
                <ArrowRight className='w-4 h-4 ml-2 hover:text-blue-800' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArticleSection;
