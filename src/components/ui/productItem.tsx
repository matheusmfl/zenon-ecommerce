import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductItemProps {
  product: Product
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="flex flex-col gap-4 w-[156px]">
      {/* img div */}
      <div className="bg-accent rounded-[10px] h-[170px]  flex items-center justify-center ">
        <Image src={product.imageUrls[0]} alt="Img generic" width={0} height={0} sizes={"100vw"}
          className="h-auto w-auto object-contain max-w-[80%] max-h-[70%]" />
      </div>
      {/* text div */}
      <div>
        <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis w-full">{product.name}</p>
      </div>
    </div>
  )

}