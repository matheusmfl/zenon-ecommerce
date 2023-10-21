import { prismaClient } from "@/lib/prisma"
import { ProductImages } from "./components/productImages"

interface ProductsDetailsPageProps {
  params: {
    slug: string
  }
}

export default async function ProductDetailsPage({ params }: ProductsDetailsPageProps) {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: params.slug
    }
  })

  if (!product) {
    return null
  }

  return (
    <div>
      <ProductImages imageUrls={product.imageUrls} name={product.name} />

    </div>
  )
}