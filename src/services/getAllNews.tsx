import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ?? "https://api-berita-indonesia.vercel.app";

/**
 * @typedef {"terbaru"|"politik"|"hukum"|"ekonomi"|"bola"|"olahraga"|"humaniora"|"lifestyle"|"hiburan"|"dunia"|"tekno"|"otomotif"} AntaraCategory
 */

/**
 * @param {AntaraCategory} [category="terbaru"]
 */
export async function getAntaraNews(category = "terbaru") {
  const endpoint = `/antara/${category}/`;
  try {
    const response = await axios.get(`${API_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    let message = "Terjadi kesalahan saat mengambil data berita Antara";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    } else if (error instanceof Error) {
      message = error.message || message;
    }
    throw new Error(message);
  }
}
