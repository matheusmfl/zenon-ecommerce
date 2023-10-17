import { MenuIcon, ShoppingCartIcon, LogInIcon, PercentIcon, ListOrderedIcon, HomeIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";

export function Header() {
  return (
    <header>
      <Card className="flex justify-between p-[1.875rem]" >
        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"} variant={"outline"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent side={"left"}>
            <SheetHeader className="text-left text-lg font-semibold">
              Menu
            </SheetHeader>
            {/* Div buttons */}
            <div className="mt-2 flex flex-col gap-3">
              {/* button login */}
              <Button variant={"outline"} className="w-full justify-start gap-2">
                <LogInIcon size={16} />
                Fazer Login
              </Button>

              {/* Button Home */}
              <Button variant={"outline"} className="w-full justify-start gap-2">
                <HomeIcon size={16} />
                Início
              </Button>
              {/* Button Ofertas */}

              <Button variant={"outline"} className="w-full justify-start gap-2">
                <PercentIcon size={16} />
                Ofertas
              </Button>
              {/* Button Catalogo */}
              <Button variant={"outline"} className="w-full justify-start gap-2">
                <ListOrderedIcon size={16} />
                Catálogo
              </Button>
            </div>





          </SheetContent>
        </Sheet>

        <h1 className="text-lg font-semibold ">
          <span className="text-primary">
            ZenonTech
          </span> Store
        </h1>

        <Button size={"icon"} variant={"outline"}>
          <ShoppingCartIcon />
        </Button>

      </Card>

    </header>
  )
}