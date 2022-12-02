import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { getAllBranch } from "../../../axios/meThodPost";
import { handleCreateMaterial, handleGetEmployee, handleGetListMaterial, handleUpdateMaterial } from "../../../handleEvent/handleEvent";
import HeaderSystem from "../HeaderSystem/HeaderSystem";
import styles from './MaterialSytem.module.scss'
const cx = classNames.bind(styles)
function MaterialSystem() {
    const [getAllBranchAPi, setGetAllBranchApi] = useState('')
    const [currentBrand, setCurrentBrand] = useState('')
    const [AllMaterial, setAllMaterial] = useState('')
    const [isMaterial, setIsMaterial] = useState(false)
    const [requestMaterial, setRequetMaterial] = useState({
        restaurantId: process.env.REACT_APP_RESTAURANTID,
        branchId: '',
        code: '',
        name: '',
        cost: '',
        type: '',
        stockEnd: '',
        whereProduction: ''
    })
    const [requestUpdate, setRequesUpdate] = useState({
        restaurantId: process.env.REACT_APP_RESTAURANTID,
        branchId: '',
        code: '',
        name: '',
        cost: '',
        type: '',
        stockEnd: '',
        whereProduction: ''
    })
    const [isUpdate, setIsUpdate] = useState(false)
    const [currentMaterial, setCurrentMaterial] = useState('')
    const userRedux = useSelector(state => state.rootLoginReducer.user)
    console.log(AllMaterial)
    useEffect(() => {
        getAllBranch(setGetAllBranchApi)
    }, [])
    return <div className={cx('wrapperMaterialSystem')}>
        <HeaderSystem />
        <div className={cx("FoodSystemHeading")}>
            <span>Quản Lý Nguyên Liệu</span>
        </div>
        <div className={cx("createUser")}
            onClick={() => {
                setIsMaterial(true)
            }
            }
        >
            <FontAwesomeIcon icon={faPlus} />
            <span>Thêm Nguyên Liệu</span>
        </div>
        <Tippy
            render={attrs => (
                <div className={cx("box")} tabIndex="-1" {...attrs}>
                    {
                        getAllBranchAPi ? getAllBranchAPi.data.map((data, index) => {
                            if (userRedux) {
                                if (data.branchId == userRedux.branchId) {
                                    return (
                                        <div className={cx("box__Item")} key={index}
                                            onClick={() => {
                                                setCurrentBrand(data)
                                                handleGetListMaterial(setAllMaterial, data.branchId)
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
                <span>{currentBrand ? currentBrand.name : 'Chi Nhánh'}</span>
            </div>
        </Tippy>
        <div className={cx("systemTable")}>
            <table style={{ width: "100%" }}>
                <tbody>

                    <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Name</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Loại</th>
                        <th scope="col">Số Lượng</th>
                        <th scope="col">Giới hạn</th>
                        <th scope="col">Nơi Sản Xuất</th>
                        <th scope="col">Action</th>
                    </tr>

                    {
                        AllMaterial ? AllMaterial.data.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{data.code}</td>
                                    <td >{data.name}</td>
                                    <td>{data.cost}</td>
                                    <td>{data.type}</td>
                                    <td>{data.quantity}</td>
                                    <td>{data.stockEnd}</td>
                                    <td>{data.whereProduction}</td>
                                    <td><div className={cx("tableUser__Icon")}
                                        onClick={(event) => {
                                            setCurrentMaterial(data)
                                            setRequesUpdate({
                                                ...requestUpdate,
                                                branchId: data.branchId
                                            })
                                            setIsUpdate(true)
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} onClick={() => {

                                        }} />
                                    </div></td>
                                </tr>

                            )
                        }) : ''
                    }

                </tbody>

            </table>
        </div>
        {
            isMaterial ?
                <div className={cx("Containerupdate")}
                >
                    <div className={cx("Containerupdate__Blur")}
                        onClick={() => {
                            setIsMaterial(false)
                        }}
                    >
                    </div>
                    <div className={cx("Containerupdate__Xmark")}
                        onClick={() => {
                            setIsMaterial(false)
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <div className={cx("Containerupdate")}>
                        <div className={cx("Containerupdate__Blur")}
                            onClick={() => {
                                setIsMaterial(false)
                            }}
                        >
                        </div>
                        <div className={cx("Containerupdate__Xmark")}
                            onClick={() => {

                            }}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                        <div className={cx("boxupdate")}>
                            <div className={cx("boxupdate__title")}>
                                <span>Thêm Nguyên Liệu</span>
                            </div>
                            <Form className={cx("boxupdate__Item")}>
                                <Form.Group className="mb-3" controlId="formBasicPassword">

                                    <Form.Label>Chi Nhánh</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        onChange={(event) => {
                                            // handleGetEmployee(event.target.value, requestMaterial, setRequetMaterial)
                                            setRequetMaterial({
                                                ...requestMaterial,
                                                branchId: event.target.value
                                            })
                                        }}
                                    >
                                        <option>Chọn Chi Nhánh</option>
                                        {
                                            getAllBranchAPi ?
                                                getAllBranchAPi.data.map((data, index) => {
                                                    if (userRedux) {
                                                        if (data.branchId == userRedux.branchId) {
                                                            return <option value={data.branchId}>{data.name}</option>
                                                        }
                                                    }
                                                })
                                                :
                                                ''
                                        }

                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Phân Loại</Form.Label>
                                    <Form.Control className="mb-3__Input" type="LastName"
                                        onChange={(event) => {
                                            setRequetMaterial({
                                                ...requestMaterial,
                                                type: event.target.value
                                            })
                                        }}
                                    />

                                </Form.Group>
                            </Form>
                            <Form className={cx("boxupdate__Item")}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Code</Form.Label>
                                    <Form.Control className="mb-3__Input" type="FirstName"
                                        onChange={(event) => {
                                            setRequetMaterial({
                                                ...requestMaterial,
                                                code: event.target.value
                                            })
                                        }}
                                    />


                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Tên</Form.Label>
                                    <Form.Control className="mb-3__Input" type="LastName"
                                        onChange={(event) => {
                                            setRequetMaterial({
                                                ...requestMaterial,
                                                name: event.target.value
                                            })
                                        }}
                                    />

                                </Form.Group>
                            </Form>
                            <Form className={cx("boxupdate__Item")}>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Giá</Form.Label>
                                    <Form.Control className="mb-3__Input" type="LastName"
                                        onChange={(event) => {
                                            setRequetMaterial({
                                                ...requestMaterial,
                                                cost: event.target.value
                                            })
                                        }}
                                    />

                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Nơi Sản Xuất</Form.Label>
                                    <Form.Control className="mb-3__Input" type="LastName"
                                        onChange={(event) => {
                                            setRequetMaterial({
                                                ...requestMaterial,
                                                whereProduction: event.target.value
                                            })
                                        }}
                                    />

                                </Form.Group>

                            </Form>
                            <Form className={cx("boxupdate__Item")}>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Giới hạn hết hàng</Form.Label>
                                    <Form.Control className="mb-3__Input" type="LastName"
                                        onChange={(event) => {
                                            setRequetMaterial({
                                                ...requestMaterial,
                                                stockEnd: event.target.value
                                            })
                                        }}
                                    />

                                </Form.Group>


                            </Form>

                            <Button variant="primary"
                                onClick={(event) => {
                                    if (!requestMaterial.employeeId || !requestMaterial.cost || !requestMaterial.code || !requestMaterial.name || !requestMaterial.type || !requestMaterial.where_production) {
                                        toast.error('Vui Lòng điền đầy đủ thông tin', {
                                            position: toast.POSITION.TOP_RIGHT
                                        });
                                    }
                                    handleCreateMaterial(requestMaterial, setIsMaterial)
                                }}
                            >
                                Thêm Nguyên Liệu
                            </Button>
                        </div>
                    </div>
                </div>
                : ''
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
                                <Form.Control className="mb-3__Input" type="LastName" placeholder={currentMaterial.name}
                                    onChange={(event) => {
                                        if (!event.target.value) {
                                            setRequesUpdate({
                                                ...requestUpdate,
                                                name: currentMaterial ? currentMaterial.name : ''
                                            })
                                        } else {
                                            setRequesUpdate({
                                                ...requestUpdate,
                                                name: event.target.value
                                            })
                                        }
                                    }}
                                />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Phân Loại</Form.Label>
                                <Form.Control className="mb-3__Input" type="LastName" placeholder={currentMaterial.type}
                                    onChange={(event) => {
                                        if (!event.target.value) {
                                            setRequesUpdate({
                                                ...requestUpdate,
                                                type: currentMaterial ? currentMaterial.type : ''
                                            })
                                        }
                                        else {
                                            setRequesUpdate({
                                                ...requestUpdate,
                                                type: event.target.value
                                            })
                                        }
                                    }}
                                />

                            </Form.Group>
                        </Form>

                        <Form className={cx("boxupdate__Item")}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Giá</Form.Label>
                                <Form.Control className="mb-3__Input" type="LastName" placeholder={currentMaterial.cost}
                                    onChange={(event) => {
                                        if (!event.target.value) {
                                            setRequesUpdate({
                                                ...requestUpdate,
                                                cost: currentMaterial ? currentMaterial.cost : ''
                                            })
                                        }
                                        else {
                                            setRequesUpdate({
                                                ...requestUpdate,
                                                cost: event.target.value
                                            })
                                        }
                                    }}
                                />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Code</Form.Label>
                                <Form.Control className="mb-3__Input" type="LastName" placeholder={currentMaterial.code}
                                    onChange={(event) => {
                                        if (!event.target.value) {
                                            setRequesUpdate({
                                                ...requestUpdate,
                                                code: currentMaterial ? currentMaterial.code : ''
                                            })
                                        }
                                        else {
                                            setRequesUpdate({
                                                ...requestUpdate,
                                                code: event.target.value
                                            })
                                        }
                                    }}
                                />

                            </Form.Group>
                        </Form>
                        <Form className={cx("boxupdate__Item")}>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Còn Lại</Form.Label>
                                <Form.Control className="mb-3__Input" type="LastName" placeholder={currentMaterial.stockEnd}
                                    onChange={(event) => {
                                        if (!event.target.value) {
                                            setRequesUpdate({
                                                ...requestUpdate,
                                                stockEnd: currentMaterial ? currentMaterial.stockEnd : ''
                                            })
                                        }
                                        else {
                                            setRequesUpdate({
                                                ...requestUpdate,
                                                stockEnd: event.target.value
                                            })
                                        }
                                    }}
                                />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Nơi Sản Xuất</Form.Label>
                                <Form.Control className="mb-3__Input" type="LastName" placeholder={currentMaterial.whereProduction}
                                    onChange={(event) => {
                                        if (!event.target.value) {
                                            setRequesUpdate({
                                                ...requestUpdate,
                                                whereProduction: currentMaterial ? currentMaterial.where_production : ''
                                            })
                                        }
                                        else {
                                            setRequesUpdate({
                                                ...requestUpdate,
                                                whereProduction: event.target.value
                                            })
                                        }
                                    }}
                                />

                            </Form.Group>
                        </Form>
                        <Form className={cx("boxupdate__Item")}>

                        </Form>

                        <Button variant="primary"
                            onClick={(event) => {
                                handleUpdateMaterial(requestUpdate)
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
export default MaterialSystem