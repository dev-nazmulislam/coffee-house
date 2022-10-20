import "./order.scss";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import ItemShow from "../ItemShow/ItemShow";
import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import ModalContainer from "../modal/ModalContainer";
import AddIcon from "@mui/icons-material/Add";

const Order = () => {
  const [open, setOpen] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [orderItem, setOrderItem] = useState([]);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleOpen = () => {
    if (user) {
      setOpen(true);
    } else {
      navigate("/login");
    }
  };
  if (loading) {
    return <p>Loding...</p>;
  }
  const total = orderItem.reduce((accumulator, object) => {
    return accumulator + object.quantity * object.price;
  }, 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrderItem([]);
    alert(`Your Order is Confirm Please Pay ₹${total}`);
  };
  const handleDelete = (itemId) => {
    const remaining = orderItem.filter((item) => item.id !== itemId);
    setOrderItem(remaining);
  };

  return (
    <div className="home">
      <div className="card">
        <div>
          <div className="title">
            <h1>Coffee Ordering app</h1>
          </div>
          <form>
            <ButtonGroup
              variant="contained"
              className="buttonContainer"
              aria-label="rounded primary button group"
            >
              <input
                style={{ width: "100%" }}
                type="text"
                value={user?.displayName}
                placeholder="Enter Customer Name"
              />
              <input
                onChange={(e) => setQuantity(e.target.value)}
                min={1}
                type="number"
                placeholder="Enter number of cups"
              />
              <div>
                <Button variant="text" onClick={handleOpen}>
                  <AddIcon className="icon" />
                </Button>
                <ModalContainer
                  open={open}
                  setOpen={setOpen}
                  quantity={quantity}
                  orderItem={orderItem}
                  setOrderItem={setOrderItem}
                />
              </div>
            </ButtonGroup>
            <div className="item-container">
              <div className="item-header">
                <div className="left">
                  <h3>Items</h3>
                </div>
                <div className="right">
                  <h3>Quantity</h3>
                  <h3>Price</h3>

                  <h3>Delete</h3>
                </div>
              </div>
              <hr />
              {orderItem.length === 0 ? (
                <div className="items">
                  <h1>Cart is Empty</h1>
                </div>
              ) : (
                <div className="items">
                  {orderItem.map((item) => (
                    <ItemShow
                      key={item.id}
                      item={item}
                      handleDelete={handleDelete}
                    />
                  ))}

                  <h1>Total Price: ₹{total}</h1>
                </div>
              )}
            </div>
            <input
              onClick={handleSubmit}
              type="submit"
              className="submit-button"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
