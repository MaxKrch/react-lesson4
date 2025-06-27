import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ImageManager from './image-manager'

vi.mock('../../helpers', async () => {
  return {
    files2dataURL: vi.fn((files: File[]) => {
      return Promise.resolve(
        files.map((file) => ({
          success: true,
          img: `data:image/png;base64,${file.name}`,
        }))
      )
    }),
  }
})

describe('ImageManager', () => {
  const inputButtonText = /click to select files/i
  const removeButtonsLabelTet = /удалить изображение/i

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should renders without images by default', () => {
    render(<ImageManager />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('should adds images when valid image files are selected', async () => {
    render(<ImageManager />)

    const input = screen.getByLabelText(inputButtonText) as HTMLInputElement

    const file1 = new File(['content1'], 'image1.png', { type: 'image/png' })
    const file2 = new File(['content2'], 'image2.jpg', { type: 'image/jpeg' })

    await userEvent.upload(input, [file1, file2])

    await waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(2)
    })
  })

  it('should ignores non-image files', async () => {
    render(<ImageManager />)

    const input = screen.getByLabelText(inputButtonText) as HTMLInputElement

    const image = new File(['img'], 'photo.png', { type: 'image/png' })
    const text = new File(['text'], 'doc.txt', { type: 'text/plain' })

    await userEvent.upload(input, [image, text])

    await waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(1)
    })
  })

  it('removes an image when delete button is clicked', async () => {
    render(<ImageManager />)

    const input = screen.getByLabelText(inputButtonText) as HTMLInputElement

    const file = new File(['img'], 'to-remove.png', { type: 'image/png' })
    await userEvent.upload(input, [file])

    await waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(1)
    })

    const removeBtn = screen.getByLabelText(removeButtonsLabelTet)
    await userEvent.click(removeBtn)

    await waitFor(() => {
      expect(screen.queryByRole(`img`)).not.toBeInTheDocument()
    })
  })
})
