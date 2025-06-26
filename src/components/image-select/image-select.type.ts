import type { ChangeEvent } from "react"

type ImageSelectProps = {
    onSelectFiles: ({target}: ChangeEvent<HTMLInputElement>) => void
}

export type {
    ImageSelectProps
}