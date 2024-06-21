import { FormEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartReducerInitialState } from "../types/reducer-types";
import axios from "axios";
import { server } from "../redux/store";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const Shipping = () => {
  const { cartItems, total } = useSelector(
    (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
  );
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    pincode: "",
    state: "",
    country: "",
    city: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const changehandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingInfo(shippingInfo))
    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/pay",{
        state : data.clientSecret
      })
    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong")
    }
  };
  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);
  return (
    <>
      <div className="shipping">
        <button className="back-btn" onClick={() => navigate("/cart")}>
          <BiArrowBack />
        </button>
        <form onSubmit={submitHandler}>
          <h1>Shipping Address</h1>

          <input
            type="text"
            placeholder="Address"
            value={shippingInfo.address}
            name="address"
            onChange={changehandler}
            required
          />
          <input
            type="text"
            placeholder="City"
            value={shippingInfo.city}
            name="city"
            onChange={changehandler}
            required
          />
          <input
            type="text"
            placeholder="State"
            value={shippingInfo.state}
            name="state"
            onChange={changehandler}
            required
          />
          <input
            type="number"
            placeholder="Pin code"
            value={shippingInfo.pincode}
            name="pincode"
            onChange={changehandler}
            required
          />

          <select
            name="country"
            required
            value={shippingInfo.country}
            onChange={changehandler}
          >
            <option value="">Choose Country</option>
            <option value="india">India</option>
            <option value="usa">USA</option>
            <option value="nepal">Nepal</option>
          </select>
          <button>Pay Now</button>
        </form>
      </div>
    </>
  );
};
export default Shipping;
