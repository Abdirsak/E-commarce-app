import {BrowserRouter as Router, Routes , Route, Navigate} from 'react-router-dom';
import 'antd/dist/antd';
import { DatePicker } from 'antd';
import './App.css';
import Home from './pages/home/Home'
import Products from './pages/products/Products'
import Cart from './pages/cart/Cart';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Bills from './pages/bills/Bills';
import Customers from './pages/customers/Customers';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={
            <ProtectedRouter>
            <Home/>
            </ProtectedRouter>
            }/>
          <Route path='/products' element={
            <ProtectedRouter>
            <Products/>
            </ProtectedRouter>
            }/>
          <Route path='/cart' element={
            <ProtectedRouter>
          <Cart/>
          </ProtectedRouter>
          }/>
          <Route path='/bills' element={
            <ProtectedRouter>
          <Bills/>
          </ProtectedRouter>
          }/>
          <Route path='/customers' element={
            <ProtectedRouter>
          <Customers/>
          </ProtectedRouter>
          }/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

export function ProtectedRouter ({children}){
  if(localStorage.getItem("auth")){
    return children
  }else{
    return <Navigate to="/login"/>
  }
}
