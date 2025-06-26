import style from './steps-list.module.css'
import type { StepsItemProps } from './steps-list.type'

const StepsItem = ({ item, onEdit, onDelete }: StepsItemProps) => {
  return (
    <tr className={style[`steps-list-table-body__tr`]}>
      <td className={style[`steps-list-table-body__td`]}>{item.date}</td>
      <td className={style[`steps-list-table-body__td`]}>
        {item.distance.toFixed(3)}
      </td>
      <td className={style[`steps-list-table-body__td`]}>
        <button
          className={`${style[`steps-list-button`]} ${style[`steps-list-edit`]} `}
          type="button"
          onClick={() => onEdit(item.date)}
        >
          ✎
        </button>
        <button
          className={`${style[`steps-list-button`]} ${style[`steps-list-delete`]} `}
          type="button"
          onClick={() => onDelete(item.date)}
        >
          ✘
        </button>
      </td>
    </tr>
  )
}
export default StepsItem
