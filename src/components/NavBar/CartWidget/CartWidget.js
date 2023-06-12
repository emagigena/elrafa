import "./CartWidget.css";
import { Link } from "react-router-dom";
import iconcarrito from "./iconcarrito.png";


function CartWiget(obj) {
  return (
    <Link to="/Cart">
      <div className="Cart">
        <img src={iconcarrito} alt="cart" />
        {obj.number ? (
          <span className="badge bg-primary">{obj.number}</span>
        ) : (
          <></>
        )}
      </div>
    </Link>
  );
}

export default CartWiget;
