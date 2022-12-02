import classNames from "classnames/bind";
import Home from "../Page/Home/Home";
import styles from './defaultLayouts.module.scss'
const cx = classNames.bind(styles)
function DefaultLayouts() {
    return <div className={cx('wrapper')}>
        <Home />
    </div>
}
export default DefaultLayouts