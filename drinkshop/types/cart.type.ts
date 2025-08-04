import { Product } from "@/types/product.types";
interface CartItem {
  productId: string;
  product: Product | null;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}
