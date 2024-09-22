//App.js

import React, { useState } from 'react';
import './App.css';
import HomeComponent from './HomeComponent';
import ShowCourseComponent from './ShowCourseComponent';
import UserCartComponent from './UserCartComponent';

function App() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'Men T-shirts',
      price: 799,
      image:
        'https://assets.ajio.com/medias/sys_master/root/20230906/ZMfr/64f8ab10afa4cf41f5c56b5f/-473Wx593H-461340286-multi-MODEL.jpg'
    },
    {
      id: 2,
      name: 'Women Hoodie',
      price: 1299,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqOUz0sJFRuloSAslVEwtU7NN_OEZII82XAw&s'
    },
    {
      id: 3,
      name: 'Backpack',
      price: 1499,
      image:
        'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTG11eFqm9jZL80xzmNKhMQ9ysvpIbr2oSh0qLKVUy7YOM8POAdI2fznZNIQzGSpYjhDnJ3RDw8aakSJCFs5LUP9obh9D-l1VWhgEn8wBQ_TCQdiJNzgDAI'
    },
    {
      id: 4,
      name: 'Wireless Headset',
      price: 4399,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFJ0u6e5rkBL8JQuLktLA76Z9fFZE80ZxKtw&s'
    }
  ]);

  const [cartItems, setcartItems] = useState([]);
  const [item, setitem] = useState('');

  const addCourseToCartFunction = (CartItem) => {
    const alreadyCourses = cartItems
      .find(item => item.product.id === CartItem.id);
    if (alreadyCourses) {
      const latestCartUpdate = cartItems.map(item =>
        item.product.id === CartItem.id ? {
          ...item, quantity: item.quantity + 1
        }
          : item
      );
      setcartItems(latestCartUpdate);
    } else {
      setcartItems([...cartItems, { product: CartItem, quantity: 1 }]);
    }
  };

  const deleteItemFromCart = (CartItem) => {
    const updatedCart = cartItems
      .filter(item => item.product.id !== CartItem.id);
    setcartItems(updatedCart);
  };

  const totalAmountCalculation = () => {
    return cartItems
      .reduce((total, item) =>
        total + item.product.price * item.quantity, 0);
  };

  const courseSearchUserFunction = (event) => {
    setitem(event.target.value);
  };

  const filterCourseFunction = courses.filter((course) =>
    course.name.toLowerCase().includes(item.toLowerCase())
  );

  return (

    <div className='container'>
      <div className='row'>
        <div className="col-lg-12">
          <div className='d-flex flex-wrap'>
            <HomeComponent item={item}
              courseSearchUserFunction=
              {courseSearchUserFunction} />
            <main className="App-main">
              <ShowCourseComponent
                courses={courses}
                filterCourseFunction={filterCourseFunction}
                addCourseToCartFunction={addCourseToCartFunction}
              />

              <UserCartComponent
                cartItems={cartItems}
                deleteItemFromCart={deleteItemFromCart}
                totalAmountCalculation={
                  totalAmountCalculation
                }
                setcartItems={setcartItems}
              />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
