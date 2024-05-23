import { useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import {Link} from 'react-router-dom'
import OrderCard from './../OrderCard/index';
import {ShoppingCartContext} from '../../Context'
import { totalPrice } from './../../utils/index';
import './styles.css'

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext)
  console.log('CART: ', context.cartProducts)

       const handleDelete = (id) =>{ 
       const filteredProducts = context.cartProducts.filter(product => product.id != id)
       context.setCartProducts(filteredProducts)}

       const handleCheckout = () =>{ 
        const orderToAdd = {
          date: '01.02.23',
          products: context.cartProducts,
          totalProducts: context.cartProducts.length,
          totalPrice: totalPrice(context.cartProducts)
        }
        context.setOrder([...context.order, orderToAdd])
        context.setCartProducts([])
      }

        <div>
          <XMarkIcon
            className='h-6 w-6 text-black cursor-pointer'
            onClick={() => context.closeCheckoutSideMenu()}>
          </XMarkIcon>
          <XMarkIcon
            className='h-6 w-6 text-black cursor-pointer'
            onClick={() => context.closeCheckoutSideMenu()}>
          </XMarkIcon>
        </div>
  
  
  return (
    <aside
      className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} px-6 overflow-y-scroll flex-1 checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}>
      <div className='flex justify-between items-center p-2'>
      <h2 className='font-medium text-xl'>MyOrder</h2>
       <XMarkIcon
            className='h-6 w-6 text-black cursor-pointer left-0 top-3'
            onClick={() => context.closeCheckoutSideMenu()}></XMarkIcon>
      </div>
      <div className='px-6'>
        {
          context.cartProducts.map(product => (
            <OrderCard
              key={product.id}
              title={product.title}
              imageUrl={product.image}
              price={product.price}
              handleDelete={handleDelete}
              id={product.id}
            />
          ))
        }
      </div>
      <div className='px-6'>
       <p className='flex justify-between items-center w-full'>
         <span className='font-light'lg>Total:</span>
         <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
       </p>
       <Link to="/my-order">
        <button className='w-full h-6 bg-black rounded-lg text-white' onClick={() => handleCheckout()}>CheckOut</button>
       </Link>
      </div>
    </aside>
  )
}

export default CheckoutSideMenu