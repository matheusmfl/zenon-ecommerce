'use client'

import { useSession } from "next-auth/react"
import Image from "next/image"

export default function Home() {
  const { data } = useSession()
  return (
    <>
      <div className="p-5">
        <Image src="/banner-home-01.png" alt="Banner rotativo" height={0} width={0} className="h-auto w-full" sizes="100vw" />
      </div>
    </>
  )
}
