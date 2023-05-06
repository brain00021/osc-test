import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { useState, useEffect, useRef, useContext, createContext } from "react";
import GlobalContext from "../context.js";
import { request, gql } from "graphql-request";

const ShoppingItem = ({ productDetail }) => {
  let { productPrice, img, id, title, productValue } = productDetail;
  const { shoppingCartStatus } = useContext(GlobalContext);
  const [shoppingCart, setShoppingCart] = shoppingCartStatus;
  const removeShoppingListItem = (productId) => {
    let tempShoppingCart = shoppingCart.filter((item) => item.id !== productId);
    setShoppingCart([...tempShoppingCart]);
  };

  const add = () => {
    let temp = productDetail;
    temp.productValue++;
    setShoppingCart([...shoppingCart]);
  };
  const minus = () => {
    let temp = productDetail;
    temp.productValue--;
    if (temp.productValue == 0) {
      let tempShoppingCart = shoppingCart.filter(
        (item) => item.id !== productDetail.id
      );
      setShoppingCart([...tempShoppingCart]);
    } else {
      setShoppingCart([...shoppingCart]);
    }
  };

  return (
    <tr className="shoppingListItem" data-testid={`shoppingListItem${title}`}>
      <td className="align-middle text-center">
        <a
          role="button"
          className="text-muted"
          onClick={() => {
            removeShoppingListItem(id);
          }}
        >
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </a>
      </td>
      <td className="align-middle text-center">
        <img
          className="card-img-top"
          style={{ width: 80, height: 80 }}
          src={img}
        />
      </td>
      <td className="align-middle">{title}</td>

      <td className="align-middle">
        <div className="d-flex flex-column align-items-center">
          <i
            role="button"
            className="fa  fa-sort-up"
            onClick={() => {
              add();
            }}
          ></i>
          <div style={{ marginTop: 10, marginBottom: 10 }}> {productValue}</div>
          <i
            role="button"
            className="fa  fa-sort-down"
            onClick={() => {
              minus();
            }}
          ></i>
        </div>
      </td>
      <td className="align-middle text-right">${productPrice}</td>
    </tr>
  );
};
const ShoppingDropdown = ({ productsData = [] }) => {
  const { shoppingCartStatus } = useContext(GlobalContext);
  const [shoppingCart, setShoppingCart] = shoppingCartStatus;
  const displayShoppingList = shoppingCart;
  const totalPrice = displayShoppingList.reduce((acc, item, index) => {
    return (acc = acc + Number(item.productPrice) * item.productValue);
  }, 0);
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="primary"
        id="dropdown-basic"
        className="btn btn-sm btn-cart"
      >
        <i
          className="fa fa-shopping-cart text-dark fa-2x"
          aria-hidden="true"
        ></i>
        <span className="badge badge-pill badge-danger">
          {shoppingCart.length}
        </span>
        <span className="sr-only">unread messages</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="px-2" style={{ width: "auto", minWidth: 300 }}>
        <h4>Mini basket</h4>
        <table className="table table-md">
          <tbody>
            {displayShoppingList.map((product, index) => {
              return (
                <ShoppingItem
                  key={index}
                  productDetail={product}
                ></ShoppingItem>
              );
            })}
          </tbody>
        </table>
        <div className="d-flex pr-2 pl-2 justify-content-between">
          <div className="d-flex align-items">
            <b className="pr-2">CAD</b>
            <h4>$ {totalPrice}</h4>
          </div>

          <a href="#" className="btn btn-primary btn-block">
            <i className="fa fa-cart-plus " aria-hidden="true"></i> Check out
          </a>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ShoppingDropdown;
