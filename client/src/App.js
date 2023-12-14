import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Components/Home/Home'
import AddProduct from './Components/AddProduct/AddProduct';
import Products from './Components/Products/Products';
import Profile from './Components/Profile/Profile';
import UpdateProduct from './Components/UpdateProduct/UpdateProduct';
import SignUp from './Components/SignUp/SignUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from './Components/PrivateComponent/PrivateComponent'
import Login from './Components/Login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element = {<PrivateComponent/>}>
            <Route path = "/" element = {<Home/>}/>
            <Route path = '/products' element = {<Products/>}/>
            <Route path = '/addproducts' element = {<AddProduct/>}/>
            <Route path = '/update/:id' element = {<UpdateProduct/>}/>
            <Route path = '/profile' element = {<Profile/>}/>
          </Route>
          <Route path = '/signup' element = {<SignUp/>}/>
          <Route path = 'login' element = {<Login/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
