import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { getBrands } from "../../../axios/callApi";
import { getAllBranch, getFoodAll } from "../../../axios/meThodPost";
import { handleChangeStatus, handleCreateTable, handleFindAdmin, handleGetAllTable, handleUpdateTable } from "../../../handleEvent/handleEvent";
import HeaderSystem from "../HeaderSystem/HeaderSystem";
import styles from './Tablesystem.module.scss'
const cx = classNames.bind(styles)
function TableSystem() {
    const [allFood, setAllFood] = useState('')
    const [getBrand, setGetBarnd] = useState('')
    const [currentBranch, setCurrentBranch] = useState('')
    const [currentTable, setCurrentTable] = useState('')
    const [allTable, setAllTable] = useState('')
    const [isCreateUser, setIsCreateUser] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [requestCreate, setRequestCreate] = useState({
        restaurantId: process.env.REACT_APP_RESTAURANTID,
        branchId: '',
        name: '',
        description: '',
        totalSlot: ''
    })
    const [requestUpdate, setRequestUpdate] = useState({
        name: '',
        description: '',
        total_slot: ''
    })
    const userLogin = useSelector(state => state.rootLoginReducer.user)
    console.log(userLogin)
    const navigate = useNavigate()
    console.log(allTable)
    useEffect(() => {
        // getFoodAll(setAllFood)
        getAllBranch(setGetBarnd)
    }, [])
    console.log(getBrand)
    return <div className={cx("wrapperTableSystem")}>
        <HeaderSystem />
        <div className={cx("TableSystemHeading")}>
            <span>Quản Lý Bàn</span>
        </div>
        <div className={cx("container__btn")}>
            <div className={cx("createUser")}
                onClick={() => {
                    setIsCreateUser(true)
                }
                }
            >
                <FontAwesomeIcon icon={faPlus} />
                <span>Thêm Bàn</span>
            </div>
            <Tippy
                render={attrs => (
                    <div className="box" tabIndex="-1" {...attrs}>
                        {
                            getBrand ?
                                getBrand.data.map((data, index) => {
                                    if (userLogin) {
                                        if (data.branchId == userLogin.branchId) {
                                            return (
                                                <div className={cx("box__Item")} key={index}
                                                    onClick={() => {
                                                        setCurrentBranch(data)
                                                        if (userLogin) {
                                                            handleGetAllTable(userLogin.employeeId, setAllTable)
                                                        }
                                                    }}
                                                >
                                                    <span>{data.name}</span>
                                                </div>
                                            )
                                        }
                                    }
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

                    }
                    }
                    style={{ backgroundColor: 'var(--table)' }}
                >
                    <span>{currentBranch ? currentBranch.name : 'Chi Nhánh'}</span>
                </div>
            </Tippy>
        </div>
        <div className={cx("TableSytem")}>
            <table style={{ width: "100%" }}>
                <tbody>

                    <tr>
                        <th>Tên Bàn</th>
                        <th>Ghi Chú</th>
                        <th>Chỗ Ngồi</th>
                        <th>Chi Tiết</th>
                        <th>Trạng Thái</th>
                        <th>Action</th>
                    </tr>
                    {
                        allTable ?
                            allTable.data.map((resource, index) => {
                                return (
                                    <tr key={index}>

                                        <td>{resource.name
                                        }</td>
                                        <td >{resource.description}</td>
                                        <td>{resource.totalSlot}</td>
                                        <td>{resource.description}</td>
                                        <td>{resource.status == 1 ? 'Đã có khách' : 'Không có khách'}
                                            <button
                                                className={cx(resource.status == 1 ? "action" : '')}
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
                                                    handleChangeStatus(resource.tableId, userLogin.employeeId, setAllTable)
                                                }}
                                            >{resource.status == 1 ? 'tắt' : 'bật'}</button>
                                        </td>
                                        <td>
                                            <div className={cx("tableUser__Icon")} key={index}>
                                                <FontAwesomeIcon icon={faPenToSquare} onClick={() => {
                                                    setCurrentTable(resource)
                                                    setRequestUpdate({
                                                        name: resource.name,
                                                        description: resource.description,
                                                        total_slot: resource.total_slot
                                                    })
                                                    setIsUpdate(true)
                                                }} />
                                                <FontAwesomeIcon icon={faTrash}
                                                    onClick={() => {

                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                            : ''
                    }


                </tbody>

            </table>
        </div>

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
                            <span>Thêm Bàn</span>
                        </div>

                        <Form className={cx("boxupdate__Item")}>
                            <div className={cx("roidId")}>
                                <span>Chi Nhánh</span>
                                <select id="BRAND" name="CHI NHÁNH"
                                    onChange={(event) => {
                                        setRequestCreate({
                                            ...requestCreate,
                                            branchId: event.target.value
                                        })
                                    }}
                                >
                                    <option >Chọn Chi Nhánh</option>
                                    {
                                        getBrand ?
                                            getBrand.data.map((data, index) => {
                                                if (userLogin) {
                                                    if (data.branchId == userLogin.branchId) {
                                                        return (
                                                            <option value={data.branchId} key={index}>{data.name}</option>
                                                        )
                                                    }
                                                }
                                            })
                                            : ''
                                    }
                                </select>
                            </div>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Tên Bàn</Form.Label>
                                <Form.Control className="mb-3__Input" type="FirstName"
                                    onChange={(event) => {
                                        setRequestCreate({
                                            ...requestCreate,
                                            name: event.target.value
                                        })
                                    }}
                                />


                            </Form.Group>

                        </Form>
                        <Form className={cx("boxupdate__Item")}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Mô Tả</Form.Label>
                                <Form.Control className="mb-3__Input" type="LastName"
                                    onChange={(event) => {
                                        setRequestCreate({
                                            ...requestCreate,
                                            description: event.target.value
                                        })
                                    }}
                                />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Số Lượng</Form.Label>
                                <Form.Control className="mb-3__Input" type="LastName"
                                    onChange={(event) => {
                                        setRequestCreate({
                                            ...requestCreate,
                                            totalSlot: event.target.value
                                        })
                                    }}
                                />

                            </Form.Group>

                        </Form>

                        <Button variant="primary"
                            onClick={(event) => {
                                if (!requestCreate.name || !requestCreate.branchId || !requestCreate.description || !requestCreate.totalSlot) {
                                    toast.error('Vui Lòng điền đầy đủ thông tin !!', {
                                        position: toast.POSITION.TOP_RIGHT
                                    });
                                } else {
                                    handleCreateTable(requestCreate)
                                }
                            }}
                        >
                            Tạo Bàn
                        </Button>
                    </div>
                </div> : ''
        }
        {
            isUpdate ?
                <div className={cx("Containerupdate")}
                >
                    <div className={cx("Containerupdate__Blur")}
                        onClick={() => {
                            setIsUpdate(false)
                        }}
                    >
                    </div>
                    <div className={cx("Containerupdate__Xmark")}
                        onClick={() => {
                            setIsUpdate(false)
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <div className={cx("boxupdate")}>
                        <div className={cx("boxupdate__title")}>
                            <span>Cập Nhật Thông Tin</span>
                        </div>
                        <Form className={cx("boxupdate__Item")}>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Tên</Form.Label>
                                <Form.Control className="mb-3__Input" type="LastName" placeholder={currentTable ? currentTable.name : ''}
                                    onChange={(event) => {
                                        if (!event.target.value) {
                                            setRequestUpdate({
                                                ...requestUpdate,
                                                name: currentTable.name
                                            })
                                        } else {
                                            setRequestUpdate({
                                                ...requestUpdate,
                                                name: event.target.value
                                            })
                                        }
                                    }}
                                />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Mô Tả</Form.Label>
                                <Form.Control className="mb-3__Input" type="LastName" placeholder={currentTable ? currentTable.description : ''}
                                    onChange={(event) => {
                                        if (!event.target.value) {
                                            setRequestUpdate({
                                                ...requestUpdate,
                                                description: currentTable.description
                                            })
                                        } else {
                                            setRequestUpdate({
                                                ...requestUpdate,
                                                description: event.target.value
                                            })
                                        }
                                    }}
                                />

                            </Form.Group>
                        </Form>

                        <Form className={cx("boxupdate__Item")}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Số Lượng</Form.Label>
                                <Form.Control className="mb-3__Input" type="LastName" placeholder={currentTable ? currentTable.total_slot : ''}
                                    onChange={(event) => {
                                        if (!event.target.value) {
                                            setRequestUpdate({
                                                ...requestUpdate,
                                                total_slot: currentTable.totalSlot
                                            })
                                        } else {
                                            setRequestUpdate({
                                                ...requestUpdate,
                                                total_slot: event.target.value
                                            })
                                        }
                                    }}
                                />

                            </Form.Group>

                        </Form>

                        <Button variant="primary"
                            onClick={(event) => {
                                handleUpdateTable(currentTable.tableId, requestUpdate, setIsUpdate)
                            }}
                        >
                            Cập Nhật
                        </Button>
                    </div>
                </div>
                : ''
        }
        <ToastContainer></ToastContainer>
    </div>
}
export default TableSystem