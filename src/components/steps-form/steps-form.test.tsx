import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import StepsForm from './steps-form'

describe('Component: StepsForm', () => {
  const inputDateLabelText = /дата/i
  const inputDistanceLabelText = /пройдено км/i
  const sumbmitButtonName = /ок/i

  const testItem = {
    date: '2025-06-26',
    distance: 5.123,
  }
  const handleAdd = vi.fn()

  beforeEach(() => {
    handleAdd.mockClear()
  })

  it('should render with correctly editingItem', () => {
    render(<StepsForm editingItem={testItem} onAddItem={handleAdd} />)

    const dateInput = screen.getByLabelText(inputDateLabelText)
    const distanceInput = screen.getByLabelText(inputDistanceLabelText)

    expect(dateInput).toHaveDisplayValue(testItem.date)
    expect(distanceInput).toHaveDisplayValue(`${testItem.distance}`)
  })

  it('should submits valid data', async () => {
    render(<StepsForm editingItem={null} onAddItem={handleAdd} />)

    const dateInput = screen.getByLabelText(inputDateLabelText)
    const distanceInput = screen.getByLabelText(inputDistanceLabelText)
    const submitBtn = screen.getByRole('button', { name: sumbmitButtonName })

    await userEvent.type(dateInput, testItem.date)
    await userEvent.type(distanceInput, `${testItem.distance}`)
    await userEvent.click(submitBtn)

    expect(handleAdd).toHaveBeenCalledWith(testItem)
  })

  it('should resets form on submit', async () => {
    render(<StepsForm editingItem={null} onAddItem={() => {}} />)
    const dateInput = screen.getByLabelText(inputDateLabelText)
    const distanceInput = screen.getByLabelText(inputDistanceLabelText)
    const submitBtn = screen.getByRole('button', { name: sumbmitButtonName })

    await userEvent.type(dateInput, testItem.date)
    await userEvent.type(distanceInput, `${testItem.distance}`)
    await userEvent.click(submitBtn)

    expect(dateInput).toHaveValue('')
    expect(distanceInput).toHaveValue(null)
  })
})
