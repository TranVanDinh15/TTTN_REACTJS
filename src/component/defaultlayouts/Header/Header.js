import classNames from "classnames/bind";
import BtnLogInOut from "./BtnLogInOut/BtnLoginOut";
import styles from './Header.module.scss'
import Logo from "./Logo/Logo";
import Search from "./Search/Search";
const cx = classNames.bind(styles)
function Header() {
    return <div className={cx('wrapperHeader')}>
        <div className={cx('wrapperHeader__Item')}>
            <Logo />
            <Search />
        </div>
        <BtnLogInOut />
    </div>
}
export default Header