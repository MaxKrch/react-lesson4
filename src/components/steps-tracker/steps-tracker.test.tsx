import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import StepsTracker from './steps-tracker'

describe('Component: StepsTracker (integration test)', () => {
  const dateInputLabelText = /дата/i
  const distanceInputLabelText = /пройдено км/i
  const sumbmitButtonName = /ок/i
  const testItem = {
    date: '2025-06-26',
    distance: 5.123,
  }

  const handleEdit = vi.fn()
  const handleDelete = vi.fn()

  beforeEach(() => {
    handleEdit.mockClear()
    handleDelete.mockClear()
  })

  it('should adds and renders new item', async () => {
    render(<StepsTracker />)

    const dateInput = screen.getByLabelText(dateInputLabelText)
    const distanceInput = screen.getByLabelText(distanceInputLabelText)
    const submitBtn = screen.getByRole('button', { name: sumbmitButtonName })

    await userEvent.type(dateInput, testItem.date)
    await userEvent.type(distanceInput, `${testItem.distance}`)
    await userEvent.click(submitBtn)

    expect(screen.getByText(testItem.date)).toBeInTheDocument()
    expect(screen.getByText(testItem.distance)).toBeInTheDocument()
  })

  it('should allows editing an item', async () => {
    const date = '2025-06-26'
    const firstDistance = `3`
    const secontDistance = `2.5`
    const expectedDistance = `32.500`

    render(<StepsTracker />)
    const dateInput = screen.getByLabelText(dateInputLabelText)
    const distanceInput = screen.getByLabelText(distanceInputLabelText)
    const submitBtn = screen.getByRole('button', { name: sumbmitButtonName })

    await userEvent.type(dateInput, date)
    await userEvent.type(distanceInput, firstDistance)
    await userEvent.click(submitBtn)

    await waitFor(() => expect(distanceInput).toHaveValue(null))

    const editBtn = screen.getByRole('button', { name: '✎' })
    await userEvent.click(editBtn)
    await userEvent.type(distanceInput, secontDistance)
    await userEvent.click(submitBtn)

    expect(screen.getByText(expectedDistance)).toBeInTheDocument()
  })

  it('should add distance, when date alreade exist', async () => {
    const date = '2025-06-26'
    const firstDistance = `3`
    const secontDistance = `2.5`
    const expectedDistance = `5.500`

    render(<StepsTracker />)
    const dateInput = screen.getByLabelText(dateInputLabelText)
    const distanceInput = screen.getByLabelText(distanceInputLabelText)
    const submitBtn = screen.getByRole('button', { name: sumbmitButtonName })

    await userEvent.type(dateInput, date)
    await userEvent.type(distanceInput, firstDistance)
    await userEvent.click(submitBtn)

    await waitFor(() => expect(distanceInput).toHaveValue(null))

    await userEvent.type(dateInput, date)
    await userEvent.type(distanceInput, secontDistance)
    await userEvent.click(submitBtn)

    expect(screen.getByText(expectedDistance)).toBeInTheDocument()
  })
})
