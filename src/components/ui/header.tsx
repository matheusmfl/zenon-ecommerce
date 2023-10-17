import { MenuIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

export function Header() {
  return (
    <header>
      <Card className="flex justify-between p-[1.875rem]" >

        <Button size={"icon"} variant={"outline"}>
          <MenuIcon />
        </Button>

        <h1 className="text-lg font-semibold ">
          <span className="text-primary">
            ZenonTech
          </span> Store <ShoppingCartIcon />
        </h1>

      </Card>

    </header>
  )
}