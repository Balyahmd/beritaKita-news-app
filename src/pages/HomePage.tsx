import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import PaginationHeadline from "../components/Pagination/PaginationHeadline";
import Banner from "../components/Banner";
import PaginationArticle from "../components/Pagination/PaginationArticle";
import CardPopuler from "../components/Card/CardArticlePopuler";
import CardArticleRecome from "../components/Card/CardArticleRecome";
import CardHeadline from "../components/Card/CardHeadline";
import { getAntaraNews } from "../services/getAllNews";
import { IoSearchOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";

type NewsItem = {
  title: string;
  thumbnail: string;
  category: string;
  pubDate: string;
  link: string;
  description?: string;
};

const Home: React.FC = () => {
  const { category } = useParams();
  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [headline, setHeadline] = useState<NewsItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const selectedCategory = category ?? "terbaru";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAntaraNews(selectedCategory);
        const posts: NewsItem[] = response?.data?.posts || [];
        setData(posts);
        setCurrentPage(1);
        setHeadline(posts[0] ?? null);
      } catch {
        setError("Gagal memuat berita.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (filteredData.length > 0) {
      setHeadline(filteredData[currentPage - 1] ?? null);
    } else {
      setHeadline(null);
    }
  }, [filteredData, currentPage]);

  const renderStatus = (loadingText = "Memuat...") => {
    if (loading)
      return (
        <div className="text-center py-8 text-gray-500">{loadingText}</div>
      );
    if (error)
      return <div className="text-center py-8 text-red-500">{error}</div>;
    return null;
  };

  // Refs for scroll animation
  const headlineRef = useRef(null);
  const populerRef = useRef(null);
  const rekomendasiRef = useRef(null);
  const bannerRef = useRef(null);

  // InView hooks
  const headlineInView = useInView(headlineRef, {
    once: true,
    margin: "-100px",
  });
  const populerInView = useInView(populerRef, { once: true, margin: "-100px" });
  const rekomendasiInView = useInView(rekomendasiRef, {
    once: true,
    margin: "-100px",
  });
  const bannerInView = useInView(bannerRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="px-7">
      {/* Headline Section */}
      <div className="mt-5 pt-7" ref={headlineRef}>
        {loading || error ? (
          renderStatus()
        ) : headline ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5 }}>
              <CardHeadline
                title={headline.title}
                description={headline.description ?? ""}
                image={headline.thumbnail}
                date={new Date(headline.pubDate).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                link={selectedCategory}
              />
            </motion.div>

            {filteredData.length > 1 && (
              <PaginationHeadline
                currentPage={currentPage}
                totalPages={filteredData.length}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Tidak ada berita ditemukan.
          </div>
        )}
      </div>

      {/* Berita Terpopuler */}
      <div className="py-12" ref={populerRef}>
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={
            populerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
          }
          transition={{ duration: 0.5 }}
          className="my-8">
          <div className="border-l-4 border-blue-600 pl-4 mb-8">
            <h2 className="text-lg font-semibold">Berita Terpopuler</h2>
          </div>
          {loading || error ? (
            renderStatus()
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.slice(0, 3).map((item, idx) => (
                <motion.div
                  key={item.link}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    populerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex items-start">
                  <div className="relative mr-3">
                    <div className="absolute -left-1 top-[6px] -translate-y-1/2 w-6 h-6 rounded-full bg-secondary text-white font-bold text-sm flex items-center justify-center shadow">
                      {idx + 1}
                    </div>
                  </div>
                  <CardPopuler
                    title={item.title}
                    thumbnail={item.thumbnail}
                    category={selectedCategory}
                    pubDate={item.pubDate}
                    link={item.link}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>

      {/* Rekomendasi Artikel */}
      <motion.section
        ref={rekomendasiRef}
        initial={{ opacity: 0 }}
        animate={rekomendasiInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="border-l-4 border-blue-600 pl-4 mb-8">
            <h2 className="text-xl font-bold text-gray-800">
              Rekomendasi Untuk Anda
            </h2>
          </div>
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Cari berita di sini..."
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary pr-10"
              value={searchTerm}
              onChange={handleChange}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              <IoSearchOutline className="text-gray-400 text-md" />
            </span>
          </div>
        </div>

        {loading || error ? (
          renderStatus()
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredData
                .slice((currentPage - 1) * 8, currentPage * 8)
                .map((item, index) => (
                  <motion.div
                    key={item.link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      rekomendasiInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 20 }
                    }
                    transition={{
                      delay: rekomendasiInView ? index * 0.05 : 0,
                    }}>
                    <CardArticleRecome
                      title={item.title}
                      thumbnail={item.thumbnail}
                      category={selectedCategory}
                      pubDate={item.pubDate}
                      link={item.link}
                    />
                  </motion.div>
                ))}
            </div>
            <div className="mt-8 pt-5">
              <PaginationArticle
                totalItems={filteredData.length}
                itemsPerPage={8}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </motion.section>

      {/* Banner Section */}
      <div className="py-12" ref={bannerRef}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            bannerInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.4 }}>
          <Banner />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
