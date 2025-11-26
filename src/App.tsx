import { useState, useEffect } from "react";
import Header from "./components/Header";
import SelectedProduct from "./components/SelectedProduct";
import SearchBar from "./components/SearchBar";
import type { ProductInterface } from "./types";

interface CartItem {
  product: ProductInterface;
  quantity: number;
}

function App() {

  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductInterface | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // Sidebar state

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: ProductInterface[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

const addToCart = (product: ProductInterface) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item.product.id === product.id);

    if (existingItem) {
      // Increment quantity if already in cart
      return prevCart.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Add new product to cart
      return [...prevCart, { product, quantity: 1 }];
    }
  });
};



  if (loading) return <p>Loading products...</p>;

  if (selectedProduct)
    return (
      <SelectedProduct
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        addToCart={addToCart}
      />
    );

  return (
    <div>
      <Header toggleCart={() => setIsCartOpen(!isCartOpen)} cartItemCount={cart.length} />
      <SearchBar />
      {/* Cart Sidebar */}
      <div className="cart-sidebar" style={{
          position: "fixed",
          top: 0,
          right: isCartOpen ? 0 : "-400px", // slide in/out
          width: "300px",
          height: "100%",
          background: "white",
          boxShadow: "-2px 0 5px rgba(0,0,0,0.3)",
          transition: "right 0.3s ease-in-out",
          padding: "20px",
          zIndex: 1000,
          overflowY: "auto",
        }}>
  <button onClick={() => setIsCartOpen(false)}>Close</button>
  <h3>Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</h3>
  {cart.length === 0 && <p>Your cart is empty.</p>}
  {cart.map((item, index) => (
    <div key={item.product.id} className="cart-item" style={{ display: "flex", marginBottom: "10px" }}>
      <img src={item.product.image} alt={item.product.title} width={50} />
      <div style={{ marginLeft: "10px" }}>
        <p>{item.product.title}</p>
        <p>${item.product.price.toFixed(2)}</p>
        <p>Qty: {item.quantity}</p>
      </div>
      <button
        onClick={() => setCart((prev) => prev.filter((_, i) => i !== index))}
        style={{ marginLeft: "auto" }}
      >
        Remove
      </button>
    </div>
  ))}
  {cart.length > 0 && (
    <p>Total: ${cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}</p>
  )}
  <p>Buy Now</p>
</div>


      {/* Product Grid */}
      <h2 style={{textAlign: "center"}}>Shop Product</h2>
      <div className="product-container" >
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => setSelectedProduct(product)}
            style={{ cursor: "pointer", border: "1px solid #ccc", padding: "10px"}}
          >
            <img src={product.image} alt={product.title} width={150} style={{ objectFit: "contain" }} />
            <h4>{product.title}</h4>
            <p className="description">{product.description}</p>
            <div className="product-price">
              <p>${product.price.toFixed(2)}</p>
            </div>
            <button
              className="add-to-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
