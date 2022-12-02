import classNames from "classnames/bind";
import styles from './OrderTable.module.scss'
import Header from '../../defaultlayouts/Header/Header'
import Content from "../../defaultlayouts/Content/Content";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DetailTable from "./detailTable/detailTable";
import IsLogin from "../../isLogin/isLogin";
import { handleDetailOrder, handleGetAllTable, handleGetListTableStatus } from "../../handleEvent/handleEvent";
import { detailOrder } from "../../axios/meThodPost";
import BillPrint from "../OrderFood/BillPrint/BillPrint";
import { ToastContainer } from "react-toastify";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const cx = classNames.bind(styles)

function OrderTable() {
    const [allTable, setAllTable] = useState('')
    const [tableNone, setTableNon] = useState('')
    const [tableIsClient, setTableIsClient] = useState('')
    const [isDetail, setIsDetail] = useState(false)
    const [detailOrder, setDetailOrder] = useState('')
    const [isDisplayPrint, setIsDisplayPrint] = useState(false)
    const [isTableClient, setIsTableClient] = useState(false)
    const [tableId, setTableId] = useState('')
    const currentUser = useSelector(state => state.rootLoginReducer.user)
    const hanleDisplayDeTail = async () => {
        if (isDetail == true) {
            setIsDetail(false)
        }
        setIsDetail(true)

    }
    useEffect(() => {
        if (currentUser) {
            handleGetListTableStatus(currentUser.employeeId, 0, setTableNon)
        }
    }, [])

    console.log(detailOrder)
    return <>
        {
            currentUser ?
                <div>
                    <Header />
                    <Content>
                        <div className={cx("wrapperOrderTable")}>
                            <div className={cx("TitleTable")}>
                                <button>PHÒNG BÀN</button>
                            </div>
                            <div className={cx("TitleTable__TableStatus")}
                                onClick={() => {
                                    if (currentUser) {
                                        setIsTableClient(true)
                                        handleGetListTableStatus(currentUser.employeeId, 1, setTableIsClient)
                                    }

                                }}
                            >
                                <button>Đang phục vụ</button>
                            </div>
                            <div className={cx("ListTable")}>
                                <div className={cx("TitleTable__TableStatus")}>
                                    <span
                                        style={{
                                            color: "#fff",
                                            fontSize: "20px"
                                        }}
                                    >Bàn trống</span>
                                </div>
                                <div className={cx("TitleTable__TableStatus")}>
                                    {
                                        tableNone ?
                                            tableNone.data.map((data, index) => {
                                                return (

                                                    <div className={cx("ListTable__Item", `ListTable__Item__${index}`)} key={index}
                                                        onClick={() => {
                                                            setDetailOrder('')
                                                            hanleDisplayDeTail()
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                fontSize: "16px",
                                                                fontWeight: "700"
                                                            }}
                                                        >Bàn {data.name}</span>

                                                        <div className={cx("box__detail")}>
                                                            <span>Chi Tiết</span>
                                                        </div>
                                                    </div>
                                                )
                                            }) : <span
                                                style={{ color: "#000" }}
                                            > Bàn không có khách</span>
                                    }
                                </div>

                            </div>

                            <div className={cx("ListTable")}>
                                {
                                    isTableClient ?
                                        <div className={cx("TitleTable__TableStatus")}>
                                            <div className={cx("isclient")}>
                                                <div className={cx("wrapperDetailTable__xmark")}
                                                    onClick={(event) => {
                                                        setIsTableClient(false)
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faXmark} />
                                                </div>
                                                {
                                                    tableIsClient ?
                                                        tableIsClient.data.map((data, index) => {
                                                            return (
                                                                <div className={cx("ListTable__Item", `ListTable__Item__${index}`)} key={index}
                                                                    onClick={async () => {
                                                                        setTableId(data.tableId)
                                                                        await setDetailOrder('')
                                                                        await hanleDisplayDeTail()
                                                                        await handleDetailOrder(data.tableId, currentUser.employeeId, setDetailOrder, setIsDetail)

                                                                    }}
                                                                    style={{ backgroundColor: "var(--table)" }}
                                                                >
                                                                    <span
                                                                        style={{
                                                                            fontSize: "16px",
                                                                            fontWeight: "700"
                                                                        }}
                                                                    >Bàn {data.name}</span>

                                                                    <div className={cx("box__detail")}>
                                                                        <span>Chi Tiết</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }) : ''
                                                }
                                            </div>
                                        </div>
                                        : ''
                                }

                            </div>
                        </div>
                        {/* <div className={cx("bottom_btn")}>
                            <div className={cx("bottom__btn__Item")}>
                                <button>Chuyển Bàn</button>
                            </div>
                            <div className={cx("bottom__btn__Item")}

                            >
                                <button

                                >Thu Tiền</button>
                            </div>

                        </div> */}
                        {
                            isDetail == true ?
                                <DetailTable setIsDetail={setIsDetail} detailOrder={detailOrder ? detailOrder : ''} setDisplayPrint={setIsDisplayPrint} />
                                : ''
                        }
                    </ Content>
                </div>
                : <IsLogin />
        }
        {isDisplayPrint ?
            <BillPrint setDisplayPrint={setIsDisplayPrint} totalPrice={20000} detailOrder={detailOrder ? detailOrder : ''} tableId={tableId ? tableId : ''} />
            : ''
        }
        <ToastContainer></ToastContainer>
    </>
}
export default OrderTable