import { Badge } from "@/components/ui/badge"
import { ProductItem } from "@/components/ui/productItem"
import { CATEGORY_ICONS } from "@/constants/category-icon"
import { computeProductTotalPrice } from "@/helpers/product"
import { prismaClient } from "@/lib/prisma"
import { ShapesIcon } from "lucide-react"

export default async function CategoryById({ params }: any) {
  const products = await prismaClient.product.findMany({
    where: {
      category: {
        slug: params.slug
      }
    }
  })
  return (
    <div className="p-5 flex flex-col gap-8">
      <Badge className="gap-1 w-fit text-base uppercase border-primary border-2 py-[0.375rem] px-3" variant={"outline"}>
        {CATEGORY_ICONS[params.slug as keyof typeof CATEGORY_ICONS]}
        {params.slug}
      </Badge>

      <div className="grid grid-cols-2 gap-8">
        {products.map((product) => {
          return (
            <ProductItem key={product.id} product={computeProductTotalPrice(product)} />
          )
        })}
      </div>
    </div>
  )
}