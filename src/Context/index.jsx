import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext()

export const initializeLocalStorage = () => {
  const accountInLocalStorage = localStorage.getItem('account')
  const signOutInLocalStorage = localStorage.getItem('sign-out')
  let parsedAccount
  let parsedSignOut

  if (!accountInLocalStorage) {
    localStorage.setItem('account', JSON.stringify({}))
    parsedAccount = {}
  } else {
    parsedAccount = JSON.parse(accountInLocalStorage)
  }

  if (!signOutInLocalStorage) {
    localStorage.setItem('sign-out', JSON.stringify(false))
    parsedSignOut = false
  } else {
    parsedSignOut = JSON.parse(signOutInLocalStorage)
  }
}

export const ShoppingCartProvider = ({children}) => {
    // My account
    const [account, setAccount] = useState({})

    // Sign out
    const [signOut, setSignOut] = useState(false)
    
    const [count, setCount] = useState(0);

    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const openProductDetail = () =>  setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);

    const [productToShow, setProductToShow] = useState({})

    const [cartProducts, setCartProducts] = useState([])

    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const openCheckoutSideMenu = () =>  setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);
    
    const [order, setOrder] = useState([]);
 
    const[items, setItems] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null)
    
     
     const [searchByTitle, setSearchByTitle] = useState(null);

     const [searchByCategory, setSearchByCategory] = useState(null)

     useEffect(() => {
      fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setItems(data))},[])
     
     const filteredItemsByTitle = (items, searchByTitle) =>{
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
     }

     const filteredItemsByCategory = (items, searchByCategory) =>{
        return items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()))
     }


     useEffect(()=> {
        if (searchByTitle) setFilteredItems(filteredItemsByTitle(items, searchByTitle))
     }, [items, searchByTitle])

     const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE') {
          return filteredItemsByTitle(items, searchByTitle)
        }
    
        if (searchType === 'BY_CATEGORY') {
          return filteredItemsByCategory(items, searchByCategory)
        }
    
        if (searchType === 'BY_TITLE_AND_CATEGORY') {
          return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }
    
        if (!searchType) {
          return items
        }
      }
    
      useEffect(() => {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
      }, [items, searchByTitle, searchByCategory])
    

    return (
        <ShoppingCartContext.Provider value={
          {count,
           setCount,
           openProductDetail,
           closeProductDetail,
           isProductDetailOpen,
           productToShow,
           setProductToShow,
           cartProducts,
           setCartProducts,
           openCheckoutSideMenu,
           closeCheckoutSideMenu,
           isCheckoutSideMenuOpen,
           order,
           setOrder,
           items, 
           setItems,
           searchByTitle,
           setSearchByTitle,
           filteredItems,
           searchByCategory,
           setSearchByCategory,
           account,
           setAccount,
           signOut,
           setSignOut
        }  
        }>
            {children}
        </ShoppingCartContext.Provider>
    )
}