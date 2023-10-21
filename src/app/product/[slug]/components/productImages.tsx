'use client'
import Image from "next/image"
import { useState } from "react";

interface ProductImagesProps {
  name: string;
  imageUrls: string[]
}

export function ProductImages({ imageUrls, name }: ProductImagesProps) {
  const [currentImage, setCurrentImage] = useState(imageUrls[0])
  function handleImageClick(imageUrl: string) {
    setCurrentImage(imageUrl)
  }
  return (
    <div className="flex-col">
      {/* Img Div */}
      <div className="bg-accent h-[380px] w-full flex items-center justify-center">
        <Image src={currentImage} alt={name} height={0} width={0} sizes={"100vw"}
          className="h-auto max-h-[70%] w-auto object-contain max-w-[80%]" />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-4 mt-8 px-5 ">
        {imageUrls.map((image) => {
          return (
            <button key={image}
              className={`bg-accent rounded-lg flex justify-center items-center cursor-pointer h-[100px]
            ${image === currentImage && "border-2 border-solid border-primary"}`}
              onClick={() => handleImageClick(image)}>
              <Image src={image} alt={name} height={0} width={0} sizes={"100vw"}
                className="h-auto max-h-[70%] w-auto object-contain max-w-[80%]" />
            </button>
          )
        })}
      </div>
    </div>

  )
}