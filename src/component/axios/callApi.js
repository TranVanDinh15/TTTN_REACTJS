import axios from "axios";
// Lấy chi nhánh của nhà hàng từ data base
export const getBrands = (setState) => {
    axios.get(process.env.REACT_APP_GET_BRANDS)
        .then(function (response) {
            setState(response)
        })
        .catch(function (error) {
            console.log(error);
        })
}
export const getALlUsers = (setState, api) => {
    axios.get(api)
        .then(function (response) {
            setState(response)
        })
        .catch(function (error) {
            console.log(error);
        })
}
