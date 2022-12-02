import logo from './logo.svg';
import './App.css';
import DefaultLayouts from './component/defaultlayouts/defaultLayouts';
import Login from './component/Page/Login/Login';
import OrderFood from './component/Page/OrderFood/OrderFood';
import Profile from './component/Page/Profile/Profile';
import UserManage from './component/Page/System/UserManage/UserManage';
import OrderTable from './component/Page/OrderTable/OrderTable';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddFood from './component/Page/AddFood/AddFood';
import Turnover from './component/Page/Turnover/Turnover';
import System from './component/Page/System/System';
import FoodSystem from './component/Page/System/FoodSystem/FoodSystem';
import TableSystem from './component/Page/System/TableSystem/TableSystem';
import BrandSystem from './component/Page/System/BrandSystem/BrandSystem';
import { useEffect, useState } from 'react';
import { getAllUserBrands } from './component/axios/meThodPost';
import MaterialSystem from './component/Page/System/MaterialSystem/MaterialSystem';
import Order from './component/Page/System/OrderSystem/Order';
import WaveHouseSystem from './component/Page/System/waveHouse/waveHouse';
import KitchenSystem from './component/Page/System/KitchenSystem/KitchenSystem';
function App() {
  const userRedux = useSelector(state => state.rootLoginReducer.user)
  const isPending = useSelector(state => state.rootLoginReducer.isPending)


  // getBase64(image, setImage)
  return (
    <div className="App">

      {
        // isPending ?
        //   <div className='wrapperPending'>
        //     <div className='loader'>

        //     </div>
        //   </div>
        //   :
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/' element={<DefaultLayouts />} />
          <Route path='/OrderFood' element={<OrderFood />} />
          <Route path='/OrderTable' element={<OrderTable />} />
          <Route path='/ProfileUser' element={<Profile />} />
          <Route path='/AddFood' element={<AddFood />} />
          <Route path='/Turnover' element={<Turnover />} />
          <Route path='/System' element={<System />} />
          <Route path='/System/user-manage' element={<UserManage />} />
          <Route path='/System/Food-manage' element={<FoodSystem />} />
          <Route path='/System/Table-manage' element={<TableSystem />} />
          <Route path='/System/Brand-manage' element={<BrandSystem />} />
          <Route path='/System/Material-manage' element={<MaterialSystem />} />
          <Route path='/System/Order' element={<Order />} />
          <Route path='/System/WareHouse-manage' element={<WaveHouseSystem />} />
          <Route path='/System/Kitchen-manage' element={<KitchenSystem />} />
        </Routes>
      }

    </div>

  );
}

export default App;
