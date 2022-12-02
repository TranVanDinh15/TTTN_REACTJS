import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { getAllBranch, getDetailBranch } from "../../../axios/meThodPost";
import { handleChangerStatusKitchen, handleDetailOrder, handleGetListTableStatus } from "../../../handleEvent/handleEvent";
import DetailTable from "../../OrderTable/detailTable/detailTable";
import HeaderSystem from "../HeaderSystem/HeaderSystem";
import styles from './KitchenSystem.module.scss'
const cx = classNames.bind(styles)
function KitchenSystem() {
    const [isTableClient, setIsTableClient] = useState(false)
    const [isDetailOrder, setIsDetailOrder] = useState(false)
    const [tableIsClient, setTableIsClient] = useState('')
    const [detailBranch, setDetailBranch] = useState('')
    const [detailOrder, setDetailOrder] = useState('')
    const [currentFood, setCurrentFood]=useState('')
    const userLogin = useSelector(state => state.rootLoginReducer.user)
    useEffect(() => {
        handleGetListTableStatus(userLogin ? userLogin.employeeId : '', 1, setTableIsClient)
        getDetailBranch(userLogin?userLogin.branchId:'', setDetailBranch)
    }, [])
    console.log(tableIsClient)
    console.log(detailOrder)
    return <div className={cx("wrapperTableSystem")}>
        <HeaderSystem />
        <div className={cx("TableSystemHeading")}>
            <span>Xác Nhận Bếp</span>
        </div>
        <div className={cx("TableSystemHeading__inforBranch")}
        >
            <span>Chi Nhánh: {detailBranch? detailBranch.data.name:''}</span>
            <span>Địa Chỉ: {detailBranch? detailBranch.data.address:''}</span>
        </div>
        <div className={cx("TableSystemHeading__confirm__Title")}>
            <span>Đơn hiện tại</span>
        </div>
        <div className={cx("TableSytem")}>
            <table style={{ width: "100%" }}>
                <tbody>

                    <tr>
                        <th>Tên Bàn</th>
                        <th>Chi Tiết</th>
                    </tr>
                    {
                        tableIsClient ?
                            tableIsClient.data.map((resource, index) => {
                                return (
                                    <tr key={index}>   
                                    <td>{resource.name}</td>
                                    <td>
                                        <button
                                        onClick={(event)=>{
                                            event.preventDefault()
                                            setCurrentFood(resource)
                                            setIsDetailOrder(true)
                                            handleDetailOrder(resource.tableId,
                                                userLogin.employeeId, setDetailOrder, setIsTableClient)
                                        }}
                                        
                                        >Chi tiết</button>
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
            isDetailOrder?
            <DetailTable detailOrder={detailOrder} kitchen={true} setIsDetail={setIsDetailOrder} currentFood={currentFood}/>
            :''
        }
        <ToastContainer></ToastContainer>
    </div>
}
export default KitchenSystem