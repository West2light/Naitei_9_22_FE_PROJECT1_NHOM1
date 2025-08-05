"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star } from "lucide-react"
import type { Product } from "@/lib/api"
import { useAddToCart } from "@/hooks/useAddToCart"
import styles from "./ProductCard.module.css"

interface ProductCardListProps {
    product: Product
    badge?: string
    badgeColor?: string
}

export default function ProductCardList({
    product,
    badge,
    badgeColor = "bg-yellow-500",
}: ProductCardListProps) {
    const addToCart = useAddToCart()

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart(product)
    }

    return (
        <Card className="group overflow-hidden">
            <div className="flex flex-col md:flex-row">
                <div className="relative md:w-1/3">
                    <Link href={`/products/${product.id}`} className="block">
                        <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="w-full h-52 object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                    </Link>
                    {badge && (
                        <Badge className={`absolute top-2 right-2 ${badgeColor} text-black`}>
                            {badge}
                        </Badge>
                    )}
                    {product.discount && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                            -{product.discount}%
                        </Badge>
                    )}
                </div>
                <CardContent className="p-4 md:w-2/3 flex flex-col justify-between">
                    <div>
                        <div className="mb-1 flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <span
                                    key={i}
                                    className={`text-xs ${i < product.rating ? "text-yellow-500" : "text-gray-300"
                                        }`}
                                >
                                    ★
                                </span>
                            ))}
                            <span className="text-xs text-gray-500 ml-1">
                                ({product.reviews})
                            </span>
                        </div>
                        <Link href={`/products/${product.id}`}>
                            <h3 className="font-medium text-base mb-2 hover:text-yellow-600 transition-colors">
                                {product.name}
                            </h3>
                        </Link>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                            {product.description}
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-yellow-600">{product.price}</span>
                            <span className="text-xs">đ</span>
                            {product.originalPrice && (
                                <span className="text-xs text-gray-500 line-through">
                                    {product.originalPrice}đ
                                </span>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                className="bg-black hover:bg-gray-800 text-white text-sm"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Thêm vào giỏ
                            </Button>
                            <Button
                                size="icon"
                                variant="outline"
                                className="rounded-md w-10 h-10"
                            >
                                <Heart className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}
