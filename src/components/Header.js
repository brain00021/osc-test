import { Button } from "react-bootstrap";
import ShoppingDropdown from "./ShoppingDropdown.js";
const Header = ({ productsData = [], shoppingCart = [] }) => {
  return (
    <nav className="navbar navbar-light bg-light p-2 ">
      <a className="navbar-brand" href="#">
        <i className="fa fa-heart text-info" aria-hidden="true"></i>
        Clothes Shopping Website
      </a>
      <div className="dropdown ml-auto">
        <ShoppingDropdown productsData={productsData}></ShoppingDropdown>
      </div>
    </nav>
  );
};
export default Header;
