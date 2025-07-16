import React from "react";

type LayoutProps = {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
};

const mainLayout: React.FC<LayoutProps> = ({ header, footer, children }) => {
  return (
    <div className="font-inter text-gray-800">
      <div className="sticky top-0 z-50">{header}</div>
      <main className="max-w-screen-xl mx-auto px-4 min-h-screen overflow-x-hidden">
        {children}
      </main>
      {footer}
    </div>
  );
};

export default mainLayout;
