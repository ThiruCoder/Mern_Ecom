"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/cart/product-card";
import { categories, getFeaturedProducts } from "@/lib/data";
import CategoryCard from "./category/page";
import { useEffect, useState } from "react";
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

type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
};

type HeadCategory = {
  data: Category[]
}

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const backendUrl = 'https://mern-ecom-backend-q7di.onrender.com'
  const backendTrilUrl = 'http://localhost:5000'
  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        await axios.get<Product[]>(`${backendUrl}/products/getProducts`)
          .then((response) => setProducts(response.data))
          .catch((error) => console.log(error))
      } catch (error) {
        console.error('Failed to fetch project details:', error);
      }
    };

    getProjectDetails();
  }, []);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        await axios.get<HeadCategory>(`${backendUrl}/products/getCategories`)
          .then((response) => setCategories(response.data.data))
          .catch((error) => console.log(error))
      } catch (error) {
        console.error('Failed to fetch project details:', error);
      }
    };

    getCategoryDetails();
  }, []);


  // getCategories
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="relative h-[70vh] max-h-[700px] w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
            alt="Hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-10 container">
            <div className="max-w-xl space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                Quality Products for Every Lifestyle
              </h1>
              <p className="text-lg sm:text-xl text-white/80">
                Shop our curated collection of premium products at affordable prices.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link href="/products">Shop Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30" asChild>
                  <Link href="/categories">Browse Categories</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Browse Categories
            </h2>
            <p className="text-muted-foreground">
              Find products from our popular categories
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/categories">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}


        </div>
      </section>

      {/* Featured Products */}
      <section className="container space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Shop our most popular items
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/products">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section className="bg-muted py-12 md:py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Special Offers
              </h2>
              <p className="text-muted-foreground">
                Enjoy exclusive discounts on selected products. Limited time only!
              </p>
              <Button asChild>
                <Link href="/products">Shop Deals</Link>
              </Button>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1607082352121-fa243f3dde32?q=80&w=2070&auto=format&fit=crop"
                alt="Special Offers"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-2 text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M8 5h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"></path>
                <path d="M10 2v3"></path><path d="M14 2v3"></path><circle cx="12" cy="10" r="1"></circle>
                <path d="M12 14v4"></path>
              </svg>
            </div>
            <h3 className="font-medium">Fast Shipping</h3>
            <p className="text-sm text-muted-foreground">Free shipping on orders over $50</p>
          </div>

          <div className="space-y-2 text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </div>
            <h3 className="font-medium">Secure Payments</h3>
            <p className="text-sm text-muted-foreground">Safe & encrypted checkout</p>
          </div>

          <div className="space-y-2 text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M18 6H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"></path>
                <path d="M3 13v1a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1"></path>
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <path d="M10 14v5"></path><path d="M14 14v5"></path>
              </svg>
            </div>
            <h3 className="font-medium">Easy Returns</h3>
            <p className="text-sm text-muted-foreground">30-day money back guarantee</p>
          </div>

          <div className="space-y-2 text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
              </svg>
            </div>
            <h3 className="font-medium">24/7 Support</h3>
            <p className="text-sm text-muted-foreground">Customer service available 24/7</p>
          </div>
        </div>
      </section>
    </div>
  );
}
