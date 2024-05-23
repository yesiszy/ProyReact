/**
 * this function calculates total price of a new order
 * @param{Array} product carProduct: Array of Objet
 * @return{numer} Total price 
*/
export const totalPrice = (products) =>{
    let sum = 0;
     products.forEach(product =>
        sum += product.price)
        return sum
}