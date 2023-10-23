import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cartProvider";
import CartItem from "./cartItem";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";

const Cart = () => {
  const { products, total, totalDiscount, subTotal } = useContext(CartContext)
  return (
    <div className="flex flex-col gap-8">
      <Badge className="gap-1 w-fit text-base uppercase border-primary border-2 py-[0.375rem] px-3" variant={"outline"}>
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      {/* Render Products */}
      <div className="flex flex-col gap-5">
        {products.length > 0 ? (products.map((product) => {
          return (

            <CartItem key={product.id} product={computeProductTotalPrice(product as any) as any} />

          )
        })) : (
          <p className="text-center font-semibold">Você ainda não adicionou um produto ao carrinho</p>
        )}
      </div>

      {/* Div prices */}
      <div className="flex flex-col gap-3">

        <Separator />
        {/* Div total */}
        <div className="flex items-center justify-between text-xs">
          <p>Preço sem desconto:</p>
          <p>R$ {total.toFixed(2)}</p>
        </div>
        <Separator />

        {/* Div frete */}
        <div className="flex items-center justify-between text-xs">
          <p>Entrega:</p>
          <p>Grátis</p>
        </div>
        <Separator />
        {/* Div desconto */}
        <div className="flex items-center justify-between text-xs">
          <p>Descontos:</p>
          <p>- R$ {totalDiscount.toFixed(2)}</p>
        </div>

        <Separator />
        {/* Div subtotal */}
        <div className="flex items-center justify-between text-sm font-medium">
          <p>Total:</p>
          <p>R$ {subTotal.toFixed(2)}</p>
        </div>
      </div>


    </div>
  );
}

export default Cart;