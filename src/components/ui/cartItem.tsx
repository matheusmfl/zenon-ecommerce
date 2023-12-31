import { CartContext, CartProduct } from "@/providers/cartProvider";
import Image from "next/image";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct
}

const CartItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProducts } = useContext(CartContext)

  function handleDecreaseProductQuantityClick() {
    decreaseProductQuantity(product.id)
  }

  function handleIncreaseProductQuantityClick() {
    increaseProductQuantity(product.id)
  }

  function handleRemoveProductFromCart() {
    removeProducts(product.id)
  }
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Image Div */}
        <div className="bg-accent flex items-center justify-center rounded-lg h-[77px] w-[77px]">
          <Image src={product.imageUrls[0]} alt={product.name} width={0} height={0} sizes="100vw"
            className="w-auto h-auto max-w-[80%] max-h-[70%]"
          />
        </div>

        <div className="flex flex-col ">
          <p className="text-xs">
            {product.name}
          </p>

          <div className="flex items-center gap-2">
            <p className="font-bold text-sm">
              R${product.totalPrice.toFixed(2)}
            </p>

            {product.discountPercentage > 0 && (
              <p className="opacity-75 line-through text-xs">R${Number(product.basePrice).toFixed(2)}</p>
            )}
          </div>

          {/* Quantity Buttons */}
          <div className="flex items-center gap-1 mt-4">
            <Button size={"icon"} variant={"outline"} className="h-8 w-8" onClick={handleDecreaseProductQuantityClick} >
              <ArrowLeftIcon size={12} />
            </Button>

            <span className="text-xs">{product.quantity}</span>

            <Button size={"icon"} variant={"outline"} className="h-8 w-8" onClick={handleIncreaseProductQuantityClick} >
              <ArrowRightIcon size={12} />
            </Button>
          </div>
        </div>
      </div>
      <Button size={"icon"} variant={"outline"} onClick={handleRemoveProductFromCart}>
        <TrashIcon size={16} className="hover:text-red-500" />
      </Button>

    </div>
  );
}

export default CartItem;