import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import { actionPending, successErr, successLogin } from '../../../redux/actions/actionlogin'
import { changeStatusUser, createUserPost, loginUser } from '../../axios/meThodPost'
import Header from '../../defaultlayouts/Header/Header'
import './Login.css'
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [check, setCheck] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // action pending
    const actionP = actionPending()
    // Lấy thông tin người dùng từ redux
    const dataUser = useSelector(state => state.rootLoginReducer)
    console.log(dataUser)
    // Xử lý sự kiện click vào nút button
    const handleLogin = async () => {
        setCheck(true)
        try {
            const bodyUser = {
                username: email,
                password: password
            }
            const response = await loginUser(bodyUser)
            console.log(response)
            if (response.status == 200) {
                // console.log(response.data.data.role)
                if (response.data.status == -1) {
                    toast.error(response.data.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
                if (response.data.status === 1) {
                    // dispatch(actionP)
                    const changeSatus = await changeStatusUser(response.data.data.employeeId
                    )
                    console.log(changeSatus)
                    if (changeSatus.data.message == "Bạn đang ngưng hoạt động") {
                                const changeSatus = await changeStatusUser(response.data.data.employeeId)
                                const actionSuccess = successLogin(response.data.data)
                                dispatch(actionSuccess)
                                if(response.data.data.role==process.env.REACT_APP_KEY_KITCHEN){
                                navigate('/System/Kitchen-manage')
                                }else{

                                    navigate('/')
                                }
                        
                        
                    }
                    if (changeSatus.data.message == "Bạn đang hoạt động") {
                       
                                const actionSuccess = successLogin(response.data.data)
                                dispatch(actionSuccess)
                                if(response.data.data.role==process.env.REACT_APP_KEY_KITCHEN){
                                    navigate('/System/Kitchen-manage')
                                    }else{
    
                                        navigate('/')
                                    }
                           
                    }

                }
            }

        }
        catch (error) {
            console.log(error)
        }

    }
    return <>
        {
            // dataUser.isPending ?
            //     <div className='wrapperPending'>
            //         <div className='loader'>

            //         </div>
            //     </div>
            //     :
            <React.Fragment>
                <Header />
                <div className='wrapperLogin'>
                    <form action="" className='formData'>
                        <div className='Title'>
                            <span>Đăng Nhập</span>
                        </div>
                        <div className="form-group">
                            <label for="email">Số điện thoại</label>
                            <input type="email" class="form-control" placeholder="Enter email" id="email" value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                }}
                            />
                            {
                                check == true && email == '' ?
                                    <span style={{ color: "red" }}>Bạn chưa nhập Email</span>
                                    : ''
                            }
                        </div>
                        <div className="form-group">
                            <label for="pwd">Password:</label>
                            <input type="password" class="form-control" placeholder="Enter password" id="pwd" value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                }}
                            />
                            {
                                check == true && password == '' ?
                                    <span style={{ color: "red" }}>Bạn chưa nhập Password</span>
                                    : ''
                            }
                        </div>
                        <div class="form-group form-check">
                            <span style={{ color: 'red' }}>{dataUser ? dataUser.message : ''}</span>
                        </div>
                        <span class="btn btn-primary"
                            onClick={handleLogin}
                        >ĐĂNG NHẬP</span>
                        <div className='SignUp'>
                            <a href=''>Đăng Ký</a>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        }
        <ToastContainer></ToastContainer>
    </>
}
export default Login