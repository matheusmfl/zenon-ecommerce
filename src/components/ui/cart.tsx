import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cartProvider";
import CartItem from "./cartItem";
import { computeProductTotalPrice } from "@/helpers/product";

const Cart = () => {
  const { products } = useContext(CartContext)
  return (
    <div className="flex flex-col gap-8">
      <Badge className="gap-1 w-fit text-base uppercase border-primary border-2 py-[0.375rem] px-3" variant={"outline"}>
        <ShoppingCartIcon size={16} />
        Catálogo
      </Badge>

      {/* Render Products */}
      <div className="flex flex-col gap-5">
        {products.map((product) => {
          return (

            <CartItem key={product.id} product={computeProductTotalPrice(product as any) as any} />

          )
        })}
      </div>


    </div>
  );
}

export default Cart;