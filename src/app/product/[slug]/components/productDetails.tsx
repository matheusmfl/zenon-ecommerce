'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductWithTotalPrice } from "@/helpers/product"

import { CartContext } from "@/providers/cartProvider"
import { Product } from "@prisma/client"
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react"
import { useContext, useState } from "react"

interface ProductDetailsProps {
  product: ProductWithTotalPrice

}
export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const { handleAddProductToCart } = useContext(CartContext)

  function handleDecreaseQuantity() {
    setQuantity((prev: number) => (prev === 1 ? prev : prev - 1))
  }
  function handlePlusQuantity() {
    setQuantity((prev: number) => (prev + 1))
  }

  function handleAddToCartClick() {
    handleAddProductToCart({ ...product, quantity })
  }

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{product.name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">R$ {Number(product.totalPrice).toFixed(2)}</h1>
        {product.discountPercentage > 0 && (
          <Badge className="px-2 py-[2px]">
            <ArrowDownIcon size={12} /> {product.discountPercentage}%
          </Badge>
        )}
      </div>
      {product.discountPercentage > 0 && (
        <p className="opacity-75 text-sm line-through">R$ {Number(product.basePrice.toString()).toFixed(2)}</p>
      )}

      {/* Quantity Buttons */}
      <div className="flex items-center gap-2 mt-4">
        <Button size={"icon"} variant={"outline"} onClick={handleDecreaseQuantity}>
          <ArrowLeftIcon size={16} />
        </Button>

        <span>{quantity}</span>

        <Button size={"icon"} variant={"outline"} onClick={handlePlusQuantity}>
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      {/* Description + Cta Div */}

      <div className="flex flex-col gap-3 mt-8">
        <h3 className="font-bold text-base">
          Descrição:
        </h3>

        <p className="opacity-60 text-justify text-sm">{product.description}</p>
      </div>

      <Button className="mt-8 uppercase font-bold" onClick={handleAddToCartClick}>
        Adicionar ao carrinho
      </Button>

      {/* Div Entrega */}

      <div className="bg-accent flex items-center px-5 py-2 justify-between mt-5 rounded-lg">
        <div className="items-center flex gap-2">
          <TruckIcon size={16} />
          <div className="flex flex-col">
            <p className="text-xs ">
              Entrega via <span className="font-semibold text-yellow-400">
                Correios
              </span>
            </p>

            <p className="text-[#8162FF] text-xs">
              Envio para <span className="font-semibold">
                todo o Brasil
              </span>
            </p>
          </div>
        </div>

        <p className="text-xs font-bold">Frete Grátis</p>

      </div>

    </div>
  )
}