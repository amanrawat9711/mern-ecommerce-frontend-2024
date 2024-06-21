import { Link } from "react-router-dom";
import { FaSearch,FaShoppingBag,FaSignInAlt,FaUser,FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType{
    user:User|null;
}
const Header = ({user}:PropsType) => {
    const [isOpen,setIsOpen] = useState(false)
    const logouthandler = async ()=>{
       try {
        await signOut(auth)
        toast.success("signout successfully")
        setIsOpen(false)
       } catch (error) {
        toast.error("sign out failed")
       }
    }
    return (
      <>
        <nav className="header">
            <Link onClick={()=>setIsOpen(false)} to={"/"}>Home</Link>
            <Link onClick={()=>setIsOpen((prev)=>!prev)} to={"/search"}>
                <FaSearch/>
            </Link>
            <Link onClick={()=>setIsOpen((prev)=>!prev)} to={"/cart"}>
                <FaShoppingBag/>
            </Link>
            { user?._id?(
                <>
                <button onClick={()=>setIsOpen((prev)=>!prev)}>
                    <FaUser/>
                </button>
                <dialog open={isOpen}>
                    <div>
                        {
                            user.role==="admin"&& (
                                <Link onClick={()=>setIsOpen((prev)=>!prev)} to={"/admin/dashboard"}> Admin</Link>
                            )
                        }
                        <Link onClick={()=>setIsOpen((prev)=>!prev)} to={"/orders"}>orders
            </Link>
                        <button onClick={logouthandler}>
                <FaSignOutAlt/>
                </button>
                    </div>
                </dialog>
                    </>
            ):(  <Link to={"/login"}>
                <FaSignInAlt/>
            </Link>)
            }
        </nav>
      </>
    );
  }
  
  export default Header;