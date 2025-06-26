import styles from './image-select.module.css'
import type { ImageSelectProps } from './image-select.type';

const ImageSelect = ({onSelectFiles}: ImageSelectProps) => {
    return(
        <form className={styles["image-select-form"]}>
            <label htmlFor="selectFiles" className={styles["image-select-body"]}>
                <div className={styles["image-select-description"]}>
                    {`Click to select files`}
                </div>
                <input
                    onChange={onSelectFiles} 
                    className={styles["image-select-input"]} 
                    type="file" 
                    id="selectFiles" 
                    multiple 
                />
            </label>
        </form>
    )
}

export default ImageSelect;