import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames/bind"
import { handleChangerStatusKitchen } from "../../../handleEvent/handleEvent"
import styles from './detailTable.module.scss'
const cx = classNames.bind(styles)
function DetailTable({ setIsDetail, detailOrder, setDisplayPrint, kitchen, currentFood}) {
    console.log(detailOrder)
    const totalCoin = detailOrder ? detailOrder.data.food.reduce((accumalator, currentValue) => {
        return accumalator + currentValue.price * currentValue.quantity
    }, 0) : ''
    return (
        <div className={cx("wrapperDetailTable")}
        >
            <div className={cx("wrapperDetailTable__Container")}

            >
                <div className={cx("wrapperDetailTable__xmark")}
                    onClick={(event) => {
                        setIsDetail(false)
                    }}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                {
                    detailOrder ?
                        <div>
                            <div className={cx("wrapperDetailTable__Heading")}>
                                <span>{detailOrder ? detailOrder.data.table : ''}</span>
                            </div>
                            <div className={cx("wrapperDetailTable__Item__NameClient")}>
                                <span>Khách Hàng: {detailOrder.data.description
                                }</span>
                            </div>
                            {
                                kitchen?'':
                            <div className={cx("wrapperDetailTable__Item__NameClient")}>
                                <span>Tình trạng: Bếp chưa xác nhận</span>
                            </div>
                            }
                            <div className={cx("wrapperDetailTable__Item")}>
                                <table class="w3-table">
                                    <tr>
                                        <th>Món ăn</th>
                                        <th>Giá</th>
                                        <th>Sô Lượng</th>
                                        <th>Thời gian order</th>
                                        <th>Tổng Tiền </th>
                                        <th>Tình trạng</th>
                                        {
                                            kitchen?
                                            <>
                                        <th>Xác Nhận</th>
                                            </>
:''
                                        }
                                    </tr>
                                    {
                                        detailOrder ?
                                            detailOrder.data.food.map((data, index) => {
                                                return (

                                                    <tr>
                                                        <td>{data.food}</td>
                                                        <td>{data.price.toLocaleString("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        })}</td>
                                                        <td>{data.quantity}</td>
                                                        <td>{detailOrder.data.createAt
                                                        }</td>
                                                        <td>{(data.total).toLocaleString("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        })}</td>
                                                            <td>{data.status==0?
                                                        'Chưa xác nhận':data.status==1?'Đang làm món':'Đã phục vụ'     
                                                        }</td>
                                                        {
                                                            kitchen?
                                                            <>
                                                            <td>
                                                            <button
                                                className={cx(data.status == 1 ? "action" : '', data.status==2 ?'actiontwo':'')}
                                                style={{
                                                    padding: "2px 10px",
                                                    marginLeft: "10px",
                                                    cursor: "pointer",
                                                    float: "right",
                                                    backgroundColor: "#7D3CFF",
                                                    color: "var(--white)",
                                                    border: "none"
                                                }}
                                                onClick={(event) => {
                                                    event.preventDefault()
                                                handleChangerStatusKitchen(detailOrder.data.orderId, data.foodId, data.status)
                                                setIsDetail(false)
                                                }}
                                            >{data.status==1?'Phục vụ':data.status==0?'Xác nhận':'Đã phục vụ'}</button>
                                                            </td>
                                                            </>
                                                            :''
                                                        }
                                                    </tr>
                                                )
                                            })
                                            : ''
                                    }
                                </table>
                                <div className={cx("wrapperDetailTable__Item__Total")}>
                                    <span>Tổng Cộng</span>
                                    <span>{totalCoin.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}</span>
                                </div>

                            </div>
                            {
                                kitchen?''
                                :
                            <div className={cx("bottom__btn__Item")}

                            >
                                <button
                                    onClick={() => {
                                        setDisplayPrint(true)
                                        setIsDetail(false)
                                    }}
                                >Thu Tiền</button>
                            </div>
                            }

                        </div>
                        : <span>Bàn không có khách </span>
                }
            </div>
        </div>
    )
}
export default DetailTable