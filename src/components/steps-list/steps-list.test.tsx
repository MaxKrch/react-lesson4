import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StepsList from './steps-list'
import { vi } from 'vitest'

describe('Components: StepsList & StepsItem', () => {
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

  it('should renders correctly header and list items', () => {
    render(
      <StepsList
        itemList={[testItem]}
        onEditItem={handleEdit}
        onDeleteItem={handleDelete}
      />
    )

    expect(screen.getByText('Дата (ДД.ММ.ГГ)')).toBeInTheDocument()
    expect(screen.getByText('Пройдено км')).toBeInTheDocument()
    expect(screen.getByText('Действия')).toBeInTheDocument()
    expect(screen.getByText(testItem.date)).toBeInTheDocument()
    expect(screen.getByText(testItem.distance)).toBeInTheDocument()
  })

  it('should calls edit and delete handlers', async () => {
    render(
      <StepsList
        itemList={[testItem]}
        onEditItem={handleEdit}
        onDeleteItem={handleDelete}
      />
    )

    const editBtn = screen.getByRole('button', { name: '✎' })
    const deleteBtn = screen.getByRole('button', { name: '✘' })

    await userEvent.click(editBtn)
    await userEvent.click(deleteBtn)

    expect(handleEdit).toHaveBeenCalledWith(testItem.date)
    expect(handleDelete).toHaveBeenCalledWith(testItem.date)
  })
})
