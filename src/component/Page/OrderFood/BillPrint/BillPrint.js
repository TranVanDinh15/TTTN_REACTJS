import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from './BillPrint.module.scss'
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { handlePayload } from "../../../handleEvent/handleEvent";
const cx = classNames.bind(styles)
function BillPrint({ setDisplayPrint, totalPrice, detailOrder, tableId }) {
    console.log(detailOrder)
    const componentRef = useRef();
    const getCart = useSelector(state => state.cartPr.cart)
    const userRedux = useSelector(state => state.rootLoginReducer.user)
    console.log(userRedux)
    const date = new Date()
    // const totalQuantity = getCart != [] ? getCart.reduce((accumalator, currentValue) => {
    //     return accumalator + currentValue.quantity
    // }, 0) : ''
    const totalCoin = detailOrder ? detailOrder.data.food.reduce((accumalator, currentValue) => {
        return accumalator + currentValue.price * currentValue.quantity
    }, 0) : ''
    console.log(totalCoin)
    return <div className={cx('wrapperBillPrint')}>
        <div className={cx('wrapperBillPrint__Item')}>
            <div className={cx('wrapperBillPrint__Item__Xmark')}
                onClick={() => {
                    setDisplayPrint(false)
                }}
            >
                <FontAwesomeIcon icon={faXmark} />
            </div>
            <div className={cx('wrapperBillPrint__Item__BtnPrint')}>
                <ReactToPrint
                    trigger={() => <button
                    >In hóa đơn</button>}
                    content={() => componentRef.current}
                    onAfterPrint={() => {
                        setDisplayPrint(false)

                        handlePayload(userRedux ? userRedux.employeeId : '', tableId)
                    }}
                />
            </div>
            <div className={cx('wrapperBillPrint__Item__BtnPrint')}>
                <button>Không In Bill</button>
            </div>
            <div ref={componentRef}>
                <div className={cx('wrapperBillPrint__Item__NameRestaurant')}>
                    <span>Barbecue Restaurant</span>
                </div>
                <div className={cx('wrapperBillPrint__Item__Address')}>
                    <i>Điện Biên Phủ, Thành Phố Hồ Chí Minh</i>
                </div>
                <div className={cx('wrapperBillPrint__Item__PhoneNumber')}>
                    <span>0162836157-0421783982</span>
                </div>
                <div className={cx('wrapperBillPrint__Item__Heading')}>
                    <span>Hóa Đơn Thanh Toán</span>
                </div>
                <div className={cx('wrapperBillPrint__Item__dayPrint')}>
                    <span>Ngày in: {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</span>
                </div> <div className={cx('wrapperBillPrint__Item__dayPrint')}>
                    <span>giờ in: {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</span>
                </div>
                <div className={cx('wrapperBillPrint__Item__Table')}>
                    <span>Bàn Số: {detailOrder.data.table}</span>
                </div>
                <div className={cx('wrapperBillPrint__Item__TableListFood')}>
                    <table style={{ width: "100%" }}>
                        <tr>
                            <th>Tên Hàng</th>
                            <th>Số Lượng</th>
                            <th>Đơn Giá</th>
                            <th>Tiền</th>
                        </tr>
                        {
                            detailOrder ?
                                detailOrder.data.food.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{data.food}</td>
                                            <td>{data.quantity}</td>
                                            <td>{data.price.toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })
                                            }</td>
                                            <td>{(data.price * data.quantity).toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}</td>

                                        </tr>
                                    )
                                })
                                : ''
                        }

                        <tr>
                            <td>Tổng Cộng</td>
                            <td></td>
                            <td></td>
                            <td>{totalCoin.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}</td>

                        </tr>
                    </table>
                </div>
                <div className={cx('wrapperBillPrint__Item__solid')}>
                </div>
                <div className={cx('wrapperBillPrint__Item__Table')}>
                    <span>Cảm ơn quý khách - Hẹn gặp lại</span>
                </div>
            </div>
        </div>
    </div>
}
export default BillPrint