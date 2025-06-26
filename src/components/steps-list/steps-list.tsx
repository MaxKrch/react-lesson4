import type { StepsListProps } from './steps-list.type'
import style from './steps-list.module.css'
import StepsItem from './steps-item'

const headerTitles = [`Дата (ДД.ММ.ГГ)`, `Пройдено км`, `Действия`]

const StepsList = ({ onEditItem, onDeleteItem, itemList }: StepsListProps) => {
  return (
    <table className={style[`steps-list-table`]}>
      <thead className={style[`steps-list-table-head`]}>
        <tr className={style[`steps-list-table-head__tr`]}>
          {headerTitles.map((item) => (
            <th key={item} className={style[`steps-list-table-head__th`]}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={style[`steps-list-table-body`]}>
        {itemList.map((item) => (
          <StepsItem
            key={item.date}
            item={item}
            onEdit={onEditItem}
            onDelete={onDeleteItem}
          />
        ))}
      </tbody>
    </table>
  )
}

export default StepsList
