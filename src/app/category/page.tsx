"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/lib/data";
import { Button } from "@/components/ui/button";

type CategoryCardProps = {
  category: {
    id: string;
    name: string;
    description: string;
    image: string; // 👈 update this from imageUrl to image
  };
  width?: number;
  height?: number;
  className?: string;
};

export default function CategoryCard({
  category,
  width = 300,
  height = 200,
  className,
  ...props
}: CategoryCardProps) {
  const [isLoading, setIsLoading] = useState(true);


  return (
    <Card
      className={cn("overflow-hidden h-full group", className)}
      {...props}
    >
      {category && (
        <Link href={`/products?category=${category.id}`}>
          <div className="relative">
            <Image
              src={category.image}
              alt={category.name}
              width={width || 800}
              height={height || 450}
              className={cn(
                "object-cover w-full h-full transition-all group-hover:scale-105",
                isLoading ? "blur-sm" : "blur-0"
              )}
              onLoad={() => setIsLoading(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-lg sm:text-xl font-bold mb-2">{category.name}</h3>
              <p className="text-sm line-clamp-2 mb-4 text-white/80">{category.description}</p>
              <Button size="sm" variant="outline" className="bg-white/20 text-white border-white/40 hover:bg-white/30">
                Shop Now
              </Button>
            </CardContent>
          </div>
        </Link>
      )}
    </Card>
  );
}

