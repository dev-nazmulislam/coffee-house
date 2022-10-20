import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./modal.scss";

import CloseIcon from "@mui/icons-material/Close";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "white",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const ModalContainer = (props) => {
  const { open, setOpen, quantity, orderItem, setOrderItem } = props;
  const [user] = useAuthState(auth);
  const [milkValue, setMilkValue] = useState(60);
  const [creamValue, setCreamValue] = useState(75);
  const [latteValue, setLatteValue] = useState(100);

  const [milkName, setMilkName] = useState("Milk: Espresso");
  const [creamName, setCreamName] = useState("Cream: Espresso");
  const [latteName, setLatteName] = useState("Latte: Espresso");

  const handleClose = () => setOpen(false);

  const handleMilkChange = (event) => {
    const spiltValue = event.target.value.split("_");
    setMilkName(`Milk: ${spiltValue[0]}`);
    setMilkValue(spiltValue[1]);
  };
  const handleLatteChange = (event) => {
    const spiltValue = event.target.value.split("_");
    setLatteValue(spiltValue[1]);
    setLatteName(`Latte: ${spiltValue[0]}`);
  };
  const handleCreamChange = (event) => {
    const spiltValue = event.target.value.split("_");
    setCreamValue(spiltValue[1]);
    setCreamName(`Cream: ${spiltValue[0]}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newData = {
      id: orderItem.length + 111,
      productName: [milkName, creamName, latteName],
      price: parseInt(milkValue) + parseInt(creamValue) + parseInt(latteValue),
      quantity: quantity,
      status: "Panding",
      userName: user?.displayName,
      email: user?.email,
    };
    const allOrder = [...orderItem, newData];
    setOrderItem(allOrder);

    handleClose();
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{
            position: "relative",
          }}
        >
          <h1 style={{ fontSize: "30px", margin: "0px", padding: "0px" }}>
            Customize Coffee
          </h1>
          <CloseIcon
            style={{
              position: "absolute",
              top: "-20",
              right: "-20",
              cursor: "pointer",
            }}
            onClick={handleClose}
          />
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FormControl
              style={{
                width: "100%",
              }}
            >
              <FormLabel id="demo-row-radio-buttons-group-label">
                Select Milk
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleMilkChange}
              >
                <FormControlLabel
                  value="Espresso_60"
                  control={<Radio />}
                  label="Espresso"
                />
                <FormControlLabel
                  value="Cappuccino_80"
                  control={<Radio />}
                  label="Cappuccino"
                />
                <FormControlLabel
                  value="Latte_100"
                  control={<Radio />}
                  label="Latte"
                />
              </RadioGroup>
            </FormControl>
            <hr
              style={{
                backgroundColor: "gray",
                height: "2px",
                width: "100%",
              }}
            />
            <FormControl
              style={{
                width: "100%",
              }}
            >
              <FormLabel id="demo-row-radio-buttons-group-label">
                Select Cream
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleCreamChange}
              >
                <FormControlLabel
                  value="Espresso_75"
                  control={<Radio />}
                  label="Espresso"
                />
                <FormControlLabel
                  value="Cappuccino_90"
                  control={<Radio />}
                  label="Cappuccino"
                />
                <FormControlLabel
                  value="Latte_125"
                  control={<Radio />}
                  label="Latte"
                />
              </RadioGroup>
            </FormControl>
            <hr
              style={{
                backgroundColor: "gray",
                height: "2px",
                width: "100%",
              }}
            />
            <FormControl
              style={{
                width: "100%",
              }}
            >
              <FormLabel id="demo-row-radio-buttons-group-label">
                Select Latte
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleLatteChange}
              >
                <FormControlLabel
                  value="Espresso_100"
                  control={<Radio />}
                  label="Espresso"
                />
                <FormControlLabel
                  value="Cappuccino_125"
                  control={<Radio />}
                  label="Cappuccino"
                />
                <FormControlLabel
                  value="Latte_150"
                  control={<Radio />}
                  label="Latte"
                />
              </RadioGroup>
            </FormControl>

            <input
              style={{
                padding: "15px 20px",
                fontSize: "18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                color: "black",
              }}
              type="submit"
              value="Proceed to order"
            />
          </form>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalContainer;
