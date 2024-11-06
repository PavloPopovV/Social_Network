import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
type Props = {
 type: 'button' | "submit";
 text: string;
 className?:string;
 iconClass?:string;
 onClick?: ()=> void;
 icon?:any;
}

const PrimaryButton = ({ type, text, className, icon, iconClass, onClick }:Props) => {
  return (
    <button type={type} onClick={onClick} className={`${className} py-3 rounded-xl cursor-pointer relative leading-5`}>
      {text}
      {icon && <FontAwesomeIcon icon={icon} className={`${iconClass} absolute`} />}
    </button>
  )
}

export default PrimaryButton
