// 記得引入方法
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React, { useContext } from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import "@testing-library/jest-dom";
import App from "./App.js";
import PaginationItem from "./components/PaginationItem.js";
import userEvent from "@testing-library/user-event";
import CurrentShoppingListContext from "./context.js";
import ShoppingDropdown from "./components/ShoppingDropdown.js";

configure({ adapter: new Adapter() });

test("WaitForProductData", async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText("Sweatpants")).toBeInTheDocument();
  });
});

test("oepnMiniBasket", async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText("Slides")).toBeInTheDocument();
  });
  await userEvent.click(screen.getByTestId("addToBasket1"));

  const shoppingDropdown = screen.getByRole("button", {
    name: /unread messages/i,
  });
  fireEvent.click(shoppingDropdown);
  // dropdown menu
  await waitFor(() => {
    expect(screen.getByText("Mini basket")).toBeInTheDocument();
  });
});
