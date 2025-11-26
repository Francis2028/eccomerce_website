import { FaShoppingBag } from "react-icons/fa";
import type { ProductInterface } from "../types"; // optional: if you create a types file

interface Props {
  product: ProductInterface;
  onBack: () => void;
  addToCart: (product: ProductInterface) => void;
}

const SelectedProduct: React.FC<Props> = ({ product, onBack, addToCart }) => {
  return (
    <div className="full-product">
      <button onClick={onBack}>Back to products</button>
      <h2>{product.title}</h2>
      <img
        src={product.image}
        alt={product.title}
        width={300}
        style={{ objectFit: "contain" }}
      />
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <button className="add-to-cart-btn" onClick={(e) => {
                e.stopPropagation(); // Prevent triggering full product view
                addToCart(product);
              }}>
        <FaShoppingBag /> Add to cart
      </button>
    </div>
  );
};

export default SelectedProduct;
