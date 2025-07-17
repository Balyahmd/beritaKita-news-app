import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

type BreadcrumbItem = {
  name: string;
  to: string;
  icon?: React.ReactNode;
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  // Ambil path dan filter string kosong
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Cek jika path terakhir adalah judul detail (slug panjang), ganti dengan "detail"
  let items: BreadcrumbItem[] = [
    {
      name: "Beranda",
      to: "/",
      icon: <AiOutlineHome className="mr-1" />,
    },
  ];

  if (pathnames.length > 0) {
    // Cek apakah ada "detail" di pathnames
    const detailIdx = pathnames.findIndex((v) => v === "detail");
    if (detailIdx !== -1 && pathnames.length > detailIdx + 1) {
      // Ada "detail" dan ada slug setelahnya
      // Tambahkan breadcrumbs sampai "detail"
      for (let i = 0; i <= detailIdx; i++) {
        if (i === detailIdx) {
          items.push({
            name: "Detail",
            to: "/" + pathnames.slice(0, i + 2).join("/"),
          });
        } else {
          items.push({
            name: capitalize(decodeURIComponent(pathnames[i] ?? "")),
            to: "/" + pathnames.slice(0, i + 1).join("/"),
          });
        }
      }
      // Tidak tambahkan slug panjang ke breadcrumb
    } else {
      // Tidak ada "detail" di path, normal
      items = [
        ...items,
        ...(pathnames.map((value, idx) => ({
          name: capitalize(decodeURIComponent(value)),
          to: "/" + pathnames.slice(0, idx + 1).join("/"),
        })) as BreadcrumbItem[]),
      ];
    }
  }

  return (
    <nav
      className="flex items-center space-x-2 text-gray-700 text-sm py-4 mb-10"
      aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            {idx !== 0 && <span className="mx-2 text-gray-700">{">"}</span>}
            <li className="flex items-center">
              {item.icon !== undefined ? (
                <Link
                  to={item.to}
                  className="flex items-center hover:underline">
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ) : idx !== items.length - 1 ? (
                <Link to={item.to} className="hover:underline">
                  {item.name}
                </Link>
              ) : (
                <span className="text-gray-500">{item.name}</span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
