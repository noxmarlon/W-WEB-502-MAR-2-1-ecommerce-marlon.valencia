import { useEffect, useState } from "react";
import axios from "axios";
import { API_AUTH_URL } from '../../../config'


axios.defaults.withCredentials = true

const CartButton = (props) => {
    const [cartContent, setCartContent] = useState([])
    const [item, setItem] = useState("")

    // const setCart = () => {
    //     if (localStorage.getItem("cart")) {
    //         setCartContent(localStorage.getItem("cart"))
    //     } else {

    //     }
    // }

    // const handle_addTocart = () => {

    // }

    const add_to_cart = (e) => {
        if (localStorage.getItem("cart")) {
            setCartContent([...cartContent, e])
        } else {
            setCartContent([...cartContent, e])
        }
    }

    useEffect(() => {
        // console.log(cartContent);
        localStorage.setItem("cart", cartContent)
    }, [cartContent]);

    return (
        <>
            <button className="btn btn-cart" value={props.itemId} onClick={(e) => { add_to_cart(e.target.value) }}>Ajouter</button>
        </>
    )

}

export default CartButton;