"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  total: number;
  subTotal: number;
  totalDiscount: number;
  cartTotalDiscount: number;
  handleAddProductToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProducts: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  total: 0,
  subTotal: 0,
  totalDiscount: 0,
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,

  handleAddProductToCart: () => { },
  decreaseProductQuantity: () => { },
  increaseProductQuantity: () => { },
  removeProducts: () => { }
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>(
    JSON.parse(localStorage.getItem('@zenon-store/cart-products') || "[]")
  )

  useEffect(() => {
    localStorage.setItem('@zenon-store/cart-products', JSON.stringify(products))
  }, [products])

  const subTotal = useMemo(() => {
    return products.reduce((acc, product) => {

      return acc + Number(product.totalPrice) * product.quantity
    }, 0)
  }, [products])

  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.basePrice) * product.quantity
    }, 0)
  }, [products])

  const totalDiscount = total - subTotal

  function handleAddProductToCart(product: CartProduct) {
    // se o produto já estiver no carrinho, apenas aumente a sua quantidade
    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }

          return cartProduct;
        }),
      );

      return;
    }
    setProducts((prev) => [...prev, product]);
    console.log(product)
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

  function removeProducts(productId: string) {
    setProducts(prev =>
      prev.filter((cartProduct) => cartProduct.id !== productId))
  }

  return (
    <CartContext.Provider
      value={{
        products,
        total,
        subTotal,
        totalDiscount,
        removeProducts,
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