import { useState, useCallback } from "react";

/**
 * Custom hook untuk mengelola state hamburger menu (open/close)
 * @returns { open, openMenu, closeMenu, toggleMenu }
 */
const useHamburger = () => {
  const [open, setOpen] = useState(false);

  const openMenu = useCallback(() => setOpen(true), []);
  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((prev) => !prev), []);

  return {
    open,
    openMenu,
    closeMenu,
    toggleMenu,
    setOpen,
  };
};

export default useHamburger;
