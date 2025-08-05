"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star } from "lucide-react"
import type { Product } from "@/types/product.types"
import styles from "./product-card.module.css"
import { useAddToCart } from "@/hooks/useAddToCart"

interface ProductCardGridProps {
    product: Product
    badge?: string
    badgeColor?: string
}

export default function ProductCardGrid({
    product,
    badge,
    badgeColor = "bg-yellow-500",
}: ProductCardGridProps) {
    const addToCart = useAddToCart()

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart(product)
    }

    return (
        <Card className="group overflow-hidden">
            <div className="relative">
                <Link href={`/products/${product.id}`} className="block">
                    <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-52 object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                </Link>
                {badge && <Badge className={`absolute top-2 right-2 ${badgeColor} text-black`}>{badge}</Badge>}
                {product.discount && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">-{product.discount}%</Badge>
                )}
                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="rounded-full w-8 h-8">
                        <Heart className="w-4 h-4" />
                    </Button>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex-col items-center hidden group-hover:flex">
                    <Button
                        className="bg-black hover:bg-gray-800 text-white w-full rounded-none py-2 text-sm"
                        onClick={() => addToCart(product)}
                    >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Thêm vào giỏ
                    </Button>
                </div>
            </div>
            <CardContent className="p-4">
                <div className="mb-1 flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <span
                            key={i}
                            className={`text-xs ${i < product.rating ? "text-yellow-500" : "text-gray-300"}`}
                        >
                            ★
                        </span>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                </div>
                <Link href={`/products/${product.id}`}>
                    <h3 className="font-medium text-sm mb-1 line-clamp-2 hover:text-yellow-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-yellow-600">{product.price}</span>
                    <span className="text-xs">đ</span>
                    {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">{product.originalPrice}đ</span>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
