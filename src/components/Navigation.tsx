import { NavLink } from "react-router-dom";
import logoNav from "../assets/logo-nav.png";
import logoFoot from "../assets/logo-footer.png";
import React, { useState } from "react";
import useScroll from "../hooks/useScroll";

// Sesuaikan kategori dengan kebutuhan aplikasi
const navLinks = [
  { to: "/", label: "Beranda", end: true },
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

const Navigation: React.FC = () => {
  const scrolled = useScroll();
  const [open, setOpen] = useState(false);

  // Tutup menu saat navigasi
  const handleNavClick = () => setOpen(false);

  return (
    <header
      className={`py-4 px-[24px] md:px-[72px] border-b-slate-100 shadow-sm flex justify-between items-center transition-colors duration-300 ${
        scrolled ? "bg-primary text-slate-50" : "bg-white text-gray"
      }`}>
      <NavLink
        to="/"
        className="flex items-center gap-2"
        onClick={handleNavClick}>
        <img
          src={scrolled ? logoFoot : logoNav}
          alt="Logo Berita Kita"
          className="h-8 w-8 object-contain"
        />
        <span
          className={`text-lg font-poppins font-semibold ${
            scrolled ? "text-white" : "text-black"
          }`}>
          Berita Kita
        </span>
      </NavLink>
      {/* Desktop Nav */}
      <nav className="space-x-4 font-inter font-medium transition-colors duration-300 hidden md:flex">
        {navLinks.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }: { isActive: boolean }) =>
              scrolled
                ? `hover:text-white transition-colors${
                    isActive ? " text-white font-bold" : ""
                  }`
                : `hover:text-primary transition-colors${
                    isActive ? " text-primary font-bold" : ""
                  }`
            }
            onClick={handleNavClick}>
            {label}
          </NavLink>
        ))}
      </nav>
      {/* Hamburger Button */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none"
        aria-label="Toggle navigation"
        onClick={() => setOpen((prev) => !prev)}>
        <span
          className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
            open ? "rotate-45 translate-y-1.5" : ""
          }`}></span>
        <span
          className={`block w-6 h-0.5 bg-current my-1 transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}></span>
        <span
          className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-1.5" : ""
          }`}></span>
      </button>
      {/* Mobile Nav Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } md:hidden`}
        onClick={() => setOpen(false)}></div>
      {/* Mobile Nav */}
      <nav
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 font-inter font-medium flex flex-col pt-24 px-8 gap-6
        ${open ? "translate-x-0" : "translate-x-full"} md:hidden`}
        style={{
          backgroundColor: scrolled ? "#2563eb" : "#fff",
          color: scrolled ? "#fff" : "#222",
        }}>
        <button
          className="absolute top-6 right-6 text-2xl font-bold focus:outline-none"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}>
          ×
        </button>
        {navLinks.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }: { isActive: boolean }) =>
              `${
                scrolled ? "hover:text-white" : "hover:text-primary"
              } transition-colors text-lg py-2 px-2 rounded ${
                isActive
                  ? scrolled
                    ? "text-white font-bold"
                    : "text-primary font-bold"
                  : ""
              }`
            }
            onClick={handleNavClick}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Navigation;
