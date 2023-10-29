import { Badge } from "@/components/ui/badge"
import { authOptions } from "@/lib/auth"
import { prismaClient } from "@/lib/prisma"
import { PackageSearchIcon } from "lucide-react"
import { getServerSession } from "next-auth"
import { OrderItem } from "./components/OrderItem"

export default async function OrderPage() {
  const user = getServerSession(authOptions)


  if (!user) {
    return (
      <h1>Fazer login favor</h1>
    )
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id
    },
    include: {
      orderProducts: true
    }
  })
  return (
    <div>
      <div className="p-5">
        <Badge className="gap-1 w-fit text-base uppercase border-primary border-2 py-[0.375rem] px-3" variant={"outline"}>
          <PackageSearchIcon size={16} />
          Meus pedidos
        </Badge>

        <div className="flex flex-col gap-5">
          {orders.map((order) => {
            return (
              <OrderItem order={order} key={order.id} />
            )
          })}
        </div>


      </div>

    </div>
  )
}