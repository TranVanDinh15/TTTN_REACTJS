import classNames from "classnames/bind";
import styles from './OrderFood.module.scss'
import Header from '../../defaultlayouts/Header/Header'
import Content from "../../defaultlayouts/Content/Content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faBowlFood, faCalculator, faCalendarPlus, faMinus, faPlus, faSearch, faWineGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { food } from "../../../FakeApi";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, deleteProduct, removeAllProduct, removeProduct } from "../../../redux/actions/actions";
import BillPrint from "./BillPrint/BillPrint";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IsLogin from "../../isLogin/isLogin";
import Tippy from "@tippyjs/react/headless";
import { handleConfirmOrder, handleCreateOrder, handleGetAllTable, handleGetListFood, handleGetListTableStatus, handleUpdateOrder } from "../../handleEvent/handleEvent";
import { getAllFood } from "../../axios/meThodPost";
const cx = classNames.bind(styles)
const category = [
    {
        name: 'Món ăn',
        icon: <FontAwesomeIcon icon={faBowlFood} />
    },
    {
        name: 'Đồ uống',
        icon: <FontAwesomeIcon icon={faWineGlass} />
    },

]

function OrderFood() {
    const [isAuthentication, setIsAuthentication] = useState(false)
    const [isDisPlayPrint, setDisPlayPrint] = useState(false)
    // thoong tin dang nhap tu redux
    const currentUser = useSelector(state => state.rootLoginReducer.user)
    const [isAction, setIsAction] = useState(category[0].name)
    // Lấy giỏ hàng từ redux
    const cart = useSelector(state => state.cartPr.cart)
    //  all Food in Branch
    const [allFood, setAllFood] = useState('')
    // getAllTable
    const [allTable, setAllTable] = useState('')
    // request create Order
    const [requestOrder, setRequestOrder] = useState({
        restaurantId: process.env.REACT_APP_RESTAURANTID,
        branchId: currentUser ? currentUser.branchId : '',
        employeeId: currentUser ? currentUser.employeeId : '',
        table: '',
        food: [

        ],
        description: ''
    })
    // Lấy dữ liệu giỏ hàng từ localStorage
    const dispatch = useDispatch()
    const totalCoin = cart != [] ? cart.reduce((accumalator, currentValue) => {
        return accumalator + currentValue.totalPrice
    }, 0) : ''
    const [isCreateTable, setIsCreateTable] = useState(false)
    const [isConfirmCombine, setIsConfirmCombine] = useState(false)
    const [isAddFood, setIsAddFood] = useState(false)
    const [requestUpdateFood, setRequestUpdateFood] = useState(
        {
            employeeId: currentUser ? currentUser.employeeId : '',
            table: '',
            food: [],
            description: 'không'
        }
    )
    const [detailOrder, setDetailOrder] = useState('')
    console.log(detailOrder)
    console.log(cart)
    console.log(allFood)
    useEffect(() => {
        if (currentUser) {
            getAllFood(currentUser.employeeId, setAllFood)
        }
    }, [])
    return <>
        {
            currentUser ?
                <div>
                    <Header />
                    <Content>
                        <div className={cx("wrapperOrderFood")}>
                            <div className={cx("OrderFood__Item")}>
                                <div className={cx("OrderFood__Option")}>
                                    {
                                        category ? category.map((data, index) => {
                                            return (
                                                <div className={cx("OrderFood__Option__Item", isAction ? isAction == data.name ? 'actionCategory' : '' : '')}
                                                    onClick={() => {
                                                        setIsAction(data.name)
                                                    }}
                                                    key={index}
                                                >
                                                    {data.icon}
                                                    <span>{data.name}</span>
                                                </div>
                                            )
                                        }) : ''
                                    }
                                </div>
                                {/* <div className={cx("OrderFood__Search")}>
                                    <div className={cx("OrderFood__Search__Item")}>
                                        <input type={"text"} placeholder={'Tìm món...'} />
                                        <i><FontAwesomeIcon icon={faSearch} /></i>
                                    </div>
                                </div> */}
                                {
                                    isAction && isAction == category[0].name ?
                                        <div className={cx("ContainerFood")}>
                                            <div className={cx("ContainerFood__Food")}>
                                                {
                                                    allFood ?
                                                        allFood.data.map((data, index) => {
                                                            if (data.type == process.env.REACT_APP_FOOD_KEY) {
                                                                return (

                                                                    <div className={cx("ContainerFood__Food__Item")}
                                                                        onClick={() => {
                                                                            const action = addNewProduct({
                                                                                ...data,
                                                                                quantity: 1,
                                                                                totalPrice: data.price
                                                                            })
                                                                            dispatch(action)
                                                                        }}
                                                                        key={index}
                                                                    >
                                                                        <div className={cx("ContainerFood__Food__Item__Image")}>
                                                                            <img src={data.image} />
                                                                        </div>
                                                                        <div className={cx("ContainerFood__Food__Item__Infor")}>
                                                                            <span>{data.name}</span>
                                                                            <span> <span className={cx('price')}>{data.price.toLocaleString("vi-VN", {
                                                                                style: "currency",
                                                                                currency: "VND",
                                                                            })}</span></span>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        }) : ''
                                                }
                                            </div>
                                            <div className={cx("ContainerFood__NextPrev")}>
                                                <div className={cx("ContainerFood__NextPrev__Item")}>
                                                    <span><FontAwesomeIcon icon={faAngleLeft} /></span>
                                                </div>
                                                <div className={cx("ContainerFood__NextPrev__Item")}>
                                                    <span><FontAwesomeIcon icon={faAngleRight} /></span>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className={cx("ContainerFood")}>
                                            <div className={cx("ContainerFood__Food")}>
                                                {
                                                    allFood ? allFood.data.map((data, index) => {
                                                        if (data.type == process.env.REACT_APP_DRINKS_KEY) {
                                                            return (
                                                                <div className={cx("ContainerFood__Food__Item")}
                                                                    onClick={() => {
                                                                        const action = addNewProduct({
                                                                            ...data,
                                                                            quantity: 1,
                                                                            totalPrice: data.price
                                                                        })
                                                                        dispatch(action)
                                                                    }}
                                                                    key={index}
                                                                >
                                                                    {/* <div className={cx("ContainerFood__Food__Item__Image")}>
                                                                        <img src={data.image} />
                                                                    </div> */}
                                                                    <div className={cx("ContainerFood__Food__Item__Infor")}>
                                                                        <span>{data.name}</span>
                                                                        <span><span className={cx('cost')}>{data.price.toLocaleString("vi-VN", {
                                                                            style: "currency",
                                                                            currency: "VND",
                                                                        })}</span> - <span className={cx('price')}>{data.price.toLocaleString("vi-VN", {
                                                                            style: "currency",
                                                                            currency: "VND",
                                                                        })}</span></span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    }) : ''
                                                }

                                            </div>
                                            <div className={cx("ContainerFood__NextPrev")}>
                                                <div className={cx("ContainerFood__NextPrev__Item")}>
                                                    <span><FontAwesomeIcon icon={faAngleLeft} /></span>
                                                </div>
                                                <div className={cx("ContainerFood__NextPrev__Item")}>
                                                    <span><FontAwesomeIcon icon={faAngleRight} /></span>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>
                            <div className={cx("OrderFood__Item")}>
                                <div className={cx("OrderFood__Item__Container")}>
                                    <table className={cx("OrderFood__Item__Container__title")}>
                                        <tbody>
                                            <tr
                                                style={{
                                                    textAlign: "center",

                                                }}
                                            >
                                                <th>Tên Món</th>
                                                <th>Số Lượng</th>
                                                <th>Thành Tiền</th>
                                            </tr>

                                            {
                                                cart ? (cart).map((data, index) => {
                                                    return (
                                                        <tr key={index}
                                                            style={{
                                                                textAlign: "left"
                                                            }}
                                                        >
                                                            <td>{data.name}</td>
                                                            <td>{data.quantity ? data.quantity : 1}
                                                                <div className={cx("OrderFood__Item__iconAmount")}>
                                                                    <button
                                                                        onClick={() => {
                                                                            const actionRemove = removeProduct(data)
                                                                            dispatch(actionRemove)
                                                                        }}
                                                                    ><FontAwesomeIcon icon={faMinus} /></button>
                                                                    <button
                                                                        onClick={() => {
                                                                            const actionAdd = addNewProduct(data)
                                                                            dispatch(actionAdd)
                                                                        }}
                                                                    ><FontAwesomeIcon icon={faPlus} /></button>
                                                                </div>
                                                            </td>
                                                            <td>{
                                                                (data.totalPrice).toLocaleString("vi-VN", {
                                                                    style: "currency",
                                                                    currency: "VND",
                                                                })

                                                            }<span className={cx("OrderFood__Item__Xmark")}
                                                                onClick={() => {
                                                                    const deleteAction = deleteProduct(data)
                                                                    dispatch(deleteAction)
                                                                }}
                                                            ><FontAwesomeIcon icon={faXmark} /></span></td>
                                                        </tr>
                                                    )
                                                }) : ''
                                            }
                                        </tbody>

                                    </table>
                                </div>
                                <div className={cx("OrderFood__Item__Total")}>
                                    <div className={cx("OrderFood__Item__Total__User")}>
                                        <span>NV: {currentUser ? currentUser.fullName : ''}</span>
                                    </div>
                                    <div className={cx("OrderFood__Item__Total__TotalItem")}>
                                        <span>Tổng Cộng: </span>
                                        <span>{totalCoin.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}</span>
                                    </div>

                                </div>
                                <div className={cx("OrderFood__Item__Btn")}>
                                    <div className={cx("OrderFood__Item__cancelBtn")}
                                        onClick={(event) => {
                                            const payload = []
                                            const removeAll = removeAllProduct(payload)
                                            dispatch(removeAll)
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                        <span

                                        >Hủy Bỏ</span>
                                    </div>
                                    <div className={cx("OrderFood__Item__createTable")}
                                        onClick={async () => {
                                            if (isAddFood == false) {
                                                setIsAddFood(true)
                                                const orderUpdate = cart.map((data) => {
                                                    return {
                                                        food: data.foodId,
                                                        quantity: data.quantity
                                                    }
                                                })
                                                console.log(orderUpdate)
                                                setRequestUpdateFood({
                                                    ...requestUpdateFood,
                                                    food: orderUpdate
                                                })
                                            } else {
                                                setIsAddFood(false)
                                            }
                                            await handleGetListTableStatus(currentUser.employeeId, 1, setAllTable)

                                        }}
                                    >
                                        <FontAwesomeIcon icon={faCalendarPlus} />
                                        <span>Ghép Đơn</span>
                                    </div>
                                    <div className={cx("OrderFood__Item__createTable")}
                                        onClick={async (event) => {
                                            setIsCreateTable(true)
                                            await handleGetListTableStatus(currentUser.employeeId, 0, setAllTable)
                                            if (cart) {
                                                const foodRequest = cart.map((data, index) => {
                                                    return (
                                                        {
                                                            food: data.foodId,
                                                            quantity: data.quantity,
                                                        })

                                                })
                                                setRequestOrder({
                                                    ...requestOrder,
                                                    food: foodRequest
                                                })
                                            }
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faCalendarPlus} />
                                        <span>Tạo Bàn</span>
                                    </div>
                                    <div className={cx("OrderFood__Item__PayBtn")}
                                        onClick={() => {
                                            setDisPlayPrint(true)
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faCalculator} />
                                        <span>Thanh Toán</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ToastContainer
                            position="bottom-right"
                        />
                    </ Content>
                </div>
                : < IsLogin />
        }
        {
            isDisPlayPrint ?
                <BillPrint setDisplayPrint={setDisPlayPrint} totalPrice={totalCoin} /> : ''

        }
        {
            isCreateTable ?
                <div className={cx("wrapperTableHollow")}>
                    <div className={cx("wrapperTableHollow__Item")}>
                        <div className={cx("wrapperTableHollow__Item__Icon")}
                            onClick={(event) => {
                                setIsCreateTable(false)
                            }}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                        <div className={cx("wrapperTableHollow__Item__Heading")}>
                            <span>Bàn còn trống</span>
                        </div>
                        <div className={cx("ListTable")}>
                            {
                                allTable ?
                                    allTable.data.map((data, index) => {
                                        return (
                                            <Tippy
                                                render={attrs => (
                                                    <div className={cx("box")} tabIndex="-1" {...attrs}>
                                                        <div className={cx("btn_orderTable")}
                                                            onClick={() => {
                                                                setRequestOrder({
                                                                    ...requestOrder,
                                                                    table: data.tableId
                                                                })
                                                                setIsAuthentication(true)
                                                                setIsCreateTable(false)
                                                            }}
                                                        >
                                                            <button>
                                                                Tạo
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                                interactive={true}
                                                placement={"bottom"}
                                                key={index}
                                            >
                                                <div className={cx("ListTable__Item")}>
                                                    <span>{data.name}</span>
                                                </div>
                                            </Tippy>
                                        )
                                    })
                                    : ''
                            }


                        </div>
                    </div>

                </div>
                : ''
        }
        {
            isAuthentication ?
                <div className={cx("authentication")}>
                    <div className={cx("authentication__Item")}>
                        <span>Xác nhận tạo bàn</span>
                        <div className={cx("authentication__Item__Input")}>
                            <input placeholder="ghi chú" width={"200px"} height={"40px"}
                                onChange={(event) => {
                                    setRequestOrder({
                                        ...requestOrder,
                                        description: event.target.value
                                    })
                                }}
                            />
                        </div>
                        <div className={cx("authentication__Item__btn")}>
                            <div
                                onClick={(event) => {
                                    event.preventDefault()
                                    handleCreateOrder(requestOrder, setIsAuthentication)
                                }}
                            >
                                <button
                                    className={cx("authentication__Item__btn__Profile")}
                                >Xác nhận</button>
                            </div>
                            <div
                                onClick={(event) => {
                                    event.preventDefault()
                                    setIsAuthentication(false)
                                }}
                            >
                                <button
                                    className={cx("authentication__Item__btn__home")}

                                >Hủy</button>
                            </div>
                        </div>
                    </div>
                </div>
                : ''
        }
        {
            isAddFood ?
                <div className={cx("wrapperTableHollow")}>
                    <div className={cx("wrapperTableHollow__Item")}>
                        <div className={cx("wrapperTableHollow__Item__Icon")}
                            onClick={(event) => {
                                setIsAddFood(false)
                            }}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                        <div className={cx("wrapperTableHollow__Item__Heading")}>
                            <span>Chọn Bàn Cần Ghép Đơn</span>
                        </div>
                        <div className={cx("ListTable")}>
                            {
                                allTable ?
                                    allTable.data.map((data, index) => {
                                        return (
                                            <Tippy
                                                render={attrs => (
                                                    <div className={cx("box")} tabIndex="-1" {...attrs}>
                                                        <div className={cx("btn_orderTable")}
                                                            onClick={(event) => {
                                                                setIsConfirmCombine(true)
                                                                setRequestUpdateFood({
                                                                    ...requestUpdateFood,
                                                                    table: `${data.tableId}`
                                                                })
                                                                handleUpdateOrder(currentUser.employeeId, data, cart, setDetailOrder)
                                                            }}
                                                        >
                                                            <button
                                                            >
                                                                Ghép
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                                interactive={true}
                                                placement={"bottom"}
                                                key={index}
                                            >
                                                <div className={cx("ListTable__Item")}>
                                                    <span>{data.name}</span>
                                                </div>
                                            </Tippy>
                                        )
                                    })
                                    : ''
                            }


                        </div>
                    </div>

                </div>
                : ''
        }
        {/* {
            isAddFood ?
                <div className={cx("wrapperTableHollow")}>
                    <div className={cx("wrapperTableHollow__Item")}>
                        <div className={cx("wrapperTableHollow__Item__Icon")}
                            onClick={(event) => {
                                setIsAddFood(false)
                            }}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                        <div className={cx("wrapperTableHollow__Item__Heading")}>
                            <span>Chọn Bàn Cần Ghép Đơn</span>
                        </div>
                        <div className={cx("ListTable")}>
                            {
                                allTable ?
                                    allTable.data.map((data, index) => {
                                        return (
                                            <Tippy
                                                render={attrs => (
                                                    <div className={cx("box")} tabIndex="-1" {...attrs}>
                                                        <div className={cx("btn_orderTable")}
                                                            onClick={(event) => {
                                                                setIsAuthentication(true)
                                                            }}
                                                        >
                                                            <button
                                                            >
                                                                Ghép
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                                interactive={true}
                                                placement={"bottom"}
                                                key={index}
                                            >
                                                <div className={cx("ListTable__Item")}>
                                                    <span>{data.name}</span>
                                                </div>
                                            </Tippy>
                                        )
                                    })
                                    : ''
                            }


                        </div>
                    </div>

                </div>
                : ''

        } */}
        {
            isConfirmCombine ?
                <div className={cx("authentication")}>
                    <div className={cx("authentication__Item")}>
                        <span>Xác nhận ghép đơn</span>
                        <div className={cx("authentication__Item__btn")}>
                            <div
                                onClick={(event) => {
                                    handleConfirmOrder(requestUpdateFood, setIsConfirmCombine)
                                }}
                            >
                                <button
                                    className={cx("authentication__Item__btn__Profile")}
                                >Xác nhận</button>
                            </div>
                            <div
                                onClick={(event) => {
                                    setIsConfirmCombine(false)
                                }}
                            >
                                <button
                                    className={cx("authentication__Item__btn__home")}

                                >Hủy</button>
                            </div>
                        </div>
                    </div>
                </div>
                : ''
        }

    </>
}
export default OrderFood