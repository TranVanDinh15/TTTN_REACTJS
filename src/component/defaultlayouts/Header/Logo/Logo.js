import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from './Logo.module.scss'
const cx = classNames.bind(styles)
function Logo() {
    return <div className={cx('wrapperLogo')}>
        <span>
            <FontAwesomeIcon icon={faUtensils} />
        </span>
        <span>Barbecue</span>
        <div className={cx('imageLogo')}>
            {/* <img src="https://www.clipartmax.com/png/full/13-131835_waiter-download-clip-art-service-restaurant-clipart.png" /> */}
        </div>
    </div>
}
export default Logo