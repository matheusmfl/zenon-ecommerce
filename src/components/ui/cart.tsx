import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cartProvider";

const Cart = () => {
  const { products } = useContext(CartContext)
  return (
    <div>
      <Badge className="gap-1 w-fit text-base uppercase border-primary border-2 py-[0.375rem] px-3" variant={"outline"}>
        <ShoppingCartIcon size={16} />
        Catálogo
      </Badge>

      {/* Render Products */}
      {products.map((product) => {
        return (
          <h1 key={product.id}>
            {product.name}
          </h1>
        )
      })}


    </div>
  );
}

export default Cart;