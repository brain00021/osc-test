// import logo from "./logo.svg";
// import Link from "./link.js";
import { Button, InputGroup } from "react-bootstrap";
import { useState, useEffect, useRef, useContext, createContext } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Producsts from "./components/Producsts";
import CurrentShoppingListContext from "./context.js";
import "./App.scss";

// const currentShoppingListContext = createContext(null);
const shoppingList = [];

function App() {
  const [currentProductsList, setCurrentProductsList] = useState([]);
  // const shoppingCart = useRef([]);
  const [shoppingCart, setShoppingCart] = useState(shoppingList);

  useEffect(() => {
    // init setting

    // get Product
    const fetchProductsData = async () => {
      const request = await fetch(
        "https://mock.shop/api?query={products(first:%2020){edges%20{node%20{id%20title%20description%20featuredImage%20{id%20url}%20variants(first:%203){edges%20{node%20{price%20{amount%20currencyCode}}}}}}}}"
      );
      const response = await request.json();
      const currentList = response.data.products.edges;
      if ((currentList.length > 0, currentProductsList.length < 1)) {
        setCurrentProductsList(currentList);
      }
    };

    fetchProductsData().catch(console.error);
  }, []);
  return (
    <div className="App">
      <CurrentShoppingListContext.Provider
        value={{ shoppingCart, setShoppingCart }}
      >
        <Header
          productsData={currentProductsList}
          shoppingCart={shoppingCart.current}
        ></Header>
        <Banner></Banner>
        <Producsts
          productsData={currentProductsList}
          shoppingCart={shoppingCart.current}
        ></Producsts>
        <Footer></Footer>
      </CurrentShoppingListContext.Provider>
    </div>
  );
}

export default App;
