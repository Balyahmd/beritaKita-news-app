import React from "react";
import logoFoot from "../assets/logo-footer.png";
import {
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaTelegramPlane,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    href: "https://www.youtube.com/",
    label: "YouTube",
    icon: <FaYoutube size={18} />,
  },
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    icon: <FaInstagram size={18} />,
  },
  {
    href: "https://www.facebook.com/",
    label: "Facebook",
    icon: <FaFacebookF size={18} />,
  },
];

const navLinks = [
  { to: "/", label: "Beranda" },
  { to: "/politik", label: "Politik" },
  { to: "/hukum", label: "Hukum" },
  { to: "/ekonomi", label: "Ekonomi" },
  { to: "/bola", label: "Bola" },
  { to: "/olahraga", label: "Olahraga" },
  { to: "/humaniora", label: "Humaniora" },
  { to: "/lifestyle", label: "Lifestyle" },
  { to: "/hiburan", label: "Hiburan" },
  { to: "/dunia", label: "Dunia" },
  { to: "/tekno", label: "Tekno" },
  { to: "/otomotif", label: "Otomotif" },
];
const bantuanLinks = [
  { to: "/kontak", label: "Kontak Kami" },
  { to: "/laporan", label: "Laporan Pembaca" },
  { to: "/kebijakan", label: "Kebijakan" },
];

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-secondary text-white py-8 px-4 mt-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Copyright */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={logoFoot}
              alt="Logo Berita Kini"
              className="h-12 w-12 object-contain"
            />
            <span className="font-poppins text-lg font-semibold">
              Berita Kini
            </span>
          </div>
          <p className="text-xs text-gray-300 mb-2">
            © {new Date().getFullYear()} Berita Kini. All Rights Reserved.
          </p>
          <div>
            <span className="text-xs text-gray-300">Ikuti Kami</span>
            <div className="flex gap-3 mt-2">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="bg-[#E0E0E0] p-2 rounded-xl text-black hover:bg-primary transition"
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer">
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Telusuri */}
        <div>
          <h5 className="font-bold text-base mb-2">Telusuri</h5>
          <div className="grid grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm text-gray-200">
              {navLinks.slice(0, Math.ceil(navLinks.length / 2)).map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 text-sm text-gray-200">
              {navLinks.slice(Math.ceil(navLinks.length / 2)).map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Bantuan */}
        <div>
          <h5 className="font-bold text-base mb-2">Bantuan</h5>
          <ul className="space-y-2 text-sm text-gray-200">
            {bantuanLinks.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Berlangganan */}
        <div>
          <h5 className="font-bold text-base mb-2">
            Berlangganan Berita Terbaru
          </h5>
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="relative w-full">
              <input
                type="email"
                placeholder="Masukkan email"
                className="w-full px-4 py-4 pr-10 rounded text-gray-400 text-sm outline-none bg-white placeholder:text-gray-400"
                required
                autoComplete="email"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary p-2 rounded hover:bg-blue-700 transition"
                aria-label="Kirim">
                <FaTelegramPlane />
              </button>
            </div>
          </form>
        </div>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed z-50 right-6 bottom-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition focus:outline-none"
        aria-label="Kembali ke atas"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
