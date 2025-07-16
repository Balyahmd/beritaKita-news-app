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

  // Buat array breadcrumb
  const items: BreadcrumbItem[] = [
    {
      name: "Beranda",
      to: "/",
      icon: <AiOutlineHome className="mr-1" />,
    },
    ...pathnames.map((value, idx) => {
      if (value === "detail") {
        return {
          name: "Detail",
          to: "/" + pathnames.slice(0, idx + 1).join("/"),
        };
      }
      return {
        name: capitalize(decodeURIComponent(value)),
        to: "/" + pathnames.slice(0, idx + 1).join("/"),
      };
    }),
  ];

  return (
    <nav
      className="flex items-center space-x-2 text-gray-700 text-sm py-4 mb-10"
      aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            {idx !== 0 && <span className="mx-2 text-gray-400">{">"}</span>}
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
