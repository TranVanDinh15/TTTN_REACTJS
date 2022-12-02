import {
    changerStatusBranch,
    ChangerStatusKitchen,
    changeStatus,
    changeStatusFood,
    createFood, createMaterial, createOrder, createTable, createUserBrands, createWaveHouse, deleteBrand, deleteFood, deleteUser, detailOrder, getAllBranch, getAllFood, getAllUserBrands, getListMaterial, getListTable, getListUser, getListWaveHouse, getReportInDay, getTableAll, payload, responseAllUser, statusBranch, tableStatus, trendingFood, tunoverMonth, tunoverYear, updateBranchPost, updateFood, updateMaterial, updateOrder, updateTable, updateUserPost
} from "../axios/meThodPost"
import { toast } from "react-toastify";

export const handleDeleteBrand = async (body, setIsDelete) => {
    const response = await deleteBrand(body)
    if (response.data.errCode == 0) {
        toast.success("Xóa Thành Công:))", {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    setIsDelete(false)
}
// post createUser
export const handleCreateUserPost = async (body, setIsCreateUser) => {
    const response = await createUserBrands(body)
    console.log(response)
    // if (response.data.errCode == 1) {
    //     toast.error(response.data.message, {
    //         position: toast.POSITION.TOP_RIGHT
    //     });
    // }
    if (response.data.status == 1) {
        toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT
        });
        setIsCreateUser(false)
    }
    if (response.data.status == -1) {

        toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

}
// handle Update User
export const hanleUpdateUser = async (id, body, setUpdate, setAllUser, brandId) => {
    const response = await updateUserPost(id, body)
    if (response.status == 200) {
        toast.success(response.data, {
            position: toast.POSITION.TOP_RIGHT
        });
        const getLitUserAll = await getListUser(setAllUser, brandId)
        setUpdate(false)
        // update user outside UI
    }
}
// hanle Update User
export const handleUpdateBrand = async (id, body, setUpdate, setAllBrand) => {
    const response = await updateBranchPost(id, body)
    if (response.status == 200) {
        toast.success(response.data, {
            position: toast.POSITION.TOP_RIGHT
        });
        await getAllBranch(setAllBrand)
        setUpdate(false)
    }
}
// handle delete User
export const hanleDeleteUser = async (employeeId, setIsDelete) => {
    const response = await deleteUser(employeeId)
    console.log(response)
    if (response.status == 200) {
        toast.success(response.data, {
            position: toast.POSITION.TOP_RIGHT
        });
        setIsDelete(false)
    }
}
// handle getListMaterial
export const handleGetListMaterial = async (setState, branchId) => {
    try {
        const response = getListMaterial(setState, branchId)
    } catch (error) {
        console.log(error)
    }
}
// handle Get  employee kitchen from brandId
export const handleGetEmployee = async (branchId, requestState, setEmployeeId) => {
    try {

        const respone = await responseAllUser(branchId)
        const employeeKichen = respone.data.data.find((data) => {
            return data.role === process.env.REACT_APP_KEY_KITCHEN
        })
        console.log(employeeKichen)
        if (employeeKichen) {
            setEmployeeId({
                ...requestState,
                employeeId: employeeKichen.employeeId
            })
        } else {
            setEmployeeId({
                ...requestState,
                employeeId: ''
            })
        }

    } catch (error) {
        console.log(error)
    }
}
// handle createMaterial 
export const handleCreateMaterial = async (body, setIsMaterial) => {
    const response = await createMaterial(body)
    if (response.status == 200) {
        toast.success(response.data, {
            position: toast.POSITION.TOP_RIGHT
        });
        setIsMaterial(false)
    }
    console.log(response)
}
// hanle update material
export const handleUpdateMaterial = async (body) => {
    const updateResponse = await updateMaterial(body)
    if (updateResponse.status == 200) {
        toast.success(updateResponse.data, {
            position: toast.POSITION.TOP_RIGHT
        });

    }
}
// handle get list food
export const handleGetListFood = async (brandId, setState) => {
    const responeUser = await responseAllUser(brandId)
    const kitchenUser = responeUser.data.data.find((data) => {
        return data.role === process.env.REACT_APP_KEY_KITCHEN
    })
    console.log(kitchenUser)
    if (kitchenUser) {
        getAllFood(kitchenUser.employeeId, setState)
    }

}
// handle create food
export const handleCreateFood = async (body, setIsCreate) => {
    const response = await createFood(body)
    if (response.status == 200) {
        toast.success(response.data, {
            position: toast.POSITION.TOP_RIGHT
        });
        setIsCreate(false)
    }
}
// handle update food
export const handleUpdateFood = async (body) => {
    const response = await updateFood(body)
    console.log(response)
}
// handle delete Food
export const hanleDeleteFood = async (foodId, setIsDelete) => {
    const response = await deleteFood(foodId)
    if (response.status == 200) {
        toast.success(response.data, {
            position: toast.POSITION.TOP_RIGHT
        });
        setIsDelete(false)
    }
}
// handle status Branch
export const handleStatusBrand = async (branchId, setStatusBranch) => {
    const response = await statusBranch(branchId)
    if (response.status == 200) {
        setStatusBranch(response.data)
    }
    console.log(response)
}
// handle get all table
export const handleGetAllTable = async (employeeId, setState) => {
    const response = await getListTable(employeeId, setState)
    console.log(response)
}
// handle find Admin
export const handleFindAdmin = async (branchId, state, setState) => {
    const responeListUser = await responseAllUser(branchId)
    const findAdmin = responeListUser.data.data.find((data) => {
        return data.role == process.env.REACT_APP_KEY_ADMIN
    })
    if (findAdmin) {
        setState({
            ...state,
            employeeId: findAdmin.employeeId
        })
    }
}
// handle create table
export const handleCreateTable = async (body) => {
    const response = await createTable(body)
    console.log(response)
    if (response.status == 200) {
        toast.success(response.data, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
}
// handle update table
export const handleUpdateTable = async (tableId, body, setIsUpdate) => {
    try {
        const response = await updateTable(tableId, body)
        console.log(response)
        if (response.status == 200) {
            toast.success(response.data, {
                position: toast.POSITION.TOP_RIGHT
            });
            setIsUpdate(false)
        }
    } catch (error) {
        console.log(error)
    }

}
// handle get Report In Day
export const handleGetReportInDay = async (employeeId, setState, date, status) => {
    const response = await getReportInDay(employeeId, date, status)
    console.log(response)
    if (response.status == 200) {
        setState(response)
    }
}
// handle get list wavehouse
export const handleGetListWaveHouse = async (branchId, codeMaterial, setState) => {
    const response = await responseAllUser(branchId)
    console.log(response)
    if (response) {
        const accountant = response.data.data.find((data, index) => {
            return data.role == process.env.REACT_APP_KEY_ACCOUNTANT
        })
        if (accountant) {
            const listWaveHouse = await getListWaveHouse(accountant.employeeId, codeMaterial)
            setState(listWaveHouse)
        }
        console.log(accountant)
    }

}
// handle create waveHouse
export const handleCreateWaveHouse = async (body, setState) => {
    const response = await createWaveHouse(body)
    if (response.status == 200) {
        toast.success(response.data, {
            position: toast.POSITION.TOP_RIGHT
        });
        setState(false)
    }
}
// handle get list status
export const handleGetListTableStatus = async (employeeId, status, setState) => {
    const respone = await tableStatus(employeeId, status)
    setState(respone)
}
// handle get detail order
export const handleDetailOrder = async (tableId, employeeId, setState, setIsDetail) => {
    const response = await detailOrder(tableId, employeeId)
    if (response.status == 200) {
        setState(response)
        setIsDetail(true)
    }
}
//  handle create Order
export const handleCreateOrder = async (body, setState) => {
    const response = await createOrder(body)
    if (response.status == 200) {
        toast.success(response.data, {
            position: toast.POSITION.TOP_RIGHT
        });
        setState(false)
    }
}
// handle payload
export const handlePayload = async (employeeId, tableId) => {
    const response = await payload(employeeId, tableId)
    if (response) {
        if (response.data.data.status == 1) {
            toast.success('Thanh Toán Thành Công !!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    console.log(response)
}
// handle Trending Food
export const handleTrendingFood = async (employeeId, setChart, setTurnoverOrder) => {
    try {
        const respone = await trendingFood(employeeId)
        console.log(respone)
        if (respone) {
            if (respone.data) {
                setTurnoverOrder(respone.data)
                const series = respone.data.data.foodTrending.map((data, index) => {
                    return data.quantity
                })
                const labels = respone.data.data.foodTrending.map((data, index) => {
                    return data.food
                })
                setChart(
                    {
                        series: [...series],
                        options: {
                            chart: {
                                width: 380,
                                type: 'pie',
                            },
                            labels: [...labels],
                            responsive: [{
                                breakpoint: 480,
                                options: {
                                    chart: {
                                        width: 200
                                    },
                                    legend: {
                                        position: 'bottom'
                                    }
                                }
                            }]
                        },


                    }
                )
                // setState(respone)
            }

        }
    } catch (error) {
        console.log(error)
    }
}
// Handle Update Order
export const handleUpdateOrder = async (employeeId, data, cart, setState) => {
    try {
        console.log(cart)
        const detailOrderCurrent = await detailOrder(data.tableId, employeeId)
        if (detailOrderCurrent) {
            setState(detailOrderCurrent)
        }
        console.log(detailOrderCurrent)
    } catch (error) {
        console.log(error)
    }
}
// Handle confirm Update Order
export const handleConfirmOrder = async (body, setState) => {
    const response = await updateOrder(body)
    console.log(response)
    if (response) {
        if (response.data == 'Cập nhật thông tin thành công') {
            toast.success('Cập nhật thông tin thành công', {
                position: toast.POSITION.TOP_RIGHT
            });
            setState(false)
        } else {
            toast.error(response.data, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
}
// Handle get Turnover
export const handleGetTurnover = async (employeeId, date, status, setState, setIsTurnuverDate) => {
    try {
        const response = await getReportInDay(employeeId, date, status)
        console.log(response.data.data)
        // if (response.status == 200) {
        if (response.data.data.length == 0) {
            toast.error('Không có doanh thu', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            setState(response.data)
            setIsTurnuverDate(false)
        }
        // }

    } catch (error) {
        console.log(error)
    }
}
// Handle get Tunover Month
export const handleGetTunoverMonth = async (employeeId, date, setState, setIsTurnuverDate) => {
    try {
        const response = await tunoverMonth(employeeId, date)
        console.log(response.data.data)
        // if (response.status == 200) {
        if (response.data.data.length == 0) {
            toast.error('Không có doanh thu', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            setState(response.data)
            setIsTurnuverDate(false)
        }
        // }

    } catch (error) {
        console.log(error)
    }
}
// Handle get Tunover Month
export const handleGetTunoverYear = async (employeeId, date, setState, setIsTurnuverDate) => {
    try {
        const response = await tunoverYear(employeeId, date)
        console.log(response.data.data)
        // if (response.status == 200) {
        if (response.data.data.length == 0) {
            toast.error('Không có doanh thu', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            setState(response.data)
            setIsTurnuverDate(false)
        }
        // }

    } catch (error) {
        console.log(error)
    }
}
// Handle changer status table
export const handleChangeStatus = async (tableId, employeeId, setState) => {
    const response = await changeStatus(tableId)
    console.log(response)
    if (response) {
        handleGetAllTable(employeeId, setState)
    }
}
// Handle changer status food
export const handleChangerStatusFood = async (foodId, branchId, setState) => {
    const response = await changeStatusFood(foodId)
    console.log(response)
    if (response) {
        handleGetListFood(branchId, setState)
    }
}
// Handle changer status branch
export const handleChangerStatusBranch = async (branchId, setState) => {
    const response = await changerStatusBranch(branchId)
    if (response) {
        getAllBranch(setState)
    }
}
// Handle Changer status Kitchen Order
export const handleChangerStatusKitchen=async(orderId, foodId, statusFood)=>{
    if(statusFood==0){
       const response=await ChangerStatusKitchen(orderId, foodId, 1)
       if(response.status==200){  
           toast.success(response.data.data, {
            position: toast.POSITION.TOP_RIGHT
        });
       }
        console.log(response)
    }
    if(statusFood==1){
        const response=await ChangerStatusKitchen(orderId, foodId, 2)
        if(response.status==200){  
            toast.success(response.data.data, {
             position: toast.POSITION.TOP_RIGHT
         });
        }
        console.log(response)
    }
    if(statusFood==2){
        const response=await ChangerStatusKitchen(orderId, foodId, 0)
        if(response.status==200){  
            toast.success(response.data.data, {
             position: toast.POSITION.TOP_RIGHT
         });
        }
        console.log(response)
    }
}