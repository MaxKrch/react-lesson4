type ImageItem = {
  id: string
  img: string
}

type ImageItemProps = {
  image: ImageItem
  onDeleteImage: (id: string) => void
}

type ImageListProps = {
  list: ImageItem[]
  onDeleteImage: (od: string) => void
}

export type { ImageItemProps, ImageListProps }
