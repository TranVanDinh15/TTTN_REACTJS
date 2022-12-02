import classNames from "classnames/bind";
import styles from './Content.module.scss'
import NavBar from "./NavBar/NavBar";
const cx = classNames.bind(styles)
function Content({ children }) {
    return <div className={cx('wrapperContent')}>
        <NavBar />
        <div className={cx('Page')}>
            {children}
        </div>
    </div>
}
export default Content