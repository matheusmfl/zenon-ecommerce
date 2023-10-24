import { Badge } from "@/components/ui/badge";
import { ProductItem } from "@/components/ui/productItem";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import { PercentIcon } from "lucide-react";

const DealsPage = async () => {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0
      }
    }
  })
  return (
    <div className="p-5 flex flex-col gap-5">
      <Badge className="gap-1 w-fit text-base uppercase border-primary border-2 py-[0.375rem] px-3" variant={"outline"}>
        <PercentIcon size={16} />
        Ofertas
      </Badge>

      <div className="grid grid-cols-2 gap-8">
        {deals.map((product) => {
          return (
            <ProductItem key={product.id} product={computeProductTotalPrice(product)} />
          )
        })}
      </div>

    </div>
  );
}

export default DealsPage;