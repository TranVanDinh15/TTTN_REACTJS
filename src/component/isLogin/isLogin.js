import classNames from "classnames/bind";
import { useNavigate } from "react-router";
import styles from './isLogin.module.scss'
const cx = classNames.bind(styles)
function IsLogin({ setIsLogin }) {
    const navigate = useNavigate()
    return <div className={cx('wrapperIsLogin')}>
        <div className={cx('wrapperIsLogin__Box')}>
            <div className={cx('wrapperIsLogin__Box__Nof')}>
                <span>Đến Trang Đăng Nhập</span>
            </div>
            <div className={cx('wrapperIsLogin__Box__btn')}>
                <button
                    onClick={() => {
                        navigate('/Login')
                    }}
                >Đăng Nhập</button>
            </div>
        </div>
    </div>
}
export default IsLogin