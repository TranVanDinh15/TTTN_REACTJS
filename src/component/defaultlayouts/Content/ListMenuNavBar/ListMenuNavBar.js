import { faMoneyBill1 } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown, faBowlRice, faBurger, faCodeBranch, faHouse, faTable, faUser, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './ListMenuNavBar.module.scss'
import './ListMenuNavBar.css'
import { useSelector } from "react-redux";
const cx = classNames.bind(styles)
const ListMenu = [
    {
        id: 1,
        name: 'Tổng Quan',
        to: '/',
        icon: <FontAwesomeIcon icon={faHouse} />
    },
    {
        id: 2,
        name: 'Profile',
        to: '/ProfileUser',
        icon: <FontAwesomeIcon icon={faUser} />
    },
    {
        id: 3,
        name: 'Đặt Món',
        to: '/OrderFood',
        icon: <FontAwesomeIcon icon={faBurger} />,
    },
    {
        id: 4,
        name: 'Đặt Bàn',
        to: '/OrderTable',
        icon: <FontAwesomeIcon icon={faTable} />,
    },
    // {
    //     id: 5,
    //     name: 'Thêm Thực Phẩm',
    //     to: '/AddFood',
    //     icon: <FontAwesomeIcon icon={faBowlRice} />,
    //     downIcon: <FontAwesomeIcon icon={faAngleDown} />,
    //     child: [
    //         'Chi Nhánh 1',
    //         'Chi Nhánh 2',
    //         'Chi Nhánh 3',
    //     ]
    // },

]
function ListMenuNavBar() {
    // State kiểm tra danh sách con có đang hiện hay không
    const [checkChild, setCheckChild] = useState(false)
    const [action, setAction] = useState('')
    // sử dụng actionNavBar từ redux
    const isAction = useSelector(state => state.displayNavbar.isAction)
    const navigate = useNavigate()
    return <ul className={cx('wrapperListMenuNavBar')}  >
        {
            ListMenu ? ListMenu.map((data, index, array) => {
                return (
                    <li className={cx("ListMenuNavBar__Item")}
                        onClick={(event) => {
                            if (data.child) {
                                setCheckChild(true)
                            }
                            if (checkChild == true) {
                                setCheckChild(false)
                            }
                        }}
                        key={index}
                    ><span className={cx(`ListMenuNavBar__Link_${index}`, 'ListMenuNavBar__Link', action ? data.name == action ? 'action' : '' : '',
                        window.location.pathname.substr(0) == data.to ? 'action' : ''
                    )}
                        onClick={(event) => {
                            setAction(data.name)
                            navigate(data.to)
                        }}
                    // to={'/' + data.to}
                    >{data.icon}  <span className={cx('nameItem', isAction ? cx("actionNavBar") : '')}>{data.name}</span> <i className={cx("actionNavBar")}>{data.downIcon}</i></span>
                        {/* Render các mục con của mục Thêm thực phẩm  */}
                        {
                            // data.child && checkChild == true ? data.child.map((data, index) => {
                            //     return (
                            //         <ul className={cx("ListMenuNavBar__Item__childList")} key={index}>
                            //             <li className={cx("ListMenuNavBar__Item__child")}
                            //                 onClick={() => {
                            //                     navigate('/AddFood')
                            //                 }}
                            //             ><span >{data}</span></li>
                            //         </ul>
                            //     )
                            // }) : ''
                        }

                    </li>
                )
            }) : ''
        }
    </ul >
}
export default ListMenuNavBar