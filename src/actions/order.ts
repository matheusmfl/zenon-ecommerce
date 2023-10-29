'use server'
import { prismaClient } from "@/lib/prisma";
import { CartProduct } from "@/providers/cartProvider";

export const createOrder = async (cartProduct: CartProduct[], userId: string) => {
  const order = await prismaClient.order.create({
    data: {
      userId,
      status: "WAITING_FOR_PAYMENT",
      orderProducts: {
        createMany: {
          data: cartProduct.map(product => ({
            basePrice: Number(product.basePrice),
            discountPercentage: Number(product.discountPercentage),
            productId: product.id,
            quantity: product.quantity
          }))
        }
      }
    }
  })

  return order
}