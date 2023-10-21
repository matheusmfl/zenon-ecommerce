import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

interface CategoryItemsProps {
  category: Category
}

export function CategoriesItem({ category }: CategoryItemsProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="flex flex-col">
        {/* img Div */}
        <div className="w-full h-[150px] flex items-center justify-center
       bg-item-gradients">
          <Image src={category.imageUrl} alt={category.name} width={0} height={0} sizes={"100vw"}
            className="h-auto w-auto object-contain max-w-[80%] max-h-[70%]" />

        </div>

        {/* Text Div */}
        <div className="bg-accent py-3 rounded-br-lg rounded-bl-lg">
          <p className="text-sm font-semibold text-center">
            {category.name}
          </p>
        </div>
      </div>
    </Link>
  )
}