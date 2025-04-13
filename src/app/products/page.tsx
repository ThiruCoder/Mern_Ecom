"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/cart/product-card";
import { categories } from "@/lib/data";
import { Suspense } from "react";
import { FiFilter, FiX, FiGrid, FiList, FiSearch, FiChevronDown } from "react-icons/fi";
import axios from "axios";

type Product = {
  _id: string;
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  discount: number;
  rating: number;
  reviews: number;
  stock: number;
  featured: boolean;
  colors: string[];
  features: string[];
  images: string[];
  __v: number;
};



export default function ProductsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPage />
    </Suspense>
  );
}

function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOption, setSortOption] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const [products, setProducts] = useState<Product[]>([])

  const backendUrl = 'https://porfolio-backend-spbi.onrender.com'
  const backendTrilUrl = 'http://localhost:5000'
  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        await axios.get<Product[]>(`${backendTrilUrl}/products/getProducts`)
          .then((response) => setProducts(response.data))
          .catch((error) => console.log(error))
      } catch (error) {
        console.error('Failed to fetch project details:', error);
      }
    };

    getProjectDetails();
  }, []);

  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    result = result.filter(
      product => {
        const price = product.discount || product.price;
        return price >= priceRange[0] && price <= priceRange[1];
      }
    );

    // Sort products
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => (a.discount || a.price) - (b.discount || b.price));
        break;
      case "price-desc":
        result.sort((a, b) => (b.discount || b.price) - (a.discount || a.price));
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, priceRange, sortOption, products]);

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Products</h1>
          <p className="text-muted-foreground">Browse our collection of high-quality products</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters - Mobile Toggle */}
          <div className="flex lg:hidden items-center justify-between mb-4">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? <FiX className="mr-2 h-4 w-4" /> : <FiFilter className="mr-2 h-4 w-4" />}
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("grid")}
              >
                <FiGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("list")}
              >
                <FiList className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filters - Sidebar */}
          <aside className={`w-full lg:w-60 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="space-y-4">
              <div className="font-medium flex items-center justify-between">
                Categories
              </div>
              <ul className="space-y-2">
                <li>
                  <Button
                    variant={selectedCategory === null ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start font-normal"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Products
                  </Button>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <Button
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start font-normal"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="font-medium">Price Range</div>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  min={0}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                  className="h-8"
                />
                <span>—</span>
                <Input
                  type="number"
                  placeholder="Max"
                  min={0}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 1000])}
                  className="h-8"
                />
              </div>
            </div>

            <Separator className="block lg:hidden" />
          </aside>

          {/* Product Grid */}
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} products
              </p>

              <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("grid")}
                  >
                    <FiGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("list")}
                  >
                    <FiList className="h-4 w-4" />
                  </Button>
                </div>

                <div className="relative">
                  <select
                    className="appearance-none h-8 rounded-md border bg-background px-3 py-1 text-sm pr-8"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {selectedCategory && (
                <Badge className="px-2 py-1">
                  {categories.find(c => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory(null)} className="ml-1">
                    <FiX className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {searchQuery && (
                <Badge className="px-2 py-1">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery("")} className="ml-1">
                    <FiX className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                <Badge className="px-2 py-1">
                  Price: ${priceRange[0]} — ${priceRange[1]}
                  <button onClick={() => setPriceRange([0, 1000])} className="ml-1">
                    <FiX className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>

            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                <Button onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery("");
                  setPriceRange([0, 1000]);
                }}>
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    className={viewMode === "list" ? "flex flex-row" : ""}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
