"use client";

import * as React from "react";
import { useState } from "react";
import { PRODUCTS, CATEGORIES } from "@/data/mocks";
import { ProductCard } from "@/components/molecules/ProductCard";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { cn } from "@/utils/cn";

export const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = activeCategory === "all" 
    ? PRODUCTS.filter(p => p.isFeatured || p.isNew) // Mostramos destacados por defecto
    : PRODUCTS.filter(p => p.categoryId === activeCategory);

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <Heading className="mb-4">Nuestras Especialidades</Heading>
          <Paragraph variant="lead" className="max-w-2xl mx-auto">
            Descubre nuestra selección premium de cafés y repostería artesanal, 
            preparados con los mejores ingredientes y técnicas tradicionales.
          </Paragraph>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "px-8 py-2 rounded-full font-bold transition-all",
              activeCategory === "all"
                ? "bg-mustard-500 text-white shadow-lg"
                : "bg-coffee-50 text-coffee-700 hover:bg-coffee-100"
            )}
          >
            Todos
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-8 py-2 rounded-full font-bold transition-all",
                activeCategory === category.id
                  ? "bg-mustard-500 text-white shadow-lg"
                  : "bg-coffee-50 text-coffee-700 hover:bg-coffee-100"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="animate-fade-in">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
