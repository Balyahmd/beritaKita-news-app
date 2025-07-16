import React, { useEffect, useState } from "react";
import CardPopuler from "./Card/CardArticlePopuler";
import { getAntaraNews } from "../services/getAllNews";

type NewsItem = {
  title: string;
  thumbnail: string;
  category: string;
  pubDate: string;
  link: string;
};

const NewsTerpopuler: React.FC = () => {
  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // We'll use "terbaru" as the category for popular news for now
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAntaraNews();

        const posts = response?.data?.posts || [];
        const populer = posts.slice(0, 3).map((item: NewsItem) => ({
          title: item.title,
          thumbnail: item.thumbnail,
          category: item.category,
          pubDate: item.pubDate,
          link: item.link,
        }));
        setData(populer);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Gagal memuat berita terpopuler.");
        } else {
          setError("Gagal memuat berita terpopuler.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="my-8">
      <div className="border-l-4 border-blue-600 pl-4 mb-8">
        <h3 className="text-lg font-semibold">Berita Terpopuler</h3>
      </div>
      {loading ? (
        <div className="text-center py-8 text-gray-500">Memuat...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((item, idx) => (
            <div key={item.link} className="flex items-start">
              <div className="relative mr-3">
                <div className="absolute -left-1 top-[6] -translate-y-1/2 w-6 h-6 rounded-full bg-secondary text-white font-bold text-sm flex items-center justify-center shadow">
                  {idx + 1}
                </div>
              </div>
              <CardPopuler
                title={item.title}
                thumbnail={item.thumbnail}
                category={item.category}
                pubDate={item.pubDate}
                link={item.link}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewsTerpopuler;
