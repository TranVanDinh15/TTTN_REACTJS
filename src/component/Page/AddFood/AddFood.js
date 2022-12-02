import classNames from "classnames/bind";
import styles from './AddFood.module.scss'
import Header from '../../defaultlayouts/Header/Header'
import Content from "../../defaultlayouts/Content/Content";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddFood.css'
import { useSelector } from "react-redux";
import { useState } from "react";
import { createFoodPost } from "../../axios/meThodPost";
import ToastMessage from "../../Toast/Toast";
import IsLogin from "../../isLogin/isLogin";
import Tippy from "@tippyjs/react/headless";
const cx = classNames.bind(styles)
function AddFood() {
    let currentUser = useSelector(state => state.rootLoginReducer.user)
    const [inforFood, setInforFood] = useState({
        brandId: 'CN1',
        name: '',
        type: 'food',
        cost: '',
        price: '',
        quantity: '',
        avatar: '',
        description: '',
        status: ''
    })
    const [checkRes, setCheckRes] = useState(false)
    const [arraytoast, setArrayToast] = useState([{

    }])
    const handleCreateFood = async () => {
        const responseApiCreateFood = await createFoodPost(inforFood)
        setCheckRes(true)
        setTimeout(() => {
            setCheckRes(false)
        }, 2000)
    }
    return <>
        {
            currentUser ?
                <div>
                    <Header />
                    <Content>
                        {
                            checkRes ?

                                <ToastMessage warning={'Success'} text={'Tạo Thành Công :))'} />

                                : ''
                        }
                        {
                            currentUser && currentUser.user.roidId == process.env.REACT_APP_ADMIN_KEY ?
                                <div className={cx('AddFoodContainer')}>
                                    <div className={cx('AddFoodHeadingContainer')}>
                                        <div className={cx('AddFoodHeading')}>
                                            <span>THÊM MÓN</span>
                                        </div>
                                    </div>
                                    <div className={cx('AddFoodContainer__Form')}>

                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Tên Món</Form.Label>
                                                <Form.Control type="text" placeholder="Tên món ăn"
                                                    onChange={(event) => {
                                                        setInforFood({
                                                            ...inforFood,
                                                            name: event.target.value
                                                        })
                                                    }}
                                                />
                                                {/* <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text> */}
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Loại</Form.Label>
                                                <Form.Select
                                                    onChange={(event) => {
                                                        setInforFood({
                                                            ...inforFood,
                                                            type: event.target.value
                                                        })
                                                    }}
                                                >
                                                    <option value="food">Đồ ăn</option>
                                                    <option value="drink">Nước uống</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Giá</Form.Label>
                                                <Form.Control type="text" placeholder="Nhập số Nguyên"
                                                    onChange={(event) => {
                                                        setInforFood({
                                                            ...inforFood,
                                                            cost: event.target.value
                                                        })
                                                    }}
                                                />
                                            </Form.Group>


                                            <Button variant="primary"
                                                onClick={() => {
                                                    handleCreateFood()
                                                }}
                                            >
                                                Thêm
                                            </Button>
                                        </Form>
                                        <Form>
                                            <Tippy
                                                render={attrs => (
                                                    <div className="box" tabIndex="-1" {...attrs}>
                                                        My tippy box
                                                    </div>
                                                )}
                                                interactive={true}
                                                placement={"bottom"}
                                            >
                                                <Form.Group className="mb-3" controlId="formBasicEmail"
                                                    style={{ border: "2px solid #000", padding: "4px 10px" }}
                                                >
                                                    <Form.Label>Nguyên Liệu</Form.Label>
                                                </Form.Group>

                                            </Tippy>
                                        </Form>

                                    </div>
                                </div>
                                :
                                <span style={{
                                    color: "white",
                                    fontSize: "20px",
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100vh'
                                }}>
                                    Bạn không có quyền truy cập mục này !!
                                </span>
                        }
                    </ Content>
                </div >
                : <IsLogin />
        }
    </>
}
export default AddFood