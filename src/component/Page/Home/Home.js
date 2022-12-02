import classNames from "classnames/bind";
import styles from './Home.module.scss'
import Header from '../../defaultlayouts/Header/Header'
import Content from "../../defaultlayouts/Content/Content";
import './Home.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faSackDollar, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import IsLogin from "../../isLogin/isLogin";
import { handleGetTurnover, handleTrendingFood } from "../../handleEvent/handleEvent";
import { amountPayloadOrder } from "../../axios/meThodPost";
const cx = classNames.bind(styles)
function Home() {
    const date = new Date()
    const currentDay = (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    console.log(currentDay)
    const userRedux = useSelector(state => state.rootLoginReducer.user)
    const [turnoverOrder, setTurnoverOrder] = useState('')
    const [amoutOrder, setAmountOrder] = useState('')
    const [chartState, setCharState] = useState('')
    useEffect(() => {
        handleTrendingFood(userRedux?userRedux.employeeId:'', setCharState, setTurnoverOrder)
    }, [])
    console.log(chartState)
    console.log(turnoverOrder)
    return <>
        {
            userRedux ?
                <div>
                    <Header />
                    <Content>
                        <div className={cx('wrapperHome')}>
                            <div className={cx('Heading')}>
                                <span>Tổng quan</span>
                            </div>
                            <div className={cx('Container')}>
                                <div className={cx('Container__Day')}>
                                    <span>Hoạt động trong ngày ({date.getDate() + '-' + (date.getMonth() + 1) + '-' + (date.getFullYear()) + '/' + date.getHours() + ':' + date.getMinutes()})</span>
                                </div>
                            </div>
                            <div className={cx('turnoverOrder')}>
                                <div className={cx('turnoverOrder__Item')}>
                                    <div className={cx('turnoverOrder__Item__child')}>
                                        <div className={cx('turnoverOrder__title')}>
                                            <span><i><FontAwesomeIcon icon={faSackDollar} /></i>Tiền Thu</span>
                                        </div>
                                        <div className={cx('turnoverOrder__Infor')}>
                                            <div className={cx('turnoverOrder__Infor__Item')}>
                                                <span>Doanh thu hiện tại</span>
                                                <span>{turnoverOrder ? turnoverOrder.data.doanhthu
                                                    : ''}</span>
                                            </div>
                                            {/* <div className={cx('turnoverOrder__Infor__Item')}>
                                                <span>Khách đặt cọc</span>
                                                <span>400</span>
                                            </div> */}
                                        </div>
                                    </div>

                                    <div className={cx('turnoverOrder__Item__child')}>
                                        <div className={cx('turnoverOrder__title')}>
                                            <span><i><FontAwesomeIcon icon={faClipboard} /></i>Order</span>
                                        </div>
                                        <div className={cx('turnoverOrder__Infor')}>
                                            <div className={cx('turnoverOrder__Infor__Item')}>
                                                <span>Đã Thanh Toán</span>
                                                <span>{turnoverOrder ? turnoverOrder.data.dathanhtoan : ''}</span>
                                            </div>
                                            <div className={cx('turnoverOrder__Infor__Item')}>
                                                <span>Chưa Thanh Toán</span>
                                                <span>{turnoverOrder ? turnoverOrder.data.chuathanhtoan : ''}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('turnoverOrder__Item')}
                                    style={{
                                        width: " 100%",
                                        // display: "flex",
                                        // justifyContent: "center"
                                    }}
                                >
                                    <div className={cx('turnoverOrder__Item__child')}
                                        style={{
                                            width: " 100%",
                                            // display: "flex",
                                            // justifyContent: "center"
                                        }}
                                    >
                                        <div className={cx('turnoverOrder__title')}
                                            style={{
                                                width: " 100%",
                                                float: "left"
                                            }}
                                        >
                                            <span><i><FontAwesomeIcon icon={faChartSimple} /></i>Số lượng Order</span>
                                        </div>
                                        {
                                            chartState ?
                                                <ReactApexChart
                                                    options={chartState.options}
                                                    series={chartState.series}
                                                    type="pie"
                                                    width="400"
                                                    height="200"
                                                    style={{
                                                        width: " 100%",
                                                        display: "flex",
                                                        justifyContent: "center"
                                                    }}
                                                />
                                                : ''
                                        }
                                    </div>
                                    {/* 
                                    <div className={cx('turnoverOrder__Item__col')}>

                                        <div className={cx('turnoverOrder__Item__child')}>
                                            <div className={cx('turnoverOrder__title')}>
                                                <span><i><FontAwesomeIcon icon={faChartSimple} /></i>Doanh thu ước tính</span>
                                                <span>16.525,789</span>
                                            </div>
                                            <div className={cx('turnoverOrder__Infor')}>
                                                <div className={cx('turnoverOrder__Infor__Item')}>
                                                    <span>Đã Thanh Toán</span>
                                                    <span>14,672,826</span>
                                                </div>
                                                <div className={cx('turnoverOrder__Infor__Item')}>
                                                    <span>Đang phục vụ</span>
                                                    <span>2000,000</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>

                            </div>

                        </div>
                    </ Content>
                </div>
                : <IsLogin />
        }
    </>
}
export default Home
