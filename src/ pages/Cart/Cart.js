import React, { useEffect, useState } from 'react';
import './Cart.scss';
import { BsCheckCircle } from 'react-icons/bs';
import Category from './Category/Category';
import CartInfo from './CartInfo/CartInfo';

function Cart() {
  const [cartList, setCartList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  function selectAllItems() {
    if (selectedItems.length === cartList.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartList);
    }
  }

  function deleteSelectedItems() {
    let filteredCartList = cartList;
    function run() {
      selectedItems.forEach(selectedItem => {
        filteredCartList = filteredCartList.filter(cartItem => {
          return cartItem.id !== selectedItem.id;
        });
        setCartList(filteredCartList);
      });
    }
    run();
  }

  function selectItems(item) {
    if (
      selectedItems.some(selectedItem => {
        return selectedItem.id === item.id;
      })
    ) {
      const filteredSelectedItems = selectedItems.filter(selectedItem => {
        return selectedItem.id !== item.id;
      });
      setSelectedItems(filteredSelectedItems);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  }

  function deleteItems(item) {
    const filteredCartList = cartList.filter(cartItem => {
      return cartItem.id !== item.id;
    });
    setCartList(filteredCartList);
  }

  function minusQuantity(item) {
    const updatedCartList = [...cartList];
    updatedCartList.forEach(cartItem => {
      if (cartItem.id === item.id) cartItem.quantity--;
    });
    setCartList(updatedCartList);
  }

  function plusQuantity(item) {
    const updatedCartList = [...cartList];
    updatedCartList.forEach(cartItem => {
      if (cartItem.id === item.id) cartItem.quantity++;
    });
    setCartList(updatedCartList);
  }

  useEffect(() => {
    const loadCartData = async () => {
      const response = await fetch('/data/cart/cart.json');
      const data = await response.json();
      setCartList(data);
    };
    loadCartData();
  }, []);

  return (
    <div className="cart">
      <h1>장바구니</h1>
      <div className="wrap">
        <section className="select">
          <span className="selectAll">
            <BsCheckCircle
              className={`check ${
                selectedItems.length === cartList.length && 'clickedCheck'
              }`}
              onClick={selectAllItems}
            />
            <p className="text">{`전체선택(${selectedItems.length}/${cartList.length})`}</p>
          </span>
          <span className="selectToDelete" onClick={deleteSelectedItems}>
            선택삭제
          </span>
        </section>
        <div className="container">
          <main className="cartList">
            <section className="list">
              <Category
                packaging="냉장"
                selectedItems={selectedItems}
                selectItems={selectItems}
                deleteItems={deleteItems}
                minusQuantity={minusQuantity}
                plusQuantity={plusQuantity}
                items={cartList.filter(item => item.packaging === '냉장')}
              />
              <Category
                packaging="냉동"
                selectedItems={selectedItems}
                selectItems={selectItems}
                deleteItems={deleteItems}
                minusQuantity={minusQuantity}
                plusQuantity={plusQuantity}
                items={cartList.filter(item => item.packaging === '냉동')}
              />
              <Category
                packaging="상온"
                selectedItems={selectedItems}
                selectItems={selectItems}
                deleteItems={deleteItems}
                minusQuantity={minusQuantity}
                plusQuantity={plusQuantity}
                items={cartList.filter(item => item.packaging === '상온')}
              />
            </section>
          </main>

          <aside>
            <CartInfo
              priceSum={selectedItems.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
              }, 0)}
            />
          </aside>
        </div>
        <section className="select">
          <span className="selectAll">
            <BsCheckCircle
              className={`check ${
                selectedItems.length === cartList.length && 'clickedCheck'
              }`}
              onClick={selectAllItems}
            />
            <p className="text">{`전체선택(${selectedItems.length}/${cartList.length})`}</p>
          </span>
          <span className="selectToDelete" onClick={deleteSelectedItems}>
            선택삭제
          </span>
        </section>
      </div>
    </div>
  );
}

export default Cart;