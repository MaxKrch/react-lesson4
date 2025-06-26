import type { StepsItem } from '../../types'

type StepsFormProps = {
  editingItem: StepsItem | null
  onAddItem: (newItem: StepsItem) => void
}

export type { StepsFormProps }
