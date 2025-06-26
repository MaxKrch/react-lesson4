import type { StepsItem } from '../../types'

type StepsListProps = {
  itemList: StepsItem[]
  onEditItem: (date: StepsItem[`date`]) => void
  onDeleteItem: (date: StepsItem[`date`]) => void
}

type StepsItemProps = {
  item: StepsItem
  onEdit: (date: StepsItem[`date`]) => void
  onDelete: (date: StepsItem[`date`]) => void
}

export type { StepsListProps, StepsItemProps }
