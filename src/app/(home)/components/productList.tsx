import { ProductItem } from "@/components/ui/productItem"
import { computeProductTotalPrice } from "@/helpers/product"
import { Product } from "@prisma/client"

interface ProductListProps {
  products: Product[]
}

export async function ProductList({ products }: ProductListProps) {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => {
        return (
          <ProductItem key={product.id} product={computeProductTotalPrice(product)} />


        )
      })}
    </div>
  )
}