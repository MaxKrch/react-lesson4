import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ImageSelect from './image-select'
import userEvent from '@testing-library/user-event'

describe('Component: ImageSelect', () => {
  const inputText = /click to select files/i
  const mockHhandlerSelect = vi.fn()

  beforeEach(() => {
    mockHhandlerSelect.mockClear()
  })

  it('should render component correctly', () => {
    render(<ImageSelect onSelectFiles={mockHhandlerSelect} />)

    const input = screen.getByLabelText(inputText)
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'file')
    expect(input).toHaveAttribute('multiple')
  })

  it('calls onSelectFiles when files are selected (single file)', async () => {
    render(<ImageSelect onSelectFiles={mockHhandlerSelect} />)

    const input = screen.getByLabelText(inputText) as HTMLInputElement

    const file = new File(['data'], 'test.png', { type: 'image/png' })

    await userEvent.upload(input, file)

    expect(mockHhandlerSelect).toHaveBeenCalledTimes(1)
    expect(mockHhandlerSelect.mock.calls[0][0].target.files[0]).toEqual(file)
  })

  it('calls onSelectFiles with multiple files', async () => {
    const mockHandler = vi.fn()
    render(<ImageSelect onSelectFiles={mockHandler} />)

    const input = screen.getByLabelText(
      /click to select files/i
    ) as HTMLInputElement
    const files = [
      new File(['file1'], 'one.png', { type: 'image/png' }),
      new File(['file2'], 'two.jpg', { type: 'image/jpeg' }),
    ]

    await userEvent.upload(input, files)

    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(mockHandler.mock.calls[0][0].target.files).toHaveLength(2)
  })
})
