
// add new item to cart
export const addItem = ( item, next) =>{
    let cart = [];
    if(typeof window != 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart')) ;
        }
        cart.push({...item, count: 1});

        cart =  Array.from( new Set(cart.map((p)=> (p._id) ))).map(id => {
            return cart.find( p => p._id === id);
        });

        localStorage.setItem('cart', JSON.stringify(cart) )
        next();
    }
}

//cart length
export const itemTotal = ( ) => {
    if(typeof window !==  'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }

    return 0;
}

//get total cart item
export const getCart = ( ) => {
    if(typeof window !==  'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'));
        }
    }

    return [];
}