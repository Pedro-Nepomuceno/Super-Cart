import { Navbar } from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotals, getCartItems } from "./cart/cartSlice";
import Modal from "./components/Modal";

function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const [LocalCartItems, setCartItems] = useState([]);

  const dispatch = useDispatch();

  const handleCalculateTotals = useCallback(() => {
    dispatch(calculateTotals(""));
  }, [dispatch]);

  useEffect(() => {
    handleCalculateTotals();
  }, [cartItems, handleCalculateTotals]);

  useEffect(() => {
    dispatch(getCartItems()).then((items) => {
      if (Array.isArray(items)) {
        setCartItems(items);
      }
    });
  }, [dispatch, LocalCartItems]);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading.. </h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
