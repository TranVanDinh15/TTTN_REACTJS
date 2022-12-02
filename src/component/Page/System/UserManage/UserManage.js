
import { faPlus, faRightFromBracket, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from './UseManage.module.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './UseManage.css'
import { useEffect, useState } from "react";
import { getBrands, getALlUsers } from "../../../axios/callApi";
import { useNavigate } from "react-router";

import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import HeaderSystem from "../HeaderSystem/HeaderSystem";
import { handleCreateUserPost, hanleDeleteUser, hanleUpdateUser } from "../../../handleEvent/handleEvent";
import { ToastContainer } from "react-toastify";
import Tippy from "@tippyjs/react/headless";
import { createUserBrands, getAllBranch, getListUser } from "../../../axios/meThodPost";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles)
function UserManage() {
    // State hiện form update
    const [isUpdate, setUpdate] = useState(false)
    const [isCreateUser, setIsCreateUser] = useState(false)
    const [allBrands, setAllBrand] = useState('')
    const [allUsers, setAllUser] = useState('')
    const [requestUser, setRequestUser] = useState({
        restaurantId: process.env.REACT_APP_RESTAURANTID,
        branchId: '',
        firstName: '',
        lastName: '',
        fullName: '',
        gender: 'Nam',
        dateOfbirth: '',
        email: '',
        phone: '',
        role: process.env.REACT_APP_KEY_CASHIER,
        city: '',
        district: '',
        address: '',
        password: '',

    })
    const [requestUpdate, setRequestUpdate] = useState({
        firstName: "",
        lastName: "",
        fullName: "",
        gender: "",
        dateOfbirth: "",
        email: "",
        phone: "",
        role: "",
        city: "",
        district: "",
        address: ""
    })
    const [role, setRole] = useState([
        {
            name: 'Admin',
            key: process.env.REACT_APP_KEY_ADMIN
        },
        {
            name: 'Nhân Viên',
            key: process.env.REACT_APP_KEY_CASHIER
        },
        {
            name: 'Bếp',
            key: process.env.REACT_APP_KEY_KITCHEN
        },
        {
            name: 'Kế Toán',
            key: process.env.REACT_APP_KEY_ACCOUNTANT
        },
    ])
    const [currentUser, setCurrentUser] = useState('')
    const [nameBranch, setNameBranch] = useState('')
    const [isErrMessage, setIsErrMessage] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const userRedux = useSelector(state => state.rootLoginReducer.user)
    console.log(requestUpdate)
    const navigate = useNavigate()
    useEffect(() => {
        getAllBranch(setAllBrand)

    }, [isCreateUser])
    console.log(requestUser)
    console.log(process.env.REACT_APP_KEY_ACCOUNTANT)
    // xử lý  khi click vào nút thêm người dùng
    const handleCreateUser = (setIsCreateUser) => {
        if (isCreateUser === true) {
            setIsCreateUser(false)
        } else {
            setIsCreateUser(true)
        }
    }
    return <div className={cx("wrapperUserManage")}>
        <HeaderSystem />
        <div className={cx("UserSystem")}>
            <div className={cx("titleSystem")}>
                <span>Quản Lý Người Dùng</span>
            </div>
            <div className={cx("createUser")}
                onClick={() => {
                    handleCreateUser(setIsCreateUser)
                }
                }
            >
                <FontAwesomeIcon icon={faPlus} />
                <span>Thêm người dùng</span>
            </div>
            <Tippy
                render={attrs => (
                    <div className={cx('box')} tabIndex="-1" {...attrs}>
                        {
                            allBrands ?
                                allBrands.data.map((data, index) => {
                                    // if (data.branchId == userRedux.branchId) {
                                    return (
                                        <div className={cx('box__Item')}
                                            onClick={() => {
                                                getListUser(setAllUser, data.branchId)
                                                setNameBranch(data)
                                            }}
                                            key={index}
                                        >
                                            <span>{data.name}</span>
                                        </div>
                                    )
                                    // }
                                })
                                : ''
                        }
                    </div>
                )}
                placement={'bottom'}
                interactive={true}
            >
                <div className={cx("createUser")

                }
                    onClick={() => {
                        // handleCreateUser(setIsCreateUser)
                        // navigate('/AddFood')
                    }
                    }
                    style={{ backgroundColor: 'var(--table)' }}
                >
                    {/* <FontAwesomeIcon icon={faPlus} /> */}
                    <span>{nameBranch ? nameBranch.name : 'Chi Nhánh'}</span>
                </div>
            </Tippy>

            <div className={cx("tableUser")}>
                <table style={{ width: "100%" }}>
                    <tbody>
                        <tr
                        >
                            <th>Quyền</th>
                            <th>Email</th>
                            <th>Tên</th>
                            <th>Giới Tính</th>
                            <th>Địa chỉ</th>
                            <th>phone</th>
                            <th>Thao tác</th>
                        </tr>
                        {
                            allUsers ? allUsers.data.data.map((data, index) => {
                                return (
                                    <tr key={index} >
                                        <td>{data.role}</td>
                                        <td className={cx("tableUser__Email")}
                                            style={{
                                                // backgroundColor: "#d4ede5",
                                                backgroundClip: "content-box",
                                                color: "var(--table)",
                                                fontWeight: "600",

                                            }}
                                        >{data.email}</td>
                                        <td>{
                                            data.fullName
                                        }</td>
                                        <td>{
                                            data.gender
                                        }</td>
                                        <td>{data.address}</td>
                                        {/* <td
                                            style={{
                                                // backgroundColor: "#d4ede5",
                                                backgroundClip: "content-box",
                                                color: "var(--profile)",
                                                fontWeight: "600",

                                            }}
                                        >{data.status == 0 ? 'Ngoại tuyến' : 'Đang hoạt động'}</td> */}
                                        <td>{data.phone}</td>

                                        <td>
                                            <div className={cx("tableUser__Icon")} key={index}>
                                                <FontAwesomeIcon icon={faPenToSquare} onClick={() => {
                                                    setCurrentUser(data)
                                                    setRequestUpdate({
                                                        firstName: data.firstName,
                                                        lastName: data.lastName,
                                                        fullName: data.fullName,
                                                        gender: data.gender,
                                                        dateOfbirth: data.dateOfbirth,
                                                        email: data.email,
                                                        phone: data.phone,
                                                        role: data.role,
                                                        city: data.city,
                                                        district: data.district,
                                                        address: data.address,
                                                    })
                                                    setUpdate(true)
                                                }} />
                                                <FontAwesomeIcon icon={faTrash}
                                                    onClick={() => {
                                                        setIsDelete(true)
                                                        setCurrentUser(data)
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                )
                            }) : ''
                        }
                    </tbody>

                </table>
            </div>
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
                                <Form.Label>Họ và tên đệm </Form.Label>
                                <Form.Control className="mb-3__Input" type="FirstName" placeholder={requestUpdate.firstName}
                                    onChange={(event) => {
                                        setRequestUpdate({
                                            ...requestUpdate,
                                            firstName: event.target.value
                                        })
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Tên</Form.Label>
                                <Form.Control className="mb-3__Input" type="LastName" placeholder={requestUpdate.lastName}
                                    onChange={(event) => {
                                        setRequestUpdate({
                                            ...requestUpdate,
                                            lastName: event.target.value
                                        })
                                    }}
                                />

                            </Form.Group>
                        </Form>

                        <Form className={cx("boxupdate__Item")}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Tên Đầy Đủ</Form.Label>
                                <Form.Control className="mb-3__Input" type="LastName" placeholder={requestUpdate.fullName}
                                    onChange={(event) => {
                                        setRequestUpdate({
                                            ...requestUpdate,
                                            fullName: event.target.value
                                        })
                                    }}
                                />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Giới Tính</Form.Label>
                                <div className={cx("roidId")}>
                                    <select id="roid" name="Quyền"
                                        onChange={async (event) => {
                                            setRequestUpdate({
                                                ...requestUpdate,
                                                gender: event.target.value
                                            })
                                        }}
                                    >
                                        <option value={'Nam'}>Nam</option>
                                        <option value={'Nữ'}>Nữ</option>
                                        <option value={'Khác'}>Khác</option>
                                    </select>
                                </div>

                            </Form.Group>
                        </Form>
                        <Form className={cx("boxupdate__Item")}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Ngày Sinh</Form.Label>
                                <Form.Control className="mb-3__Input" type="date" value={requestUpdate.dateOfbirth}
                                    onChange={(event) => {
                                        setRequestUpdate({
                                            ...requestUpdate,
                                            dateOfbirth: event.target.value
                                        })
                                    }}
                                />

                            </Form.Group>
                        </Form>
                        <Form className={cx("boxupdate__Item")}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Thành Phố</Form.Label>
                                <Form.Control className="mb-3__Input" type="Text" placeholder="Ảnh đại diện"
                                    onChange={(event) => {
                                        setRequestUpdate({
                                            ...requestUpdate,
                                            city: event.target.value
                                        })
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Quận  </Form.Label>
                                <Form.Control className="mb-3__Input" type="Text" placeholder={requestUpdate.district}
                                    onChange={(event) => {
                                        setRequestUpdate({
                                            ...requestUpdate,
                                            district: event.target.value
                                        })
                                    }}
                                />
                            </Form.Group>
                        </Form>
                        <Form className={cx("boxupdate__Item")}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control className="mb-3__Input" type="Address" placeholder={requestUpdate.address}
                                    onChange={(event) => {
                                        setRequestUpdate({
                                            ...requestUpdate,
                                            address: event.target.value
                                        })

                                    }}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control className="mb-3__Input" type="Address" placeholder={requestUpdate.phone}
                                    onChange={(event) => {

                                        setRequestUpdate({
                                            ...requestUpdate,
                                            phone: event.target.value
                                        })
                                    }}
                                />
                            </Form.Group>
                        </Form>
                        <Form className={cx("boxupdate__Item")}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control className="mb-3__Input" type="Address" placeholder={requestUpdate.email}
                                    onChange={(event) => {
                                        setRequestUpdate({
                                            ...requestUpdate,
                                            email: event.target.value
                                        })

                                    }}
                                ></Form.Control>

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Role</Form.Label>
                                <Form.Control className="mb-3__Input" type="Text" placeholder={requestUpdate.role}
                                    onChange={(event) => {
                                        setRequestUpdate({
                                            ...requestUpdate,
                                            role: event.target.value
                                        })

                                    }}
                                />
                            </Form.Group>
                        </Form>
                        <Button variant="primary"
                            onClick={(event) => {
                                event.preventDefault()
                                hanleUpdateUser(currentUser.employeeId
                                    , requestUpdate, setUpdate, setAllUser, nameBranch.phone)
                            }}
                        >
                            Cập Nhật
                        </Button>
                    </div>
                </div> : ''
        }
        {
            isCreateUser ?
                <div className={cx("Containerupdate")}
                >
                    <div className={cx("Containerupdate__Blur")}
                        onClick={() => {
                            setIsCreateUser(false)
                        }}
                    >
                    </div>
                    <div className={cx("Containerupdate__Xmark")}
                        onClick={() => {
                            setIsCreateUser(false)
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <div className={cx("boxupdate")}>
                        <div className={cx("boxupdate__title")}>
                            <span>Thêm Nhân Viên</span>
                        </div>
                        <Form className={cx("boxupdate__Item")}>
                            <div className={cx("roidId")}>
                                <span>Quyền</span>
                                <select id="roid" name="Quyền"
                                    onChange={async (event) => {
                                        setRequestUser({
                                            ...requestUser,
                                            role: event.target.value
                                        })
                                    }}
                                >
                                    {
                                        role.map((data, index) => {
                                            return (
                                                <option value={data.key} key={index}>{data.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className={cx("roidId")}>
                                <span>Chi Nhánh</span>
                                <select id="BRAND" name="CHI NHÁNH"
                                    onChange={(event) => {
                                        setRequestUser({
                                            ...requestUser,
                                            branchId: event.target.value
                                        })
                                    }}
                                >
                                    <option >Chọn Chi Nhánh</option>
                                    {
                                        allBrands ?
                                            allBrands.data.map((data, index) => {
                                                // if (data.branchId == userRedux.branchId) {
                                                return (
                                                    <option value={data.branchId} key={index}>{data.name}</option>
                                                )
                                                // }
                                            })
                                            : ''
                                    }
                                </select>
                            </div>

                        </Form>
                        <Form className={cx("boxupdate__Item")}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Họ và tên đệm </Form.Label>
                                <Form.Control className="mb-3__Input" type="FirstName" placeholder="Họ và tên đệm "
                                    onChange={(event) => {
                                        setRequestUser({
                                            ...requestUser,
                                            firstName: event.target.value
                                        })
                                    }}
                                />


                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Tên</Form.Label>
                                <Form.Control className="mb-3__Input" type="LastName" placeholder="Tên của bạn"
                                    onChange={(event) => {
                                        setRequestUser({
                                            ...requestUser,
                                            lastName: event.target.value
                                        })
                                    }}
                                />

                            </Form.Group>
                        </Form>
                        <Form className={cx("boxupdate__Item")}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Tên Đầy Đủ</Form.Label>
                                <Form.Control className="mb-3__Input" type="LastName" placeholder="Tên của bạn"
                                    onChange={(event) => {
                                        setRequestUser({
                                            ...requestUser,
                                            fullName: event.target.value
                                        })
                                    }}
                                />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Giới Tính</Form.Label>
                                <div className={cx("roidId")}>
                                    <select id="roid" name="Quyền"
                                        onChange={async (event) => {
                                            setRequestUser({
                                                ...requestUser,
                                                gender: event.target.value
                                            })
                                        }}
                                    >
                                        <option value={'Nam'}>Nam</option>
                                        <option value={'Nữ'}>Nữ</option>
                                        <option value={'Khác'}>Khác</option>
                                    </select>
                                </div>

                            </Form.Group>
                        </Form>
                        <Form className={cx("boxupdate__Item")}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Ngày Sinh</Form.Label>
                                <Form.Control className="mb-3__Input" type="date" placeholder="Tên của bạn"
                                    onChange={(event) => {
                                        setRequestUser({
                                            ...requestUser,
                                            dateOfbirth: event.target.value
                                        })
                                    }}
                                />

                            </Form.Group>

                        </Form>
                        <Form className={cx("boxupdate__Item")}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Thành Phố</Form.Label>
                                <Form.Control className="mb-3__Input" type="Text" placeholder="Ảnh đại diện"
                                    onChange={(event) => {
                                        setRequestUser({
                                            ...requestUser,
                                            city: event.target.value
                                        })
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Quận  </Form.Label>
                                <Form.Control className="mb-3__Input" type="Text" placeholder="Ảnh đại diện"
                                    onChange={(event) => {
                                        setRequestUser({
                                            ...requestUser,
                                            district: event.target.value
                                        })
                                    }}
                                />
                            </Form.Group>
                        </Form>
                        <Form className={cx("boxupdate__Item")}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control className="mb-3__Input" type="Address" placeholder="Address"
                                    onChange={(event) => {
                                        setRequestUser({
                                            ...requestUser,
                                            address: event.target.value
                                        })

                                    }}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control className="mb-3__Input" type="Address" placeholder="Số điện thoại"
                                    onChange={(event) => {

                                        setRequestUser({
                                            ...requestUser,
                                            phone: event.target.value
                                        })
                                    }}
                                />
                            </Form.Group>
                        </Form>
                        <Form className={cx("boxupdate__Item")}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control className="mb-3__Input" type="Address" placeholder="Email "
                                    onChange={(event) => {
                                        setRequestUser({
                                            ...requestUser,
                                            email: event.target.value
                                        })

                                    }}
                                ></Form.Control>

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Mật Khẩu</Form.Label>
                                <Form.Control className="mb-3__Input" type="Text" placeholder="Mật khẩu"
                                    onChange={(event) => {
                                        setRequestUser({
                                            ...requestUser,
                                            password: event.target.value
                                        })

                                    }}
                                />
                            </Form.Group>
                        </Form>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            {
                                isErrMessage && (!requestUser.address || !requestUser.avatar || !requestUser.brandId || !requestUser.email || !requestUser.firstName || !requestUser.lastName || !requestUser.password || !requestUser.phone || !requestUser.roidId) ?
                                    <Form.Text className="text-muted">
                                        <span style={{ color: 'red', fontSize: '14px' }}>
                                            Vui lòng điền đầy đủ thông tin !!
                                        </span>
                                    </Form.Text>
                                    : ''
                            }
                        </Form.Group>
                        <span className={cx('agree__Box__Add')}
                            onClick={(event) => {
                                handleCreateUserPost(requestUser, setIsCreateUser)
                            }}
                        >
                            Tạo Tài Khoản
                        </span>
                    </div>
                </div> : ''
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
                                    hanleDeleteUser(currentUser.employeeId, setIsDelete)
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
export default UserManage