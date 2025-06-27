import { useState, type ChangeEvent } from 'react'
import style from './image-manager.module.css'
import ImageSelect from '../image-select'
import ImageList from '../image-list/image-list'
import { files2dataURL, type FileAsDataURLResponse } from '../../helpers'

type LoadedImage = {
  id: string
  img: string
}

const formatLoadedImages = (
  responses: FileAsDataURLResponse[]
): LoadedImage[] => {
  const successfulResponses = responses.filter(
    (response): response is { success: true; img: string } => response.success
  )

  const formattedImages = successfulResponses.map((response) => {
    return {
      id: crypto.randomUUID(),
      img: response.img,
    }
  })

  return formattedImages
}

const ImageManager = () => {
  const [loadedImages, setLoadedImages] = useState<LoadedImage[]>([])

  const handleSelectFiles = async ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    if (!target?.files) return

    const loadedFileURLs = await files2dataURL(
      [...target.files].filter((file) => file.type.startsWith('image/'))
    )

    setLoadedImages((prev) => {
      return [...prev, ...formatLoadedImages(loadedFileURLs)]
    })
  }

  const handleRemoveFile = (id: string) => {
    setLoadedImages((prev) => prev.filter((image) => image.id !== id))
  }

  return (
    <div className={style[`image-manager-container`]}>
      <ImageSelect onSelectFiles={handleSelectFiles} />
      <ImageList list={loadedImages} onDeleteImage={handleRemoveFile} />
    </div>
  )
}

export default ImageManager
