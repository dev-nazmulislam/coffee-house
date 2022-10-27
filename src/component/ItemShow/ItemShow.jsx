import "./itemShow.scss";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ItemShow = (props) => {
  console.log(props);
  const { item, handleDelete } = props;
  return (
    <>
      <div className="item">
        <div className="left">
          <h2>Special Coffee</h2>
          <h3>Coffee Variant</h3>
          <span>
            {item?.productName[0]}, {item?.productName[1]},{" "}
            {item?.productName[2]}
          </span>
        </div>

        <div className="right">
          <h3>{item.quantity}</h3>
          <h3>{item.price}</h3>
          <DeleteForeverIcon
            onClick={() => handleDelete(item.id)}
            className="icon"
          />
        </div>
      </div>
    </>
  );
};

export default ItemShow;
