import {useRoutes,BrowserRouter} from 'react-router-dom'
import Home from '../Home';
import MyOrders from '../MyOrders';
import MyOrder from '../MyOrder';
import NotFound from '../NotFound';
import Signin from '../Signin';
import Navbar from '../../Components/Navbar';
import MyAccount from '../MyAccount';
import {ShoppingCartProvider} from '../../Context'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu';
import './App.css'


const AppRoutes =() => {
  let routes =useRoutes([
    {path:"/", element: <Home />},
    { path: "/all", element: <Home /> },
    { path: "/electronics", element: <Home /> },
    { path: "/jewelery", element: <Home /> },
    { path: "/men's clothing", element: <Home /> },
    { path: "women's clothing", element: <Home /> },
    { path: '/othes', element: <Home /> },
    {path:'/MyAccount', element: <MyAccount />},
    {path:'/my-Order', element: <MyOrder />},
    { path: '/my-orders', element: <MyOrders /> },
    {path:'/my-orders/last', element: <MyOrder />},
    {path:'/my-orders/:id', element: <MyOrder />},
    {path:'/*', element: <NotFound />},
    {path:'/SignIn', element: <Signin />} 
  ])
  return routes
}
const App = () => {
  return (
    <ShoppingCartProvider>
     <BrowserRouter>
       <AppRoutes />
       <Navbar/>
       <CheckoutSideMenu />
    </BrowserRouter>
    </ShoppingCartProvider>
  )
}
export default App