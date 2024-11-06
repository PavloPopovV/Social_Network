import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {
    icon:any,
    count?:number,
    onClick:()=>void
    iconClass?:string
}

const MetaInfo = ({icon, count, iconClass, onClick} : Props) => {
  return (
    <div className="flex gap-[2px] cursor-pointer" onClick={onClick}>
      <FontAwesomeIcon icon={icon} className={`${iconClass}`}/>
      {count !== undefined && count > 0 && <span className="text-gray-500 text-[13px]">{count}</span>}
    </div>
  )
}

export default MetaInfo
