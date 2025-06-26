type ReadResponse = {
    success: true,
    img: string,
} | {
    success: false,
    error: string
}

type ReadFileAsDataURL = (file: File) => Promise<ReadResponse>
type Files2DataURL = (files: File[]) => Promise<ReadResponse[]>

const readFileAsDataURL: ReadFileAsDataURL = (file) => {
    return new Promise((res, rej) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (typeof reader.result === "string") {
                res({
                    success: true,
                    img: reader.result
                });
            } else {
                rej({
                    success: false,
                    error: `Invalid result`
                });
            }
        };

        reader.onerror = () => {
            rej({
                success: false,
                error: `Failed to read file`
            });
        };

        reader.readAsDataURL(file);
    })
}


const filesToDataURL: Files2DataURL = async (files) => {
    return Promise.all(
        files.map(file => {
            return readFileAsDataURL(file)
                .then(res => res)
                .catch(err => err)
        })
    )
}



export default filesToDataURL;