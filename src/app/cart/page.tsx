"use client";

import { useEffect, useReducer, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

// Define Action types
export type CartAction =
    | { type: "INCREASE"; payload: string }  // payload = item ID
    | { type: "DECREASE"; payload: string }
    | { type: "DELETE"; payload: string }
    | { type: "RESET" };

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
    quantity: number;
    totalPrice: number;
};


export default function CartPage() {
    const [addCartProducts, setAddCartProducts] = useState<Product[]>([])
    const [currentQuantity, setCurrentQuentity] = useState(addCartProducts[0]?.quantity || 0)

    const backendUrl = 'https://mern-ecom-backend-q7di.onrender.com'
    const backendTrilUrl = 'http://localhost:5000'

    const updateQuantity = (id: string, quantity: number, totalPrice: number) => {
        const updateQuantity = async () => {
            try {
                await axios.put<{ data: Product[] }>(`${backendUrl}/products/updateAddCartById/${id}`, { quantity, totalPrice })
                    .then((response) => console.log(response.data.data))
                    .catch((error) => console.log(error))
            } catch (error) {
                console.error('Failed to fetch project details:', error);
            }
        };

        updateQuantity();
    };

    const removeItem = (id: string) => {
        // setCartItems(items => items.filter(item => item.id !== id));
    };


    useEffect(() => {
        const getProjectDetails = async () => {
            try {
                await axios.get<{ data: Product[] }>(`${backendUrl}/products/getAddCarts`)
                    .then((response) => setAddCartProducts(response.data.data))
                    .catch((error) => console.log(error))
            } catch (error) {
                console.error('Failed to fetch project details:', error);
            }
        };

        getProjectDetails();
    }, []);
    console.log('products', addCartProducts);


    const quantity = addCartProducts.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = addCartProducts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const initialState: CartItem[] = [
        { id: "1", name: "Product A", price: 10, quantity: 2 },
        { id: "2", name: "Product B", price: 20, quantity: 1 },
    ];
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card className="p-6">
                        {addCartProducts.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-lg text-gray-600">Your cart is empty</p>
                                <Button className="mt-4">Continue Shopping</Button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {addCartProducts.map((item) => (
                                    <div key={item.id}>
                                        <div className="flex gap-4">
                                            <img
                                                src={item?.images[0]}
                                                alt={item.name}
                                                className="w-24 h-24 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <h3 className="font-semibold">{item.name}</h3>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeItem(item._id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <p className="text-lg font-bold mt-1">
                                                    ${item.price.toFixed(2)}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        disabled={item.quantity <= 1}
                                                        onClick={() => updateQuantity(item._id, -1, -item.price)}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="w-8 text-center">{currentQuantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => updateQuantity(item._id, 1, item.price)}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <Separator className="mt-4" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span>Quantity</span>
                                <span>{quantity}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <Button className="w-full mt-4" size="lg">
                                Proceed to Checkout
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
    switch (action.type) {
        case "INCREASE":
            return state.map((item) =>
                item.id === action.payload
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

        case "DECREASE":
            return state.map((item) =>
                item.id === action.payload
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) } // Prevent <1
                    : item
            );

        case "DELETE":
            return state.filter((item) => item.id !== action.payload);

        case "RESET":
            return [];

        default:
            // TypeScript will catch invalid action types
            const _exhaustiveCheck: never = action;
            return _exhaustiveCheck;
    }
};