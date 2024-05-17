
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Components/Home/Home';
import { About } from './Components/About/About';
import { Contact } from './Components/Contact/Contact';
import { Login } from './Components/Login/Login';
import { SignUp } from './Components/SignUp/SignUp';
import { Shop } from './Components/Shop/Shop';
import { SingleProduct } from './Components/SingleProduct/SingleProduct';
import { Cart } from './Components/Cart/Cart';
import { Checkout } from './Components/Checkout/Checkout';
import { OrderSuccessfull } from './Components/Checkout/OrderSuccessfull';
import { OrderDetails } from './Components/OrderDetails/OrderDetails';
import { ForgotPassword } from './Components/ForgotPassword/ForgotPassword';
import { Profile } from './Components/Profile/Profile';
import { ProtectedRoute } from './Components/ProtectedRoutes/ProtectedRoute';
import { ProtectedLoginRoute } from './Components/ProtectedRoutes/ProtectedLoginRoute';
import { ChangePassword } from './Components/Profile/ChangePassword';
import ScrollToTop from './Components/CommonComponents/ScrollToTop';
import { Error } from './Components/CommonComponents/Error';

function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/login" exact element={<ProtectedLoginRoute Component={Login}/>} />
          <Route path="/sign-up" exact element={<ProtectedLoginRoute Component={SignUp}/>} />
          <Route path="/shop" exact element={<Shop />} />
          <Route path="/single-product" exact element={<SingleProduct />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="/checkout" exact element={<Checkout/>} />
          <Route path="/order-successfull" exact element={<OrderSuccessfull />} />
          <Route path="/order-details" exact element={<ProtectedRoute Component={OrderDetails} />} />
          <Route path="/forgotPassword" exact element={<ForgotPassword />} />
          <Route path="/profile" exact element={<ProtectedRoute Component={Profile} />} />
          <Route path="/changePassword" exact element={<ProtectedRoute Component={ChangePassword} />} />
          <Route path="/*" exact element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
