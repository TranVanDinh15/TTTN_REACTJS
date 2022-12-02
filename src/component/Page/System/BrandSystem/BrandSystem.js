import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getBrands } from "../../../axios/callApi";
import { createBranch, createBrand, getAllBranch, getRestaurant } from "../../../axios/meThodPost";
import HeaderSystem from "../HeaderSystem/HeaderSystem";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './BrandSystem.module.scss'
import { handleChangerStatusBranch, handleDeleteBrand, handleStatusBrand, handleUpdateBrand } from "../../../handleEvent/handleEvent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
const cx = classNames.bind(styles)
function BrandSystem() {
    const navigate = useNavigate()
    const [isDelete, setIsDelete] = useState(false)
    const [isUpdate, setUpdate] = useState(false)
    const [getBranch, setGetBranch] = useState('')
    // const [getRestaurants, setGetResTaurants] = useState('')
    const [currentBrand, setCurrentBrand] = useState('')
    const [dataPostBrand, setDataPostBrand] = useState({
        street: '',
        name: '',
        address: '',
        phone: '',
        restaurantId: process.env.REACT_APP_RESTAURANTID
    })
    const [requestUpdate, setRequestUpdate] = useState({
        name: '',
        address: '',
        phone: '',
        street: ''
    })
    const [cache, setCache] = useState('')
    const [statusBranch, setStatusBranch] = useState('')
    console.log(currentBrand)
    const hanldeCreateBrand = async (event) => {
        event.preventDefault()
        if (!dataPostBrand.address || !dataPostBrand.street || !dataPostBrand.name || !dataPostBrand.phone) {
            toast.error("Vui Lòng Nhập Đầy Đủ Thông Tin !", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            const respone = await createBranch(dataPostBrand)
            if (respone.status == 200) {
                toast.success(respone.data, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
    }
    console.log(getBranch)
    useEffect(() => {
        getAllBranch(setGetBranch)
    }, [isUpdate || isDelete])
    const userLogin = useSelector(state => state.rootLoginReducer.user)
    return <div className={cx('wrapperBrandSystem')}>
        {
            // userLogin !== {} && (userLogin.user && userLogin.user.roidId == process.env.REACT_APP_ADMIN_KEY) ?
            <div className={cx('wrapperBrandSystem__Container')}>
                <HeaderSystem />
                <div className={cx('wrapperBrandSystem__Heading')}>
                    <span

                    >Quản Lý Chi Nhánh</span>
                </div>
                <div className={cx('restaurantDetail')}>
                    <span></span>
                </div>
                <div className={cx('createBrand')}>
                    <button>Thêm Chi Nhánh</button>
                </div>
                <div className={cx('wrapperBrandSystem__Table')}>
                    <table className={cx("table")}>
                        <tbody>
                            <tr>
                                <th >Chi Nhánh</th>
                                <th >Địa Chỉ</th>
                                <th >Số Điện Thoại</th>
                                <th >treet</th>
                                <th>Trạng Thái Hoạt Động</th>
                                <th >Action</th>
                            </tr>
                            {
                                getBranch ?
                                    getBranch.data.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{data.name}</td>
                                                <td>{data.address}</td>
                                                <td>{data.phone}</td>
                                                <td>{data.street}</td>
                                                <td>{data.status == 1 ? "Đang hoạt động" : "Đóng cửa"}
                                                    <button
                                                        className={cx(data.status == 1 ? "action" : '')}
                                                        style={{
                                                            padding: "2px 10px",
                                                            marginLeft: "10px",
                                                            cursor: "pointer",
                                                            float: "right",
                                                            backgroundColor: "#7D3CFF ",
                                                            color: "var(--white)",
                                                            border: "none"
                                                        }}
                                                        onClick={(event) => {
                                                            event.preventDefault()
                                                            // handleChangerStatusFood(resource.foodId, userRedux.branchId, setAllFood)
                                                            handleChangerStatusBranch(data.branchId, setGetBranch)
                                                        }}
                                                    >{data.status == 1 ? 'tắt' : 'bật'}</button>
                                                </td>
                                                <td><div className={cx("tableUser__Icon")} key={index}>
                                                    <FontAwesomeIcon icon={faPenToSquare} onClick={() => {
                                                        setCurrentBrand(data)
                                                        setUpdate(true)
                                                        setRequestUpdate({
                                                            name: data.name,
                                                            address: data.address,
                                                            phone: data.phone,
                                                            street: data.street
                                                        })

                                                    }} />
                                                    <FontAwesomeIcon icon={faTrash}
                                                        onClick={() => {
                                                            setCurrentBrand(data)
                                                            setIsDelete(true)
                                                        }}
                                                    />
                                                </div></td>
                                            </tr>
                                        )
                                    })
                                    : ''
                            }


                        </tbody>
                    </table>
                </div>
                <div className={cx("FormCreateTable")}>
                    <div className={cx("TableSystemHeading")}>
                        <span>Thêm Chi Nhánh</span>
                    </div>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label form="inputPassword4" className="form-label">Tên Chi Nhánh</label>
                            <input className="form-control" id="inputPassword4"
                                value={dataPostBrand.name}
                                onChange={(event) => {
                                    setDataPostBrand({
                                        ...dataPostBrand,
                                        name: event.target.value
                                    })
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label form="inputPassword4" className="form-label">Địa Chỉ</label>
                            <input className="form-control" id="inputPassword4"
                                value={dataPostBrand.address}
                                onChange={(event) => {
                                    setDataPostBrand({
                                        ...dataPostBrand,
                                        address: event.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className="col-md-6">
                            <label form="inputAddress" className="form-label">Đường</label>
                            <input type="text" className="form-control" id="inputAddress" value={dataPostBrand.brandId}
                                onChange={(event) => {
                                    setDataPostBrand({
                                        ...dataPostBrand,
                                        street: event.target.value
                                    })
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label form="inputAddress" className="form-label">Số Điện Thoại</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="Chi tiêt, thông tin , ghi chú bàn"
                                value={dataPostBrand.phone}
                                onChange={(event) => {
                                    setDataPostBrand({
                                        ...dataPostBrand,
                                        phone: event.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className="col-12">
                            <button className="btn btn-primary"
                                onClick={(event) => {
                                    hanldeCreateBrand(event)
                                }}
                            >Thêm Chi Nhánh</button>
                        </div>
                    </form>
                </div>
                {
                    isUpdate ?
                        <div className={cx("Containerupdate")}
                        >
                            <div className={cx("Containerupdate__Blur")}
                                onClick={() => {
                                    setUpdate(false)
                                }}
                            >
                            </div>
                            <div className={cx("Containerupdate__Xmark")}
                                onClick={() => {
                                    setUpdate(false)
                                }}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                            <div className={cx("boxupdate")}>
                                <div className={cx("boxupdate__title")}>
                                    <span>Cập Nhật Thông Tin</span>
                                </div>
                                <Form className={cx("boxupdate__Item")}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Tên</Form.Label>
                                        <Form.Control className="mb-3__Input" type="FirstName" placeholder={currentBrand ? currentBrand.name
                                            : ''}
                                            onChange={(event) => {
                                                if (event.target.value) {
                                                    setRequestUpdate({
                                                        ...requestUpdate,
                                                        name: event.target.value
                                                    })
                                                }
                                                if (!event.target.value) {
                                                    setRequestUpdate({
                                                        ...requestUpdate,
                                                        name: currentBrand.name
                                                    })
                                                }
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Địa Chỉ</Form.Label>
                                        <Form.Control className="mb-3__Input" type="LastName" placeholder={currentBrand ? currentBrand.address : ''}
                                            onChange={(event) => {
                                                if (event.target.value) {
                                                    setRequestUpdate({
                                                        ...requestUpdate,
                                                        address: event.target.value
                                                    })
                                                }
                                                if (!event.target.value) {
                                                    setRequestUpdate({
                                                        ...requestUpdate,
                                                        address: currentBrand.address
                                                    })
                                                }
                                            }}
                                        />
                                    </Form.Group>
                                </Form>
                                <Form className={cx("boxupdate__Item")}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Số điện thoại</Form.Label>
                                        <Form.Control className="mb-3__Input" type="Address" placeholder={currentBrand.phone
                                        }
                                            onChange={(event) => {
                                                if (event.target.value) {
                                                    setRequestUpdate({
                                                        ...requestUpdate,
                                                        phone: event.target.value
                                                    })
                                                }
                                                if (!event.target.value) {
                                                    setRequestUpdate({
                                                        ...requestUpdate,
                                                        phone: currentBrand.phone
                                                    })
                                                }
                                            }}
                                        />

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Đường</Form.Label>
                                        <Form.Control className="mb-3__Input" type="Address" placeholder={currentBrand.street
                                        }
                                            onChange={(event) => {
                                                if (event.target.value) {
                                                    setRequestUpdate({
                                                        ...requestUpdate,
                                                        street: event.target.value
                                                    })
                                                }
                                                if (!event.target.value) {
                                                    setRequestUpdate({
                                                        ...requestUpdate,
                                                        street: currentBrand.street
                                                    })
                                                }
                                            }}
                                        />

                                    </Form.Group>
                                </Form>

                                <Button variant="primary"
                                    onClick={() => {
                                        handleUpdateBrand(currentBrand.branchId
                                            , requestUpdate, setUpdate, setGetBranch)
                                    }}
                                >
                                    Cập Nhật
                                </Button>
                            </div>
                        </div> : ''
                }
            </div>
            // : toast.warn("Bạn Cần Đăng Nhập Với Quyền Quản Trị Viên !!", {
            //     position: toast.POSITION.TOP_RIGHT
            // })
        }
        {
            isDelete ?
                <div className={cx('agree')}>
                    <div className={cx('agree__Box')}>
                        <span>Bạn có muốn xóa</span>
                        <div className={cx('agree__Box__btn')}>
                            <button
                                onClick={(event) => {
                                    event.preventDefault()
                                    handleDeleteBrand(currentBrand, setIsDelete)
                                }}
                            >Xóa</button>
                            <button
                                onClick={() => {
                                    setIsDelete(false)
                                }}
                            >Hủy</button>
                        </div>
                    </div>

                </div>
                : ''
        }
        <ToastContainer />
    </div>
}
export default BrandSystem