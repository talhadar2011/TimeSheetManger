import "../CSS/Sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faUser,faBusinessTime } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
    return (
        <div className='Sidebar'>
            <div className="Sidebar_item">
                <div className="Sidebar_icon">
                    <h3>
                    <FontAwesomeIcon icon={faHouse} />
                    </h3>
                    
                </div>
                <div className="Sidebar_icon">
                    <h3>
                    <FontAwesomeIcon icon={faUser} />

                    </h3>
                    <ul>
                        <li>Profile</li>
                    </ul>
                </div>
                <div className="Sidebar_icon">
                    <h3>
                    <FontAwesomeIcon icon={faBusinessTime} />

                    </h3>
                    <ul>
                        <li>TimeSheets</li>
                        <li>Scdular</li>

                    </ul>
                </div>
            </div>
        </div>
    )
}
