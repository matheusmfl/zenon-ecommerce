import { prismaClient } from "@/lib/prisma"
import { ProductImages } from "./components/productImages"
import { ProductDetails } from "./components/productDetails"
import { computeProductTotalPrice } from "@/helpers/product"
import { ProductList } from "@/app/(home)/components/productList"

interface ProductsDetailsPageProps {
  params: {
    slug: string
  }
}

export default async function ProductDetailsPage({ params }: ProductsDetailsPageProps) {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: params.slug
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: params.slug
              }
            }
          }
        }
      }
    }
  })

  if (!product) {
    return null
  }

  return (
    <div className="flex flex-col gap-8">
      <ProductImages imageUrls={product.imageUrls} name={product.name} />
      <ProductDetails product={computeProductTotalPrice(product)} />
      <ProductList products={product.category.products} />
    </div>
  )
}