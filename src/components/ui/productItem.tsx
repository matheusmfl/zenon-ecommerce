import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import { Badge } from "./badge";
import { ArrowDownIcon } from "lucide-react";

interface ProductItemProps {
  product: ProductWithTotalPrice
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* img div */}
      <div className="relative bg-accent rounded-[10px] h-[170px] flex items-center justify-center ">
        <Image src={product.imageUrls[0]} alt="Img generic" width={0} height={0} sizes={"100vw"}
          className="h-auto w-auto object-contain max-w-[80%] max-h-[70%]" />

        {/* Div Flutuante */}
        {product.discountPercentage > 0 && (
          <Badge className="absolute left-3 top-3 px-2 py-[2px]">
            <ArrowDownIcon size={12} /> {product.discountPercentage}%
          </Badge>
        )}
      </div>
      {/* text div */}
      <div className="flex flex-col gap-1">
        <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis w-full">
          {product.name}
        </p>
        <div className="flex items-center gap-2 ">

          {product.discountPercentage > 0 && (

            <>
              <p className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis w-full">
                {product.totalPrice.toFixed(2)}
              </p>

              <p className="opacity-75 line-through text-xs overflow-hidden whitespace-nowrap text-ellipsis w-full">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            </>
          )}

          {product.discountPercentage === 0 && (
            <p className="font-semibold text-sm">
              {product.totalPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>



    </div>
  )

}