import "../CSS/Sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faUser,faBusinessTime } from '@fortawesome/free-solid-svg-icons';
import { Link } from "@tanstack/react-router";

export default function Sidebar() {
    return (
        <div className='Sidebar'>
            <div className="Sidebar_item">
                <div className="Sidebar_icon">
                    <h3>
                        <Link to={"/"}>
                            <FontAwesomeIcon icon={faHouse} />
                        </Link>
                    </h3>
                    
                </div>
                <div className="Sidebar_icon">
                    <h3>
                    <FontAwesomeIcon icon={faUser} />

                    </h3>
                    <ul>
                        <Link to={"/profile"}>    
                            <li>Profile</li>
                        </Link>
                    </ul>
                </div>
                <div className="Sidebar_icon">
                    <h3>
                    <FontAwesomeIcon icon={faBusinessTime} />

                    </h3>
                    <ul>
                        <Link to={"/TimeSheet"}>
                            <li>TimeSheets</li>
                        </Link>
                        <li>Scdular</li>

                    </ul>
                </div>
            </div>
        </div>
    )
}
