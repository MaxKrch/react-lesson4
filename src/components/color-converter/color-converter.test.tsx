import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import ColorConverter from './color-converter'

describe('Component: ColorConverter', () => {
  it("should display 'Ошибка!', when input have empty value", () => {
    render(<ColorConverter />)
    expect(screen.getByText(/Ошибка!/i)).toBeInTheDocument()
  })

  it('should display correct rgb with valid hex', async () => {
    render(<ColorConverter />)
    const input = screen.getByPlaceholderText(/привет!/i)

    await userEvent.clear(input)
    await userEvent.type(input, '#00FF00')

    await waitFor(() =>
      expect(screen.getByText('rgb(0, 255, 0)')).toBeInTheDocument()
    )
  })

  it('should not display correct rgb with invalid hex', async () => {
    const expectedColor = 'rgb(0, 255, 0)'
    render(<ColorConverter />)
    const input = screen.getByPlaceholderText(/привет!/i)

    await userEvent.clear(input)
    await userEvent.type(input, '#00FF00')
    await waitFor(() =>
      expect(screen.getByText(expectedColor)).toBeInTheDocument()
    )

    await userEvent.clear(input)
    await userEvent.type(input, '00FF00')

    await waitFor(() => {
      expect(screen.queryByText(expectedColor)).not.toBeInTheDocument()
      expect(screen.getByText(/ошибка!/i)).toBeInTheDocument()
    })
  })

  it("should add '#' by focus on empty input", async () => {
    render(<ColorConverter />)
    const input = screen.getByPlaceholderText(/привет!/i) as HTMLInputElement

    await userEvent.click(input)
    waitFor(() => expect(input.value).toBe('#'))
  })

  it("should clear '#' by blur from empty input", async () => {
    render(<ColorConverter />)
    const input = screen.getByPlaceholderText(/привет!/i) as HTMLInputElement

    await userEvent.click(input)
    waitFor(() => expect(input.value).not.toBe('#'))
  })
})
