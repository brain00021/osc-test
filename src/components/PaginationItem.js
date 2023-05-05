import { Pagination } from "react-bootstrap";

const PaginationItem = ({ pageNumber = 0, onClick = () => {}, pageActive }) => {
  let active = pageActive;
  let items = [];
  for (let number = 1; number <= pageNumber; number++) {
    items.push(
      <Pagination.Item
        onClick={() => {
          onClick(number);
        }}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }
  return <Pagination>{items}</Pagination>;
};

export default PaginationItem;
