import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type ProductProps = {
  productId: string;
  price: number;
  stock: number;
  photo: string;
  name: string;
  handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  price,
  stock,
  photo,
  name,
  handler,
}: ProductProps) => {
  return (
    <>
      <div className="productcard">
        <img src={`${server}/${photo}`} alt={name} />
        <p>{name}</p>
        <span>₹{price}</span>
        <div>
          <button
            onClick={() =>
              handler({ productId, price, stock, photo, name, quantity:1 })
            }
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
