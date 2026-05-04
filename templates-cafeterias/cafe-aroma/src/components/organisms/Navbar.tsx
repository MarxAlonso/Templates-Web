"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/atoms/Logo";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Menú", href: "/#menu" },
    { name: "Nosotros", href: "/about" },
    { name: "Contacto", href: "/#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "font-body font-medium transition-colors hover:text-mustard-500",
                isScrolled ? "text-coffee-700" : "text-coffee-900"
              )}
            >
              {link.name}
            </a>
          ))}
          <Button variant="primary" size="sm">
            Reservar Mesa
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-coffee-900 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 md:hidden overflow-hidden",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col p-6 gap-4 border-t border-coffee-100">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-body font-medium text-coffee-700 hover:text-mustard-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button variant="primary" className="w-full">
            Reservar Mesa
          </Button>
        </div>
      </div>
    </nav>
  );
};
