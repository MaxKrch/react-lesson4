import { useRef, useState, type ChangeEvent } from 'react'
import styles from './color-converter.module.css'
import { hex2rgb } from '../../helpers'

const ColorConverter = () => {
  const [color, setColor] = useState<number[] | null>(null)
  const inputColor = useRef<HTMLInputElement | null>(null)

  const handleInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setColor(hex2rgb(target.value))
  }

  const handleFocusInputColor = () => {
    if (inputColor.current && inputColor.current.value === ``)
      inputColor.current.value = `#`
  }

  const handleBlurInputColor = () => {
    if (inputColor.current && inputColor.current.value === `#`)
      inputColor.current.value = ``
  }

  const rgbColor = color ? `rgb(${color.join(', ')})` : ``

  return (
    <div className={styles[`converter-container`]}>
      <div
        className={styles[`converter-body`]}
        style={{ backgroundColor: rgbColor }}
      >
        <input
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleInput(event)
          }
          onFocus={handleFocusInputColor}
          onBlur={handleBlurInputColor}
          className={`${styles['converter-block']} ${styles['converter-input']}`}
          ref={inputColor}
          placeholder="Привет!"
        />
        <div
          className={`${styles['converter-block']} ${styles['converter-message']}`}
        >
          {color ? rgbColor : `Ошибка!`}
        </div>
      </div>
    </div>
  )
}

export default ColorConverter
