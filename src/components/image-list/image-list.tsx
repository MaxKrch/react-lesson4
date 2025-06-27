import ImageItem from './image-item'
import style from './image-list.module.css'
import type { ImageListProps } from './image-list.type'

const ImageList = ({ list, onDeleteImage }: ImageListProps) => {
  return (
    <ul className={style['image-list']}>
      {list.map((image) => (
        <ImageItem key={image.id} image={image} onDeleteImage={onDeleteImage} />
      ))}
    </ul>
  )
}

export default ImageList
