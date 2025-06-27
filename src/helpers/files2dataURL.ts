type FileAsDataURLResponse =
  | {
      success: true
      img: string
    }
  | {
      success: false
      error: string
    }

type ReadFileAsDataURL = (file: File) => Promise<FileAsDataURLResponse>
type FilesToDataURL = (files: File[]) => Promise<FileAsDataURLResponse[]>

const readFileAsDataURL: ReadFileAsDataURL = (file) => {
  return new Promise((res, rej) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        res({
          success: true,
          img: reader.result,
        })
      } else {
        rej({
          success: false,
          error: `Invalid result`,
        })
      }
    }

    reader.onerror = () => {
      rej({
        success: false,
        error: `Failed to read file`,
      })
    }

    reader.readAsDataURL(file)
  })
}

const filesToDataURL: FilesToDataURL = async (files) => {
  return Promise.all(
    files.map((file) => {
      return readFileAsDataURL(file)
        .then((res) => res)
        .catch((err) => err)
    })
  )
}

export default filesToDataURL
export type { FileAsDataURLResponse }
