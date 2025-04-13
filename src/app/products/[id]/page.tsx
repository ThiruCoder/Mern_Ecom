"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/cart/product-card";
import { FiStar, FiShoppingCart, FiArrowLeft, FiTruck, FiShield, FiPackage } from "react-icons/fi";
import axios from "axios";

interface ProductPageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

type Product = {
  _id: string;
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  discount?: number;
  rating: number;
  reviews: number;
  stock: number;
  featured: boolean;
  colors: string[];
  sizes?: string[];
  features: string[];
  images: string[];
  __v: number;
};

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const backendUrl = 'https://porfolio-backend-spbi.onrender.com';
  const backendTrilUrl = 'http://localhost:5000';

  const id = params.id;

  useEffect(() => {
    const getProductById = async () => {
      try {
        setLoading(true);
        const response = await axios.post<{ data: Product }>(`${backendTrilUrl}/products/getProductsById/${id}`);
        const productData = response.data.data;
        setProduct(productData);

        // Initialize selected options
        if (productData.colors?.length) {
          setSelectedColor(productData.colors[0]);
        }
        if (productData.sizes?.length) {
          setSelectedSize(productData.sizes[0]);
        }
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to load product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    getProductById();
  }, [id]);

  if (loading) {
    return <div className="container py-10 text-center">Loading product...</div>;
  }

  if (error || !product) {
    return notFound();
  }

  // Calculate related products if needed (you'll need to implement this)
  // const relatedProducts = getRelatedProducts(product);

  return (
    <div className="container py-10">
      <Link
        href="/products"
        className="inline-flex items-center text-sm font-medium mb-6 text-muted-foreground hover:text-foreground"
      >
        <FiArrowLeft className="mr-2 h-4 w-4" />
        Back to products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-md bg-muted relative">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.discount && (
              <Badge className="absolute top-4 right-4 bg-primary/90">
                Sale
              </Badge>
            )}
          </div>
          <div className="flex gap-4 overflow-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={`image-${product.id}-${index}`}
                className={`relative aspect-square w-20 rounded-md bg-muted overflow-hidden border-2 ${selectedImage === index ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={`star-${product.id}-${i}`}
                    className={`h-5 w-5 ${i < Math.floor(product.rating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                      }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {product.stock > 10 ? (
                  <span className="text-green-600">In Stock</span>
                ) : product.stock > 0 ? (
                  <span className="text-amber-600">Low Stock ({product.stock} left)</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {product.discount ? (
              <>
                <div className="text-3xl font-bold">${product.discount}</div>
                <div className="text-lg text-muted-foreground line-through">${product.price}</div>
                <Badge variant="outline" className="ml-2 text-green-600 border-green-600">
                  Save ${(product.price - (product.discount || 0)).toFixed(2)}
                </Badge>
              </>
            ) : (
              <div className="text-3xl font-bold">${product.price}</div>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <p className="text-muted-foreground">{product.description}</p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <div className="font-medium">Color: {selectedColor}</div>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border ${selectedColor === color
                        ? "ring-2 ring-primary ring-offset-2"
                        : "border-muted-foreground/30"
                        }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="font-medium">Size: {selectedSize}</div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1 border rounded-md ${selectedSize === size
                        ? "bg-primary text-primary-foreground"
                        : "border-muted-foreground/30"
                        }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div className="space-y-2">
              <div className="font-medium">Quantity</div>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <div className="w-12 text-center">{quantity}</div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-4">
              <Button className="w-full" size="lg">
                <FiShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Product Features */}
          <Separator />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {product.features.map((feature, index) => (
                <li key={`feature-${product.id}-${index}`} className="flex items-start">
                  <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Shipping & Returns */}
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center p-4">
              <FiTruck className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">On orders over $50</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <FiShield className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">2 Year Warranty</h3>
              <p className="text-sm text-muted-foreground">Full coverage</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <FiPackage className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">30 Day Returns</h3>
              <p className="text-sm text-muted-foreground">Money back guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products - Uncomment when you implement this */}
      {/* {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Related Products</h2>
            <Button variant="outline" asChild>
              <Link href={`/products?category=${product.category}`}>View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
              />
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}