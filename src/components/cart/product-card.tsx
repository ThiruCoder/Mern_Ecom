"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import type { Product } from "@/lib/data";
import { FiStar, FiShoppingCart } from "react-icons/fi";
import axios from "axios";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

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


export function ProductCard({
  product,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([])

  const backendUrl = 'https://mern-ecom-backend-q7di.onrender.com'
  const backendTrilUrl = 'http://localhost:5000'


  const CreateAddCart = async (data: Product) => {
    try {
      console.log('data', data);

      await axios.post(`${backendUrl}/products/createAddCart`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log('Addcart', response.data.data);
      }).catch((error) => {
        console.log(error);
      });
    }
    catch (error) {
      console.error('Failed to fetch project details:', error);
    }
  }

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

  return (
    <>

      <Card
        className={cn("overflow-hidden group h-full transition-colors hover:border-primary", className)}
        {...props}
      >
        <Link href={`/products/${product._id}`}>
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-t-md bg-muted">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={width || 400}
                height={height || 400}
                className={cn(
                  "object-cover transition-all group-hover:scale-105",
                  isLoading ? "blur-sm" : "blur-0"
                )}
                onLoad={() => setIsLoading(false)}
              />
            </div>
            {product.discount && (
              <Badge className="absolute top-3 right-3 bg-primary/90">
                Sale
              </Badge>
            )}
          </div>
        </Link>
        <CardContent className="grid gap-2 p-4">
          <div className="flex items-center justify-between">
            <div className="line-clamp-1 font-medium">{product.name}</div>
            <div className="flex items-center gap-0.5">
              <FiStar className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm text-muted-foreground">{product.rating}</span>
            </div>
          </div>
          <div className="line-clamp-2 text-sm text-muted-foreground">{product.description}</div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div>
            {product.discount ? (
              <div className="flex items-center gap-2">
                <span className="font-medium">${product.discount}</span>
                <span className="text-sm text-muted-foreground line-through">${product.price}</span>
              </div>
            ) : (
              <span className="font-medium">${product.price}</span>
            )}
          </div>
          <Button onClick={() => CreateAddCart(product)} variant="outline" size="sm" className="h-8 rounded-md">
            <FiShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
        </CardFooter>
      </Card >


    </>
  );
}
