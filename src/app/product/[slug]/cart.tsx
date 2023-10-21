'use client'

import { Product } from "@prisma/client";
import { ReactNode, createContext } from "react";

interface CartProduct extends Product {
  quantity: number;
}
interface ICartsContext {
  products: CartProduct[]
  cartTotalPrice: number
  cartBaseTotal: number
  cartTotalDiscount: number
}

const CartContext = createContext<ICartsContext>({
  products: [],
  cartBaseTotal: 0,
  cartTotalDiscount: 0,
  cartTotalPrice: 0
})

const CartProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CartContext.Provider value={
      {
        products: [],
        cartBaseTotal: 0,
        cartTotalDiscount: 0,
        cartTotalPrice: 0
      }
    }>
      {children}

    </CartContext.Provider >
  );
}

export default CartProvider;