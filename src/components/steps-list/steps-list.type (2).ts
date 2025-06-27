import type { Step } from '../../types'

type StepsListProps = {
  steps: [string, number][]
  onEditStep: (date: Step[`date`]) => void
  onDeleteStep: (date: Step[`date`]) => void
}

type StepsItemProps = {
  step: [string, number][]
  formatedDate: string
  onEdit: (date: Step[`date`]) => void
  onDelete: (date: Step[`date`]) => void
}

export type { StepsListProps, StepsItemProps }
