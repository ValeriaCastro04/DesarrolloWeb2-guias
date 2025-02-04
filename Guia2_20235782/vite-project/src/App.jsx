import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import {db} from './data/db.js'
import { Guitar } from './components/Guitar.jsx'

function App() {
  function initialCart(){
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart? JSON.parse(localStorageCart):[]
  }
  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart)

  function vaciarCarrito() {
    setCart([]);
    localStorage.removeItem('cart');
}


function restarCantidad(id) {
  const updatedCart = cart.map((item) => {
      if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };

      }
      return item;
  }).filter(item => item.quantity > 0);
  setCart(updatedCart);
}

function sumarCantidad(id) {
  const updatedCart = cart.map((item) => {
      if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
      }
      return item;
  });
  setCart(updatedCart);
}

function eliminarProducto(id) {
  const updatedCart = cart.filter((item) => item.id !== id);
  setCart(updatedCart);
}



  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart))
  }, [cart])


  function addToCart(guitar){
    const itemIndex=cart.findIndex((item)=>guitar.id===item.id)
    console.log(itemIndex);
    if(itemIndex===-1){ //no existe en el carrito
      guitar.quantity=1;
      setCart([...cart, guitar])
    }
    else{ //si ya está en el carrito
      const updatedCart=[...cart] //copia de la variable de estado
      updatedCart[itemIndex].quantity++;
      setCart(updatedCart);
    }
}

function calculatedTotal(){
 /* let total =0;
  for (const guitar of cart) {
    total+=guitar.price*guitar.quantity;
  }
    */
  let total = cart.reduce((total, item)=>total+item.price*item.quantity,0)
  return total;
}


  return (
    <>
    <Header cart={cart} total={calculatedTotal()} vaciarCarrito={vaciarCarrito} eliminarProducto={eliminarProducto} sumarCantidad={sumarCantidad} restarCantidad={restarCantidad}/>
    <main className='container-xl-mt-5'>
      <h2 className='text-cemter'> Nuestra Colección</h2>
      <div className='row mt-5'>
        {data.map((guitar) =>(
          <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart} />
        ))}
      </div>
    </main>
      <Footer/>
    </>
  )
}

export default App