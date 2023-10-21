import { Badge } from "@/components/ui/badge"
import { CATEGORY_ICONS } from "@/constants/category-icon"
import { Category } from "@prisma/client"

interface CategorieItemProps {
  category: Category
}

export function CategorieItem({ category }: CategorieItemProps) {

  return (
    <Badge variant={"outline"} className="py-3 flex justify-center items-center gap-[7px] rounded-[10px]">
      {CATEGORY_ICONS[category.slug as keyof typeof CATEGORY_ICONS]}
      <span className="font-semibold text-xs">
        {category.name}
      </span>
    </Badge>
  )
}