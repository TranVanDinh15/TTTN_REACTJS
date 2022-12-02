import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import ListMenuNavBar from "../ListMenuNavBar/ListMenuNavBar";
import styles from './NavBar.module.scss'
const cx = classNames.bind(styles)
function NavBar() {
    const isAction = useSelector(state => state.displayNavbar.isAction)
    return <div className={cx('wrapperNavBar', isAction ? 'actionNavBar' : '')}>
        <div className={cx('HeadingNavBar')}>
            <span>MENU</span>
        </div>
        <ListMenuNavBar />
    </div>
}
export default NavBar