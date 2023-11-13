import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const Wishlist = () => {
    const {user} = useContext(AuthContext);

    // Each blog should have a title, image, short description, category, details button and 
    // remove wishlist button  
    const [wishlist, setWishlist] = useState([]);

    const url = `http://localhost:5000/wishlist?email=${user?.email}`;

    useEffect(()=>{
        fetch(url).then(res=>res.json()).then(data=>{
            console.log(data)
            setWishlist(data)
        })
    },[])
    console.log(wishlist)


    return (
        <div className="min-h-screen container mx-auto">
            
        </div>
    );
};

export default Wishlist;