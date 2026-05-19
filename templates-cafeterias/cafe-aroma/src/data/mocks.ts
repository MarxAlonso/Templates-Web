import { Product, Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "hot-coffee",
    name: "Cafés Calientes",
    description: "La tradición en cada taza, servida a la temperatura perfecta.",
    icon: "coffee",
    productCount: 8
  },
  {
    id: "cold-coffee",
    name: "Bebidas Frías",
    description: "Refrescantes y llenas de energía para cualquier momento del día.",
    icon: "snowflake",
    productCount: 6
  },
  {
    id: "pastries",
    name: "Repostería",
    description: "El acompañamiento ideal: horneado diariamente con amor.",
    icon: "cake",
    productCount: 5
  },
  {
    id: "specialties",
    name: "Especialidades",
    description: "Creaciones únicas de nuestros baristas expertos.",
    icon: "star",
    productCount: 4
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Espresso Intenso",
    description: "Un shot puro de energía con notas de chocolate negro y nueces.",
    price: 2.50,
    categoryId: "hot-coffee",
    image: "/images/products/espresso.jpg",
    tags: ["Intenso", "Clásico"],
    isFeatured: true,
    rating: 4.8
  },
  {
    id: "2",
    name: "Cappuccino Italiano",
    description: "Equilibrio perfecto entre espresso, leche vaporizada y espuma aterciopelada.",
    price: 3.80,
    categoryId: "hot-coffee",
    image: "/images/products/cappuccino.jpg",
    tags: ["Cremoso", "Popular"],
    isFeatured: true,
    rating: 4.9
  },
  {
    id: "3",
    name: "Latte Art Vainilla",
    description: "Suave leche con un toque de vainilla de Madagascar y arte en la espuma.",
    price: 4.20,
    categoryId: "hot-coffee",
    image: "/images/products/latte.jpg",
    tags: ["Dulce", "Suave"],
    isNew: true,
    rating: 4.7
  },
  {
    id: "4",
    name: "Cold Brew Original",
    description: "Café infusionado en frío durante 18 horas para una baja acidez.",
    price: 4.50,
    categoryId: "cold-coffee",
    image: "/images/products/cold-brew.jpg",
    tags: ["Refrescante", "Sin Azúcar"],
    isFeatured: true,
    rating: 4.6
  },
  {
    id: "5",
    name: "Iced Caramel Macchiato",
    description: "Capas de leche, vainilla, espresso y un generoso remolino de caramelo.",
    price: 4.90,
    categoryId: "cold-coffee",
    image: "/images/products/iced-macchiato.jpg",
    tags: ["Dulce", "Frío"],
    rating: 4.5
  },
  {
    id: "6",
    name: "Croissant de Mantequilla",
    description: "Hojaldre francés crujiente por fuera y tierno por dentro.",
    price: 2.20,
    categoryId: "pastries",
    image: "/images/products/croissant.jpg",
    tags: ["Clásico", "Recién Horneado"],
    isFeatured: true,
    rating: 4.9
  },
  {
    id: "7",
    name: "Cheesecake de Matcha",
    description: "Delicado pastel de queso con té verde japonés de grado ceremonial.",
    price: 5.50,
    categoryId: "pastries",
    image: "/images/products/matcha-cake.jpg",
    tags: ["Exótico", "Premium"],
    isNew: true,
    rating: 4.8
  },
  {
    id: "8",
    name: "Flat White",
    description: "Doble shot de espresso con una fina capa de microespuma.",
    price: 3.90,
    categoryId: "hot-coffee",
    image: "/images/products/flat-white.jpg",
    tags: ["Fuerte", "Equilibrado"],
    rating: 4.7
  }
];
