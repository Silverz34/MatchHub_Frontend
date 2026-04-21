"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Bell, User, LogOut } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const navLinks = [
    { name: "Inicio", path: "/inicio", icon: Home },
    { name: "Buscar", path: "/buscar", icon: Search },
    { name: "Solicitudes", path: "/solicitudes", icon: Bell },
    { name: "Perfil", path: "/perfil", icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0F0F11]/90 backdrop-blur-md border-b border-[#2A2A2D] px-6 py-4 flex items-center justify-between">
      
      <div className="font-bold text-xl tracking-wide flex items-center gap-2">
        <Image src="/mathub.png" alt="MatchHub" className="logo-img" width={40} height={40} />
      </div>
      
      <div className="flex gap-2 sm:gap-6 text-sm font-medium">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.path;

          return (
            <Link 
              key={link.path} 
              href={link.path} 
              className={`flex items-center gap-2 px-3 py-2 sm:px-4 rounded-full transition-all ${
                isActive 
                  ? "text-white bg-[#00C2FF]/20 border border-[#00C2FF]/50" 
                  : "text-gray-400 hover:text-white border border-transparent"
              }`}
            >
              <Icon size={16} className={isActive ? "text-[#00C2FF]" : ""} />
              <span className="hidden sm:inline">{link.name}</span>
            </Link>
          );
        })}
      </div>

      <SignOutButton>
        <button
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-800 rounded-lg transition-colors shrink-0 flex items-center gap-2 text-sm font-medium"
          title="Cerrar sesión"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </SignOutButton>
    </nav>
  );
}