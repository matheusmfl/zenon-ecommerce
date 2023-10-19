import Image from "next/image"
import { Categories } from "./components/categories"
import { prismaClient } from "@/lib/prisma"
import { ProductList } from "./components/productList"

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0
      }
    }
  })
  return (
    <>
      <div>
        <Image src="/banner-home-01.png" alt="Banner rotativo" height={0} width={0} className="px-5 h-auto w-full" sizes="100vw" />

        <div className="mt-8 px-5">
          <Categories />
        </div>

        <div className="mt-8">
          <ProductList products={deals} />
        </div>
      </div >
    </>
  )
}