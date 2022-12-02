import classNames from "classnames/bind";
import styles from './Global.module.scss'
const cx = classNames.bind(styles)
function Global({ children }) {
    return <div className={cx('wrapperGlobal')}>
        {children}
    </div>
}
export default Global