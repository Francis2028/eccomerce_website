import { FaShoppingCart } from "react-icons/fa";

interface HeaderProps {
  toggleCart: () => void;
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ toggleCart, cartItemCount }) => {
  return (
    <header className="header">
      <div className="header-info">
        <h1>Ecommerce</h1>
        <div className="cart-icon" onClick={toggleCart} style={{ cursor: "pointer", position: "relative" }}>
          <FaShoppingCart size={24} />
          {cartItemCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
              }}
            >
              {cartItemCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
