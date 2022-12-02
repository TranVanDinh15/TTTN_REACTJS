import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { getAllBranch, getAllFood, getFoodAll, getListMaterial } from "../../../axios/meThodPost";
import { handleChangerStatusFood, handleCreateFood, handleGetEmployee, handleGetListFood, handleUpdateFood, hanleDeleteFood } from "../../../handleEvent/handleEvent";
import HeaderSystem from "../HeaderSystem/HeaderSystem";
import styles from './FoodSystem.module.scss'
const cx = classNames.bind(styles)
function FoodSystem() {
    const [allFood, setAllFood] = useState('')
    const [allBranch, setAllBranch] = useState('')
    const [allMaterial, setAllMaterial] = useState('')
    const [currentBranch, setCurrentBranch] = useState('')
    const [currentFood, setCurrentFood] = useState('')
    const [requestCreateFood, setRequestCreateFood] = useState({
        restaurantId: process.env.REACT_APP_RESTAURANTID,
        branchId: '',
        foodId: '',
        name: '',
        price: '',
        type: '',
        image: '',
        material: [],
        status: 1
    }
    )
    const [employeeKichen, setEmployKichen] = useState('')
    const [requestUpdate, setRequestUpdate] = useState({
        restaurantId: process.env.REACT_APP_RESTAURANTID,
        branchId: '',
        foodId: '',
        name: '',
        price: '',
        type: '',
        material: [],
        status: 1

    })
    const [isCheckBox, setIsCheckBox] = useState(false)
    const [isCreate, setIsCreate] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const userRedux = useSelector(state => state.rootLoginReducer.user)
    const navigate = useNavigate()
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const newFileReader = new FileReader()
            newFileReader.readAsDataURL(file)
            newFileReader.onload = () => {
                resolve(newFileReader.result)
            }
            newFileReader.onerror = (error) => {
                reject(error)
            }
        })
    }
    let getBase64 = async (event) => {
        const file = event.target.files[0]
        const base64 = await convertBase64(file)
        setRequestCreateFood({
            ...requestCreateFood,
            image: base64
        })
    }
    useEffect(() => {
        getAllBranch(setAllBranch)
    }, [])
    console.log(requestCreateFood)
    return <div className={cx("wrapperFoodSystem")}>
        <HeaderSystem />
        <div className={cx("FoodSystemHeading")}>
            <span>Quản Lý Món Ăn</span>
        </div>
        <div className={cx("createUser")}
            onClick={() => {
                let r = Math.floor(Math.random() * (36 - 2 + 1) + 2)
                setRequestCreateFood({
                    ...requestCreateFood,
                    foodId: r
                })
                setIsCreate(true)
            }
            }
        >
            <FontAwesomeIcon icon={faPlus} />
            <span>Thêm Món</span>
        </div>
        <Tippy
            render={attrs => (
                <div className="box" tabIndex="-1" {...attrs}>
                    {
                        allBranch ?
                            allBranch.data.map((data, index) => {
                                if (userRedux) {
                                    if (data.branchId == userRedux.branchId) {
                                        return (
                                            <div className={cx("box__Item")}
                                                onClick={() => {
                                                    setCurrentBranch(data)
                                                    // handleGetListFood(data.branchId, setAllFood)
                                                    getAllFood(userRedux.employeeId, setAllFood)
                                                    setRequestUpdate({
                                                        restaurantId: process.env.REACT_APP_RESTAURANTID,
                                                        branchId: '',
                                                        foodId: '',
                                                        name: '',
                                                        price: '',
                                                        type: '',
                                                        material: [],
                                                        status: 1

                                                    })
                                                }}
                                                key={index}
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
                    // handleCreateUser(setIsCreateUser)
                    // navigate('/AddFood')
                }
                }
                style={{ backgroundColor: 'var(--table)' }}
            >
                {/* <FontAwesomeIcon icon={faPlus} /> */}
                <span>{currentBranch ? currentBranch.name : 'Chi Nhánh'}</span>
            </div>
        </Tippy>
        <div className={cx("systemTable")}>
            <table style={{
                width: "100%"
            }}>
                <tbody>
                    <tr>
                        <th scope="col">Tên Món</th>
                        <th scope="col">Phân Loại</th>
                        <th scope="col">Giá Bán</th>
                        <th scope="col">Nguyên Liệu</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col">action</th>
                    </tr>
                    {
                        allFood ?
                            allFood.data.map((resource, index) => {
                                return (
                                    <tr key={index}>

                                        <td>{resource.name}</td>
                                        <td>{resource.type}</td>
                                        <td>{resource.price}</td>
                                        <td>{
                                            resource.material.map((data, index) => {
                                                return (
                                                    <span
                                                        key={index}
                                                    >{data.material} ,</span>
                                                )
                                            })
                                        }</td>
                                        <td>{resource.status == 1 ? "Vẫn còn" : "Đã hết"}
                                            <button
                                                className={cx(resource.status == 1 ? "action" : '')}
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
                                                    handleChangerStatusFood(resource.foodId, userRedux.branchId, setAllFood)
                                                }}
                                            >{resource.status == 1 ? 'tắt' : 'bật'}</button>
                                        </td>
                                        <td><div className={cx("tableUser__Icon")} key={index}>
                                            <FontAwesomeIcon icon={faPenToSquare} onClick={() => {
                                                setIsUpdate(true)
                                                handleGetEmployee(currentBranch.branchId, employeeKichen, setEmployKichen)
                                                setCurrentFood(resource)
                                                setRequestUpdate({
                                                    restaurantId: process.env.REACT_APP_RESTAURANTID,
                                                    branchId: resource.branchId,
                                                    name: resource.name,
                                                    type: resource.type,
                                                    foodId: resource.foodId,
                                                    price: resource.price,
                                                    material: [],
                                                    status: resource.status
                                                })
                                            }} />
                                            <FontAwesomeIcon icon={faTrash}
                                                onClick={() => {
                                                    setCurrentFood(resource)
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
        </div >
        {
            isCreate ?
                <div className={cx("Containerupdate")}
                >
                    < div className={cx("Containerupdate__Blur")}
                        onClick={() => {
                            setIsCreate(false)
                        }
                        }
                    >
                    </div >
                    <div className={cx("Containerupdate__Xmark")}
                        onClick={() => {
                            setIsCreate(false)
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <div className={cx("Containerupdate")}>
                        <div className={cx("Containerupdate__Blur")}
                            onClick={() => {
                                setIsCreate(false)
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
                                <span>Thêm Món</span>
                            </div>
                            <Form className={cx("boxupdate__Item")}>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Chi Nhánh</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        onChange={async (event) => {
                                            setIsCheckBox(false)
                                            setRequestCreateFood({
                                                ...requestCreateFood,
                                                branchId: event.target.value
                                            })
                                        }}
                                    >
                                        <option >Chọn Chi Nhánh</option>
                                        {
                                            allBranch ?
                                                allBranch.data.map((data, index) => {
                                                    if (userRedux) {
                                                        if (data.branchId == userRedux.branchId) {
                                                            return (
                                                                <option value={data.branchId} key={index}>{data.name}</option>
                                                            )
                                                        }
                                                    }
                                                })
                                                : ''
                                        }

                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Phân Loại</Form.Label>
                                    <Form.Control className="mb-3__Input" type="LastName"
                                        onChange={(event) => {
                                            setRequestCreateFood({
                                                ...requestCreateFood,
                                                type: event.target.value
                                            })
                                        }}
                                    />

                                </Form.Group>
                            </Form>
                            <Form className={cx("boxupdate__Item")}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Tên Món</Form.Label>
                                    <Form.Control className="mb-3__Input" type="FirstName"
                                        onChange={(event) => {
                                            setRequestCreateFood({
                                                ...requestCreateFood,
                                                name: event.target.value
                                            })
                                        }}
                                    />


                                </Form.Group>
                                {
                                    requestCreateFood.branchId ?
                                        <div className={cx("box_material")}
                                        >
                                            <div className={cx("box_material__Item")}
                                                onClick={() => {
                                                    if (isCheckBox === true) {
                                                        setIsCheckBox(false)
                                                    } else {
                                                        setIsCheckBox(true)
                                                        getListMaterial(setAllMaterial, requestCreateFood.branchId)
                                                    }
                                                }}
                                            >
                                                <span>Nguyên Liệu</span>
                                                <FontAwesomeIcon icon={faAngleDown} />
                                            </div>
                                            {
                                                isCheckBox ?
                                                    <div className={cx("box_material__CheckBox")}>
                                                        {
                                                            allMaterial ?
                                                                allMaterial.data.map((data, index) => {
                                                                    return (
                                                                        <Form.Check
                                                                            type={"checkbox"}
                                                                            label={data.name}
                                                                            value={data.code}
                                                                            key={index}
                                                                            onClick={(event) => {
                                                                                const code = requestCreateFood.material
                                                                                    .some((data) => {
                                                                                        return data.material === event.target.value
                                                                                    })

                                                                                if (!code) {
                                                                                    setRequestCreateFood({
                                                                                        ...requestCreateFood,
                                                                                        material: [
                                                                                            ...requestCreateFood.material,
                                                                                            {
                                                                                                material: event.target.value,
                                                                                                quantity: 1
                                                                                            }
                                                                                        ]
                                                                                    })
                                                                                } else {
                                                                                    const index = requestCreateFood.material.findIndex((data) => {
                                                                                        return data.material == event.target.value
                                                                                    })
                                                                                    requestCreateFood.material.splice(index, 1)
                                                                                }


                                                                            }}
                                                                        />
                                                                    )
                                                                })
                                                                : ''
                                                        }

                                                    </div>
                                                    : ''
                                            }
                                        </div>
                                        : ''
                                }

                            </Form>
                            <Form className={cx("boxupdate__Item")}>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Giá</Form.Label>
                                    <Form.Control className="mb-3__Input" type="LastName"
                                        onChange={(event) => {
                                            setRequestCreateFood({
                                                ...requestCreateFood,
                                                price: event.target.value
                                            })
                                        }}
                                    />

                                </Form.Group>

                            </Form>
                            <Form className={cx("boxupdate__Item__ImageBox")}>
                                {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Hình Ảnh</Form.Label>
                                    <Form.Control className="mb-3__Input" type="LastName"
                                        onChange={(event) => {
                                            setRequestCreateFood({
                                                ...requestCreateFood,
                                                image: event.target.value
                                            })
                                        }}
                                    />

                                </Form.Group> */}
                                <div className={cx("boxupdate__Item__Image")}>
                                    <img src={requestCreateFood.image ? requestCreateFood.image : ''} />
                                </div>
                                <input type={"file"} onChange={(event) => {
                                    getBase64(event)
                                }} />
                            </Form>

                            <Button variant="primary"
                                onClick={(event) => {
                                    if (!requestCreateFood.branchId || !requestCreateFood.material || !requestCreateFood.name || !requestCreateFood.price || !requestCreateFood.type || !requestCreateFood.foodId || !requestCreateFood.type) {
                                        toast.error('Vui Lòng điền đầy đủ thông tin', {
                                            position: toast.POSITION.TOP_RIGHT
                                        });
                                    }
                                    else {
                                        handleCreateFood(requestCreateFood, setIsCreate)
                                    }
                                }}

                            >
                                Thêm món
                            </Button>
                        </div>
                    </div>
                </div >
                : ''
        }
        {
            isUpdate ?
                <div className={cx("Containerupdate")}
                >
                    <div className={cx("Containerupdate__Blur")}
                        onClick={() => {
                            setIsUpdate(false)
                            setIsCheckBox(false)
                        }}
                    >
                    </div>
                    <div className={cx("Containerupdate__Xmark")}
                        onClick={() => {
                            setIsUpdate(false)
                            setIsCheckBox(false)
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
                                <Form.Control className="mb-3__Input" type="LastName" placeholder={currentFood.name}
                                    onChange={(event) => {
                                        if (!event.target.value) {
                                            setRequestUpdate({
                                                ...requestUpdate,
                                                name: currentFood.name
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
                                <Form.Label>Phân Loại</Form.Label>
                                <Form.Control className="mb-3__Input" type="LastName" placeholder={currentFood.type}
                                    onChange={(event) => {
                                        if (!event.target.value) {
                                            setRequestUpdate({
                                                ...requestUpdate,
                                                type: currentFood.type
                                            })
                                        }
                                        else {
                                            setRequestUpdate({
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
                                <Form.Control className="mb-3__Input" type="LastName" placeholder={currentFood.price}
                                    onChange={(event) => {
                                        if (!event.target.value) {
                                            setRequestUpdate({
                                                ...requestUpdate,
                                                price: currentFood.price
                                            })
                                        }
                                        else {
                                            setRequestUpdate({
                                                ...requestUpdate,
                                                price: event.target.value
                                            })
                                        }
                                    }}
                                />

                            </Form.Group>
                            <div className={cx("box_material")}
                            >
                                <div className={cx("box_material__Item")}
                                    onClick={() => {
                                        if (isCheckBox === true) {
                                            setIsCheckBox(false)
                                        } else {
                                            setIsCheckBox(true)
                                            getListMaterial(setAllMaterial, currentBranch.branchId)
                                        }
                                    }}
                                >
                                    <span>Nguyên Liệu</span>
                                    <FontAwesomeIcon icon={faAngleDown} />
                                </div>
                                {
                                    isCheckBox ?
                                        <div className={cx("box_material__CheckBox")}>
                                            {
                                                allMaterial ?
                                                    allMaterial.data.map((data, index) => {
                                                        return (
                                                            <Form.Check
                                                                type={"checkbox"}
                                                                label={data.name}
                                                                value={data.code}
                                                                key={index}
                                                                onClick={(event) => {
                                                                    const code = requestUpdate.material
                                                                        .some((data) => {
                                                                            return data.material === event.target.value
                                                                        })

                                                                    if (!code) {
                                                                        setRequestUpdate({
                                                                            ...requestUpdate,
                                                                            material: [
                                                                                ...requestUpdate.material,
                                                                                {
                                                                                    material: event.target.value,
                                                                                    quantity: 0.5
                                                                                }
                                                                            ]
                                                                        })
                                                                    } else {
                                                                        const index = requestUpdate.material.findIndex((data) => {
                                                                            return data.material == event.target.value
                                                                        })
                                                                        requestUpdate.material.splice(index, 1)
                                                                    }


                                                                }}
                                                            />
                                                        )
                                                    })
                                                    : ''
                                            }

                                        </div>
                                        : ''
                                }
                            </div>
                        </Form>
                        <Form className={cx("boxupdate__Item")}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Trạng Thái</Form.Label>
                                <Form.Control className="mb-3__Input" type="LastName" placeholder={currentFood.status}
                                    onChange={(event) => {
                                        if (!event.target.value) {
                                            setRequestUpdate({
                                                ...requestUpdate,
                                                status: currentFood.status
                                            })
                                        }
                                        else {
                                            setRequestUpdate({
                                                ...requestUpdate,
                                                status: event.target.value
                                            })
                                        }
                                    }}
                                />

                            </Form.Group>
                        </Form>

                        <Button variant="primary"
                            onClick={(event) => {
                                handleUpdateFood(requestUpdate)
                            }}
                        >
                            Cập Nhật
                        </Button>
                    </div>
                </div>
                : ''
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
                                    hanleDeleteFood(currentFood.foodId, setIsDelete)
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
        <ToastContainer></ToastContainer>
    </div >
}
export default FoodSystem