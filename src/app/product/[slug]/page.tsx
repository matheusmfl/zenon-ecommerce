import { prismaClient } from "@/lib/prisma"

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

    </div>
  )
}