import * as React from "react";
import Image from "next/image";
import { Star, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-coffee-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <Badge variant="mustard">Nuevo</Badge>
          )}
          {product.isFeatured && (
            <Badge variant="default">Destacado</Badge>
          )}
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button variant="primary" size="sm" className="rounded-xl shadow-lg">
            <ShoppingBag size={18} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading font-bold text-xl text-coffee-900 group-hover:text-mustard-500 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 text-mustard-500">
            <Star size={14} fill="currentColor" />
            <span className="text-sm font-bold">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-coffee-600 text-sm line-clamp-2 mb-4 h-10">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-heading font-bold text-coffee-900">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex gap-1">
            {product.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-coffee-400">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
