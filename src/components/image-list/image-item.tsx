import type { ImageItemProps } from './image-list.type'
import style from './image-item.module.css'

const ImageItem = ({ image, onDeleteImage }: ImageItemProps) => {
  return (
    <li className={style['image-item']}>
      <div className={style['image-item__img-container']}>
        <img
          className={style['image-item__img']}
          src={image.img}
          alt={`My Image ${image.id}`}
        />
      </div>
      <div className={style['image-item__button-container']}>
        <button
          className={style['image-item__button']}
          aria-label="Удалить изображение"
          onClick={() => onDeleteImage(image.id)}
        >
          ✗
        </button>
      </div>
    </li>
  )
}

export default ImageItem
