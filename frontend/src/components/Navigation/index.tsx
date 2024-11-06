import { Link} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComments, faHouse } from "@fortawesome/free-solid-svg-icons"
import { PATHS } from '../../constantes/paths'

type CurrentUserProps = {
    profilePic: string | undefined;
    firstName: string | undefined;
    id: string | undefined;

}

const Navigation = ({firstName, profilePic, id} : CurrentUserProps) => {

    return (
        <nav>
            <ul className='flex gap-6 items-center'>
                <li>
                    <Link to={PATHS.DIRECT} className='relative'> 
                        <FontAwesomeIcon icon={faComments} className='h-[34px] w-[34px] text-blue-600'/>
                    </Link>
                </li>
                <li>
                    <Link to={PATHS.POSTS}> 
                        <FontAwesomeIcon icon={faHouse} className='h-[30px] w-[30px] text-blue-600'/>
                    </Link>
                </li>
                <li>
                    <Link to={PATHS.PROFILE(id)}>
                        <img src={profilePic} alt={`${firstName} avatar`} className="h-[40px] w-[40px] rounded-lg" />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation
