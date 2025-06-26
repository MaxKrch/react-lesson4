import { z } from 'zod'
import type { StepsFormProps } from './steps-form.type'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './steps-form.module.css'
import { useEffect } from 'react'

const StepsForm = ({ onAddItem, editingItem }: StepsFormProps) => {
  const schema = z.object({
    date: z.string().nonempty(),
    distance: z.number().nonnegative(),
  })

  type StepsFormData = z.infer<typeof schema>

  const { register, handleSubmit, getValues, reset } = useForm<StepsFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: editingItem?.date,
      distance: editingItem?.distance,
    },
  })

  useEffect(() => {
    if (editingItem) {
      reset({
        date: editingItem.date,
        distance: editingItem.distance,
      })
    } else {
      reset({})
    }
  }, [editingItem, reset])

  const onSubmit = () => {
    onAddItem({
      date: getValues(`date`),
      distance: getValues(`distance`),
    })

    reset({})
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles[`steps-form`]}>
      <label className={styles[`steps-form__label`]} htmlFor="date">
        <span className={styles[`steps-form__label-span`]}>
          {`Дата (ДД/MM/ГГ)`}
        </span>
        <input
          {...register(`date`)}
          className={`${styles[`steps-form__button`]} ${styles[`steps-form__input`]}`}
          type="date"
          id="date"
        />
      </label>
      <label className={styles[`steps-form__label`]} htmlFor="distance">
        <span className={styles[`steps-form__label-span`]}>
          {`Пройдено км`}
        </span>
        <input
          {...register(`distance`, { valueAsNumber: true })}
          type="number"
          step="0.001"
          id="distance"
          className={`${styles[`steps-form__button`]} ${styles[`steps-form__input`]}`}
        />
      </label>
      <button
        className={`${styles[`steps-form__button`]} ${styles[`steps-form__submit`]}`}
        type="submit"
      >
        {`Ок`}
      </button>
    </form>
  )
}

export default StepsForm
