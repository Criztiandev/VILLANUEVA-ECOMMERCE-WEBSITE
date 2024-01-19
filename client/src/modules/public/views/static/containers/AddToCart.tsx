import { RootReducer } from "@/service/store";
import { toggleCart } from "@/service/store/slice/cart.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import Modal from "@/components/Modal";
import { Link } from "react-router-dom";

const AddToCart = () => {
  const {
    isActive,
    count,
    products = [],
  } = useSelector((state: RootReducer) => state.cart);
  const dispatch = useDispatch();
  const handleToggleCart = () => dispatch(toggleCart());

  useEffect(() => {
    if (isActive) {
      // turn off the scroll bar
      document.body.style.overflow = "hidden";
    }

    return () => {
      // turn on the scroll bar
      document.body.style.overflow = "unset";
    };
  }, [isActive]);

  const totalValue =
    products?.length > 0
      ? products.reduce((acc, item) => {
          return (acc + 200 * item.quantity) as number;
        }, 0)
      : 0;

  return (
    <>
      {isActive && (
        <div className="fixed top-0 left-0 grid grid-cols-[auto_500px] w-full z-50">
          <div className="bg-black opacity-30" onClick={handleToggleCart}></div>
          <div className="h-screen border bg-white p-4 flex flex-col justify-between ">
            <div>
              <div className="flex gap-3">
                <i className="bx bx-shopping-bag text-[24px]"></i>
                <span>{count} Items</span>
              </div>

              <div className="my-8 flex flex-col gap-4">
                {products?.map((items) => (
                  <CartItem key={items._id} {...items} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Modal.Button
                target="checkout-warning"
                className="btn"
                title={`   Checkout ${totalValue}`}
              />
              <button className="btn">View Cart</button>
            </div>
          </div>
        </div>
      )}

      <Modal id="checkout-warning">
        <h2 className="text-[24px] font-semibold mb-4">
          Proceeding with Checkout
        </h2>

        <p>
          Brace yourself for a departure from the ordinary as you check out. Be
          prepared for a surge in charm, style, and potential admirers. Safe
          travels into the extraordinary!
        </p>
        <div className="flex my-4 flex-col gap-2">
          <Link to={"/checkout"} className="btn w-full">
            Confirm
          </Link>
          <Modal.Button
            target="checkout-warning"
            className="btn"
            title={"Not Yet"}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddToCart;
