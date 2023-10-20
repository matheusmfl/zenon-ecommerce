import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { ShapesIcon } from "lucide-react";
import { CategoriesItem } from "./components/categoryItems";

export default async function Catalog() {
  const categories = await prismaClient.category.findMany()
  return (
    <div className="p-5 flex flex-col gap-8">
      <Badge className="gap-1 w-fit text-base uppercase border-primary border-2 py-[0.375rem] px-3" variant={"outline"}>
        <ShapesIcon size={16} />
        Catálogo
      </Badge>

      <div className="grid grid-cols-2 gap-8">
        {categories.map((category) => {
          return (
            <CategoriesItem key={category.id} category={category} />
          )
        })}
      </div>
    </div>
  )
}