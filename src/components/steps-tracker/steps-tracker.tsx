import { useMemo, useState } from 'react'
import StepsForm from '../steps-form'
import StepsList from '../steps-list'
import type { StepsItem } from '../../types'
import styles from './steps-tracker.module.css'

const StepsTracker = () => {
  const [editingItem, setEditingItem] = useState<StepsItem | null>(null)
  const [itemList, setItemList] = useState<StepsItem[]>([])

  const filtredSteps = useMemo(() => {
    return [...itemList].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  }, [itemList])

  const handleAddItem = (newItem: StepsItem) => {
    if (editingItem) setEditingItem(null)

    setItemList((prevItems) => {
      const clonedItemList = [...prevItems]
      const targetItemIndex = clonedItemList.findIndex(
        (item) => item.date === newItem.date
      )

      if (targetItemIndex > -1) {
        const updatedItem = {
          ...clonedItemList[targetItemIndex],
          distance: clonedItemList[targetItemIndex].distance + newItem.distance,
        }
        clonedItemList[targetItemIndex] = updatedItem
      } else {
        clonedItemList.push(newItem)
      }

      return clonedItemList
    })
  }

  const handleEditItem = (date: StepsItem[`date`]) => {
    setItemList((prev) => {
      const targetItem = prev.find((item) => item.date === date)
      let clonedItemList = [...prev]
      if (targetItem) {
        if (editingItem) clonedItemList.push(editingItem)
        setEditingItem(targetItem)
      }

      return clonedItemList.filter((item) => item.date !== date)
    })
  }

  const handleDeleteItem = (date: StepsItem[`date`]) => {
    setItemList((prev) => {
      return prev.filter((item) => item.date !== date)
    })
  }

  return (
    <div className={styles['steps-tracker-container']}>
      <StepsForm editingItem={editingItem} onAddItem={handleAddItem} />
      <StepsList
        itemList={filtredSteps}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  )
}

export default StepsTracker
