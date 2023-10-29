'use client'
import { MenuIcon, ShoppingCartIcon, LogInIcon, PercentIcon, ListOrderedIcon, HomeIcon, LogOutIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarImage } from "./avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "./separator";
import Link from "next/link";
import Cart from "./cart";

export function Header() {
  const { status, data } = useSession()
  const handleLoginClick = async () => {
    await signIn()
  }

  async function handleLogoutClick() {
    await signOut()
  }
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
            {status === 'authenticated' && data?.user && (
              <div className="flex flex-col">
                <div className="py-4 flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>
                      {data.user.name?.[0].toUpperCase()}
                    </AvatarFallback>
                    {data.user.image && (
                      <AvatarImage src={data.user.image!} />
                    )}

                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-medium">{data.user.name}</p>
                    <p className="text-sm opacity-75">Boas compras!</p>
                  </div>

                </div>
                <Separator />
              </div>

            )}

            {/* Div buttons */}
            <div className="mt-4 flex flex-col gap-3">
              {/* button login */}
              {status === 'unauthenticated' && (<Button variant={"outline"} onClick={handleLoginClick} className="w-full justify-start gap-2">
                <LogInIcon size={16} />
                Fazer Login
              </Button>)}

              {/* Button logout */}
              {status === 'authenticated' && (
                <Button variant={"outline"} onClick={handleLogoutClick} className="w-full justify-start gap-2">
                  <LogOutIcon size={16} />
                  Fazer Logout
                </Button>
              )}


              {/* Button Home */}
              <SheetClose asChild>
                <Link href={"/"}>
                  <Button variant={"outline"} className="w-full justify-start gap-2">
                    <HomeIcon size={16} />
                    Início
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href={"/orders"}>
                  <Button variant={"outline"} className="w-full justify-start gap-2">
                    <ListOrderedIcon size={16} />
                    Meus Pedidos
                  </Button>
                </Link>
              </SheetClose>


              {/* Button Ofertas */}

              <SheetClose asChild>
                <Link href={'/deals'}>
                  <Button variant={"outline"} className="w-full justify-start gap-2">
                    <PercentIcon size={16} />
                    Ofertas
                  </Button>
                </Link>
              </SheetClose>

              {/* Button Catalogo */}

              <SheetClose asChild>
                <Link href={'/catalog'}>
                  <Button variant={"outline"} className="w-full justify-start gap-2">
                    <ListOrderedIcon size={16} />
                    Catálogo
                  </Button>
                </Link>
              </SheetClose>


            </div>





          </SheetContent>
        </Sheet>

        <Link href={'/'}>
          <h1 className="text-lg font-semibold ">
            <span className="text-primary">
              ZenonTech
            </span> Store
          </h1>
        </Link>


        {/* Cart Div */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"} variant={"outline"}>
              <ShoppingCartIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="w-[350px]">
            <Cart />
          </SheetContent>
        </Sheet>

      </Card>

    </header>
  )
}