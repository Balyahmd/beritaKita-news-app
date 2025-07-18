import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CardPopuler from "../components/Card/CardArticlePopuler";
import CardArticleRecome from "../components/Card/CardArticleRecome";
import KomentarSection from "../components/Komentar/komentarSection";
import Breadcrumbs from "../components/Breadcrumbs";
import { getAntaraNews } from "../services/getAllNews";

type NewsItem = {
  id: number | string;
  link: string;
  title: string;
  pubDate: string;
  category: string;
  thumbnail: string;
  description?: string;
};

const DetailPage: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [related, setRelated] = useState<NewsItem[]>([]);
  const [populer, setPopuler] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getAntaraNews(category as string);
        const posts: NewsItem[] = Array.isArray(data?.data?.posts)
          ? data.data.posts
          : [];
        // Temukan berita detail berdasarkan id (bisa dari id atau dari link)
        const detail = posts.find(
          (item: NewsItem) =>
            String(item.id) === String(id) ||
            (item.link && item.link.split("/").pop() === id)
        );
        if (isMounted) {
          setNews(detail || null);
          // Berita terkait: ambil 3 berita lain dari kategori yang sama, exclude current
          setRelated(
            posts
              .filter(
                (item: NewsItem) =>
                  String(item.id) !== String(id) &&
                  item.link &&
                  item.link.split("/").pop() !== id
              )
              .slice(0, 3)
          );
          // Berita terpopuler: ambil 5 teratas
          setPopuler(posts.slice(0, 5));
        }
      } catch {
        if (isMounted) {
          setNews(null);
          setRelated([]);
          setPopuler([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [category, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-gray-500">Memuat...</span>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-red-500">Berita tidak ditemukan.</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-7 mx-5 md:px-0">
      <Breadcrumbs />
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
            {news.title}
          </h1>
          <div className="py-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="text-blue-600 font-inter font-regular">
                {category}
              </span>
              <span className="text-gray-300">•</span>
              <span>
                {news.pubDate
                  ? new Date(news.pubDate).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "-"}
              </span>
            </div>
          </div>
          <img
            src={news.thumbnail}
            alt={news.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          {news.description && (
            <p className="text-[#959EA9] text-sm font-inter font-medium mb-6">
              {news.description}
            </p>
          )}
          <div className="text-[#526071] text-sm font-inter leading-relaxed space-y-4">
            {news.description ? (
              <p>{news.description}</p>
            ) : (
              <p>
                Tidak ada deskripsi berita. Silakan kunjungi{" "}
                <a
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline">
                  sumber berita
                </a>
                .
              </p>
            )}
          </div>
          <div>
            <KomentarSection />
            <div className="py-4 md:py-8">
              <div className="border-l-4 border-blue-600 pl-4 mb-8 flex items-center justify-between">
                <h2 className="font-bold">Berita Terkait</h2>
                <Link
                  to={`/${category}`}
                  className="ml-auto text-primary border border-primary bg-blue-50 hover:bg-blue-100 text-sm font-medium px-4 py-2 rounded transition-colors duration-200">
                  Lihat Semua
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {related.length === 0 ? (
                  <span className="text-gray-400">
                    Tidak ada berita terkait.
                  </span>
                ) : (
                  related.map((item) => (
                    <div className="flex items-center justify-center">
                      <CardArticleRecome
                        key={item.id}
                        title={item.title}
                        thumbnail={item.thumbnail}
                        category={category ?? ""}
                        pubDate={item.pubDate}
                        link={item.link}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full md:w-80 flex-shrink-0">
          <div className="border-l-4 border-blue-600 pl-4 mb-8">
            Berita Terpopuler
          </div>
          {populer.length === 0 ? (
            <span className="text-gray-400">Tidak ada berita populer.</span>
          ) : (
            populer.map((item, idx) => (
              <div key={item.id} className="flex items-start mb-10">
                <div className="relative mr-3">
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-secondary text-white font-bold text-sm flex items-center justify-center">
                    {idx + 1}
                  </div>
                </div>
                <CardPopuler
                  title={item.title}
                  thumbnail={item.thumbnail}
                  category={category ?? ""}
                  pubDate={item.pubDate}
                  link={item.link}
                />
              </div>
            ))
          )}
        </aside>
      </div>
    </div>
  );
};

export default DetailPage;
