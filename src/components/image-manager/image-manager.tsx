import { useState, type ChangeEvent } from 'react';
import style from './image-manager.module.css'
import ImageSelect from '../image-select';
import ImageList from '../image-list/image-list';
import { files2dataURL } from '../../helpers';

const ImageManager = () => {
    const [loadedImages, setLoadedImages] = useState<{
        id: string,
        img: string
    }[]>([])

    const handleSelectFiles = async ({target}: ChangeEvent<HTMLInputElement>) => {
        if(!target.files) return;
        const loadedFileURLs = await files2dataURL([...target.files])
        
        const formatedFileURLs = loadedFileURLs.reduce((loadedFiles, currentFile) => {
            if(currentFile.success) {
                loadedFiles.push({
                    id: crypto.randomUUID(),
                    img: currentFile.img
                })
            }
            return loadedFiles;
        }, [] as {
            id: string,
            img: string
        }[]);

        setLoadedImages(prev => {
            return [...prev, ...formatedFileURLs]
        })
    }

    const handleRemoveFile = (id: string) => {
        setLoadedImages(prev => prev.filter(image => image.id !== id))
    }

    return(
        <div className={style[`image-manager-container`]}>
            <ImageSelect onSelectFiles={handleSelectFiles} />
            <ImageList list={loadedImages} onDeleteImage={handleRemoveFile} />
        </div>
    )
}

export default ImageManager;