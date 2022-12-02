import { faCircleInfo, faRightFromBracket, faScrewdriverWrench, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from './BtnLogInOut.module.scss'
import Button from '../../../Button/Button'
import { useState } from "react";
import Tippy from '@tippyjs/react/headless';
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { changeStatusUser, logoutPost } from "../../../axios/meThodPost";
import { actionPending, successLogout } from "../../../../redux/actions/actionlogin";
import '../../../Page/Login/Login.css'
const cx = classNames.bind(styles)
function BtnLogInOut() {
    // user từ redux
    const userRedux = useSelector(state => state.rootLoginReducer.user)
    const [isLogin, setIsLogin] = useState(userRedux ? userRedux.user : '')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // action pending
    const actionP = actionPending()
    const btnArray = [{
        name: 'Thêm Nhân Viên',
        to: '/',
        color: 'primary'
    },
    {
        name: 'Đăng Nhập',
        to: '/Login',
        color: 'login'

    }
    ]
    const isLoginArray = [
        {
            id: 0,
            name: 'Profile',
            icon: <FontAwesomeIcon className={cx('btnLogout__Icon', 'profile')} icon={faAddressCard} />
        },
        {
            id: 1,
            name: 'Đổi mật khẩu',
            icon: <FontAwesomeIcon className={cx('btnLogout__Icon', 'password')} icon={faCircleInfo} />

        },
        {
            id: 2,
            name: 'Hệ Thống',
            icon: <FontAwesomeIcon className={cx('btnLogout__Icon', 'system')} icon={faScrewdriverWrench} />,
            to: '/System',
            roidAdmin: process.env.REACT_APP_ADMIN_KEY

        },
        {
            id: 3,
            name: 'Đăng xuất',
            icon: <FontAwesomeIcon className={cx('btnLogout__Icon')} icon={faRightFromBracket} />

        },
    ]
    const handleLogOut = async () => {
        const changeStatus = await changeStatusUser(userRedux.employeeId)
        if (changeStatus.status == 200) {
            if (changeStatus.data == "Bạn không hoạt động") {
                const actionLogout = successLogout(null)
                dispatch(actionLogout)
                navigate('/Login')
            } else {
                const changeStatus = await changeStatusUser(userRedux.employeeId)
                const actionLogout = successLogout(null)
                dispatch(actionLogout)
                navigate('/Login')
            }
        }
        console.log(changeStatus)
    }
    return <>
        {

            <div className={cx('wrapperBtnLogInOut')}>

                {
                    userRedux ?
                        <Tippy
                            render={attrs => (
                                <div className="box" tabIndex="-1" {...attrs}>
                                    <div className={cx('boxLogIn')}>
                                        <span>Cấp Bậc: <span>{userRedux.role}</span></span>
                                        {
                                            isLoginArray.map((data, index) => {
                                                if (userRedux.role == 'Admin' || userRedux.role == 'Kitchen' || userRedux.role == process.env.REACT_APP_KEY_ACCOUNTANT) {
                                                    return (
                                                        <div className={cx('btnLogout')} key={index}>
                                                            {data.icon}
                                                            <Button children={data.name} normal onClick={() => {
                                                                navigate(data.to)
                                                                if (data.id == 3) {
                                                                    handleLogOut()
                                                                }
                                                            }} />
                                                        </div>
                                                    )
                                                }
                                                if (!data.roidAdmin) {
                                                    return <div className={cx('btnLogout')} key={index}>
                                                        {data.icon}
                                                        <Button children={data.name} normal onClick={() => {
                                                            navigate(data.to)
                                                            if (data.id == 3) {
                                                                handleLogOut()
                                                            }
                                                        }} />
                                                    </div>
                                                }

                                            })
                                        }
                                    </div>
                                </div>
                            )}
                            interactive={true}
                        >
                            <div className={cx('IsLogin')}>
                                <button>{userRedux.fullName}</button>
                            </div>
                        </Tippy>

                        : (
                            <>

                                {
                                    btnArray.map((data, index) => {
                                        return (
                                            <Button primary children={data.name} to={data.to}
                                                key={index}

                                            />
                                        )
                                    })
                                }
                            </>
                        )
                }
            </div>
        }
    </>
}
export default BtnLogInOut