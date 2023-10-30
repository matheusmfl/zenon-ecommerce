import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Prisma } from "@prisma/client"
import { format } from 'date-fns'
import { OrderProductItem } from "./OrderProductItem"
import { Separator } from "@/components/ui/separator"
import { useMemo } from "react"
import { computeProductTotalPrice } from "@/helpers/product"

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
  const subTotal = useMemo(() => {
    return order.orderProducts.reduce((acc, OrderProduct) => {
      return acc + Number(OrderProduct.product.basePrice) * OrderProduct.quantity
    }, 0)
  }, [order.orderProducts])

  const totalDiscounts = useMemo(() => {

    return order.orderProducts.reduce((acc, product) => {
      const productsWithTotalPrice = computeProductTotalPrice(product.product)
      return acc + productsWithTotalPrice.totalPrice * product.quantity
    }, 0)
  }, [order.orderProducts])

  const total = subTotal - totalDiscounts
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

              {/* Totais */}

              <div className="flex flex-col gap-1 w-full text-xs">
                <Separator />

                <div className="flex justify-between w-full py-[10px]">
                  <p className="">Subtotal:</p>
                  <p>R$ {subTotal.toFixed(2)}</p>
                </div>
                <Separator />

                <div className="flex justify-between w-full py-[10px]">
                  <p className="">Entrega:</p>
                  <p>GRÁTIS</p>
                </div>

                <Separator />

                <div className="flex justify-between w-full py-[10px]">
                  <p className="">Descontos:</p>
                  <p>-R$ {totalDiscounts.toFixed(2)}</p>
                </div>
                <Separator />

                <div className="flex justify-between w-full py-[10px] text-sm font-bold">
                  <p className="">Total:</p>
                  <p>R$ {total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>



      </Accordion>

    </Card>
  )
}