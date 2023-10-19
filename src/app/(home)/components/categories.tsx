import { prismaClient } from "@/lib/prisma"
import { CategorieItem } from "./categorieItem"

export async function Categories() {
  const categories = await prismaClient.category.findMany()


  return (
    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
      {categories.map((category) => {
        return (
          <CategorieItem key={category.id} category={category} />
        )
      })}
    </div>
  )
}