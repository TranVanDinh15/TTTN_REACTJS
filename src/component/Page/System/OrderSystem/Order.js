import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faFileExcel, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import HeaderSystem from "../HeaderSystem/HeaderSystem";
import styles from './Order.module.scss'
import * as XLSX from 'xlsx';
import { getAllBranch, getReportInDay } from "../../../axios/meThodPost";
import Tippy from "@tippyjs/react/headless";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { handleGetReportInDay, handleGetTunoverMonth, handleGetTunoverYear, handleGetTurnover } from "../../../handleEvent/handleEvent";
const cx = classNames.bind(styles)
function Order() {
    const [currentBranch, setCurrentBranch] = useState('')
    const [allBranch, setAllBranch] = useState('')
    const [allReport, setAllreport] = useState('')
    const [isLogin, setIsLogin] = useState(false)
    const [date, setDate] = useState('')
    const [repostInday, setReportInday] = useState('')
    const [isTurnoverDate, setIsTurnuverDate] = useState(false)
    const userLogin = useSelector(state => state.rootLoginReducer.user)
    const newDate = new Date()
    const day = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate()
    const month = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + 1
    const year = newDate.getFullYear() + '-' + 1 + '-' + 1
    console.log(day)
    const handleExportExcel = () => {
        const foods = allReport.data.map((data, index) => {
            return {
                Number: index,
                Date: data.createAt,
                Table: data.table,
                Food: `${data.food.map((data) => {
                    return `${data.food}, `
                })}`,
                Quantity: `${data.food.map((data) => {
                    return `${data.quantity}, `
                })}`,
                UnitPrice: `${data.food.map((data) => {
                    return `${data.price}, `
                })}`,
                TotalPrice: data.totalAmount
            }
        })
        const wb = XLSX.utils.book_new(foods),
            ws = XLSX.utils.json_to_sheet(foods)
        XLSX.utils.book_append_sheet(wb, ws, 'Mysheet2')
        XLSX.writeFile(wb, "myexcel.xlsx")
    }
    console.log(allReport)
    useEffect(() => {
        getAllBranch(setAllBranch)
    }, [])
    return <div className={cx('wrapperOrder')}>
        <HeaderSystem />
        <div className={cx("UserSystem")}>
            <div className={cx("titleSystem")}>
                <span>Báo Cáo Bán Hàng</span>
            </div>
            <div className={cx("listTime")}>
                <Tippy
                    render={attrs => (
                        <div className="box" tabIndex="-1" {...attrs}>
                            {
                                allBranch ?
                                    allBranch.data.map((data, index) => {
                                        if (data.branchId == userLogin.branchId) {
                                            return (
                                                <div className={cx("box__Item")} key={index}
                                                    onClick={() => {
                                                        setCurrentBranch(data)
                                                        if (userLogin) {
                                                            if (data.branchId == userLogin.branchId) {
                                                                setIsLogin(true)
                                                                handleGetReportInDay(userLogin.employeeId, setAllreport)
                                                            }
                                                        } else {
                                                            setIsLogin(false)
                                                            toast.error('Vui lòng đăng nhâpk !!', {
                                                                position: toast.POSITION.TOP_RIGHT
                                                            });
                                                        }
                                                    }}
                                                >
                                                    <span>{data.name}</span>
                                                </div>
                                            )
                                        }
                                    })
                                    : ''
                            }
                        </div>
                    )}
                    placement={'bottom'}
                    interactive={true}
                >
                    <div className={cx("createUser__Item")

                    }
                        onClick={() => {

                        }
                        }
                        style={{ backgroundColor: 'var(--table)' }}
                    >
                        <span>{currentBranch ? currentBranch.name : 'Chi Nhánh'}</span>
                    </div>
                </Tippy>
                {
                    isLogin ?
                        <div className={cx("dateContainer")}>
                            <div className={cx("roidId")}>
                                <select id="BRAND" name="CHI NHÁNH"
                                    onChange={(event) => {
                                        if (event.target.value == 1) {
                                            handleGetTurnover(userLogin.employeeId, day, 1, setAllreport, setIsTurnuverDate)
                                        }
                                        if (event.target.value == 2) {
                                            handleGetTunoverMonth(userLogin.employeeId, month, setAllreport, setIsTurnuverDate)
                                        }
                                        if (event.target.value == 3) {
                                            handleGetTunoverYear(userLogin.employeeId, year, setAllreport, setIsTurnuverDate)
                                        }
                                    }}
                                >
                                    <option value={0}>Chọn Thời Gian</option>
                                    <option value={1}>Theo Ngày</option>
                                    <option value={2}>Theo Tháng</option>
                                    <option value={3}>Theo Năm</option>
                                </select>
                            </div>
                            <div className={cx("createUser")}
                                onClick={() => {
                                    setIsTurnuverDate(true)
                                }
                                }
                            >
                                <span>Chọn ngày</span>
                            </div>
                            <div className={cx("createUser")}
                                onClick={() => {
                                    handleExportExcel()
                                }
                                }
                            >
                                <FontAwesomeIcon icon={faFileExcel} />
                                <span>Excel</span>
                            </div>
                            {
                                isTurnoverDate ?
                                    <div className={cx("boxDateTurnover")}>
                                        <div className={cx("boxDateTurnover__Blur")}
                                            onClick={() => {
                                                setIsTurnuverDate(false)
                                            }}
                                        >
                                        </div>
                                        <div className={cx("boxDateTurnover__Item")}>
                                            <div className={cx("Containerupdate__Xmark")}
                                                onClick={() => {
                                                    setIsTurnuverDate(false)
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faXmark} />
                                            </div>
                                            <div className={cx("date")}>
                                                <input type={"date"} value={date} onChange={(event) => {
                                                    setDate(event.target.value)
                                                }} />
                                            </div>
                                            <div className={cx("createUser")

                                            }
                                                onClick={async () => {
                                                    handleGetTurnover(userLogin.employeeId, date, 1, setAllreport, setIsTurnuverDate)
                                                }
                                                }
                                                style={{ backgroundColor: 'var(--profile)' }}
                                            >
                                                <span>{'Xem'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    : ''
                            }
                        </div>
                        : ''
                }


            </div>
            <div className={cx("TableSytem")}>

                <table style={{ width: "100%" }}>
                    <tbody>

                        <tr>
                            <th>Số Thứ Tự</th>
                            <th>Ngày giờ Order</th>
                            <th>Tên Bàn</th>
                            <th>Món Ăn</th>
                            <th>Số Lượng</th>
                            <th>Đơn giá</th>
                            <th>Thành Tiền</th>
                        </tr>
                        {
                            allReport ?
                                allReport.data.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{data.createAt}</td>
                                            <td>{data.table}</td>
                                            <td>{data.food.map((data, index) => {
                                                return <span>{data.food}, </span>
                                            })}</td>
                                            <td>{data.food.map((data, index) => {
                                                return <span>{data.quantity}, </span>
                                            })}</td>
                                            <td>{data.food.map((data, index) => {
                                                return <span>{data.price}, </span>
                                            })}</td>
                                            <td>{data.totalAmount
                                            }</td>

                                        </tr>
                                    )
                                })
                                : ''
                        }




                    </tbody>

                </table>
            </div>
        </div>
        <ToastContainer></ToastContainer>
    </div >
}
export default Order