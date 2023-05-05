import { useState, useEffect, useRef, useContext, createContext } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import CurrentShoppingListContext from "../context.js";
import PaginationItem from "./PaginationItem.js";
const Producsts = ({ productsData = [] }) => {
  const [currentProductList, setCurrentProductsList] = useState([]);
  const [pageActive, setPageActive] = useState(0);
  const displayProductsNumber = 6;
  const context = useContext(CurrentShoppingListContext);
  const totalPage = Math.ceil(
    Number(productsData.length) / displayProductsNumber
  );

  const pagePaginationChange = (pageNumber) => {
    setPageActive(pageNumber);

    const max = pageNumber * displayProductsNumber;
    const min = max - displayProductsNumber + 1;
    let tempProductList = productsData.filter(
      (data, index) => index + 1 >= min && index + 1 <= max
    );
    if (tempProductList.length > 0) {
      setCurrentProductsList([...tempProductList]);
    }
  };

  const addToBasket = (product) => {
    // console.log(shoppingCart, "currentProductList");
    let findShoppingCartItem = context.shoppingCart.find(
      (item) => item.id === product.id
    );
    if (!findShoppingCartItem) {
      // console.log("addToBasket", context.shoppingCart);
      let tempShoppingCart = context.shoppingCart;
      tempShoppingCart.push(product);
      context.setShoppingCart([...tempShoppingCart]);
      // shoppingCart.push(id);
    }
    if (findShoppingCartItem) {
      let tempShoppingCart = context.shoppingCart;
      findShoppingCartItem.productValue++;
      console.log(
        "findShoppingCartItem",
        findShoppingCartItem,
        tempShoppingCart
      );
      context.setShoppingCart([...tempShoppingCart]);
    }
  };

  useEffect(() => {
    // init
    console.log("test2");
    pagePaginationChange(1);
  }, [productsData]);

  return (
    <div className="container main-contant mb-1">
      <div className="row">
        <div className="col-md-12 py-5">
          <div className="tab-content">
            <div className="tab-pane active" id="list">
              <div className="row">
                {currentProductList.map((product, index) => {
                  let { description, featuredImage, id, title, variants } =
                    product.node;
                  let productPrice = variants.edges.find(
                    (item) => item.node.price
                  );
                  console.log(productPrice.node.price.amount);
                  return (
                    <div className="col-md-4 mb-4" key={index}>
                      <div className="card border-0 box-shadow text-left h-100">
                        <img
                          className="card-img-top"
                          src={featuredImage.url}
                          alt="Card image cap"
                        />
                        <div className="card-body">
                          <h4 className="card-title">{title}</h4>
                          <h4 className="card-title">
                            $ {productPrice.node.price.amount}{" "}
                            {productPrice.node.price.currencyCode}
                          </h4>

                          <p className="card-text text-left">{description}</p>
                        </div>
                        <div className="card-footer border-top-0 bg-white">
                          <a
                            onClick={() => {
                              addToBasket({
                                id,
                                productValue: 1,
                                productPrice: productPrice.node.price.amount,
                                title,
                                img: featuredImage.url,
                              });
                            }}
                            data-testid={`addToBasket${index}`}
                            className="btn btn-outline-secondary btn-block btn-sm"
                          >
                            <i
                              className="fa fa-cart-plus p-1"
                              aria-hidden="true"
                            ></i>
                            add to basket
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <nav aria-label="Page navigation" className="my-5">
                <ul className="pagination justify-content-center">
                  <PaginationItem
                    pageNumber={totalPage}
                    onClick={(pageNumber) => pagePaginationChange(pageNumber)}
                    pageActive={pageActive}
                  ></PaginationItem>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Producsts;
