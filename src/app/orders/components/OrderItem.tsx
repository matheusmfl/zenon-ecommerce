import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Prisma } from "@prisma/client"
import { format } from 'date-fns'
import { OrderProductItem } from "./OrderProductItem"

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  }>
}

export function OrderItem({ order }: OrderItemProps) {
  return (
    <Card className="px-5">
      <Accordion type="single" className="w-full" collapsible >
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              Pedido com {order.orderProducts.length} produto(s)
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col font-bold ">
                  <span>Status: </span>
                  <span className="text-[#8162FF]">
                    {order.status}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-semibold">Data:</span>
                  <span className="opacity-60">{format(order.createdAt, "d/MM/y")}</span>
                </div>

                <div className="flex flex-col">
                  <span className="font-semibold">Pagamento:</span>
                  <span className="opacity-60">Cartão</span>
                </div>
              </div>

              {order.orderProducts.map((orderProduct) => {
                return (
                  <OrderProductItem orderProduct={orderProduct} key={orderProduct.id} />
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>



      </Accordion>

    </Card>
  )
}