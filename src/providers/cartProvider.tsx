"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  handleAddProductToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  handleAddProductToCart: () => { },
  decreaseProductQuantity: () => { },
  increaseProductQuantity: () => { }
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([])

  function handleAddProductToCart(product: CartProduct) {
    const productIdAlreadyOnCart = products.some(cartProduct => cartProduct.id === cartProduct.id)

    if (productIdAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity
            }
          }
          return cartProduct
        })
      )
      return
    }
    setProducts((prev) => [...prev, product]);

  }


  function decreaseProductQuantity(productId: string) {
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1
          }
        }

        return cartProduct
      }).filter((cartProduct) => cartProduct.quantity > 0)
    )
  }

  function increaseProductQuantity(productId: string) {
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1
          }
        }

        return cartProduct
      })
    )
  }
  return (
    <CartContext.Provider
      value={{
        products,
        handleAddProductToCart,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
        decreaseProductQuantity,
        increaseProductQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;