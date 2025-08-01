"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/home", label: "TRANG CHỦ" },
  { href: "products/ruou-vang-do", label: "RƯỢU VANG ĐỎ" },
  { href: "/ruou-trang", label: "RƯỢU TRẮNG" },
  { href: "/champagne", label: "CHAMPAGNE" },
  { href: "/thong-tin", label: "THÔNG TIN" },
  { href: "/blog", label: "BLOG" },
  { href: "/lien-he", label: "LIÊN HỆ" },
];

const MainNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-black">
      <div className="w-full flex items-center justify-between px-72">
        {/* Logo */}
        <Link href="/home">
          <Image
            src="/Image_Rudu/logo2.jpg"
            alt="Wine House Logo"
            width={130}
            height={80}
            className="object-contain"
          />
        </Link>

        {/* Menu Items */}
        <div className="flex items-center justify-between space-x-10">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-xs font-medium tracking-wide transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-white"
              )}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
