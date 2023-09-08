import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import FormData from "form-data";
import { useLocation } from 'react-router-dom';

const NewReference = ({ inputs, title }) => {
  const location = useLocation();
  const url = location.pathname.split("/")
  const id_product = url[4]
  console.log(id_product);
  
  // const { newProduct, setNewProduct } = useForm(); 

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [stock, setStock] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  

  const onChangeColor = (e) => {
    const color = e.target.value;
    setColor(color);
   
  };

  const onChangeSize = (e) => {
    const size = e.target.value;
    setSize(size);
  };

  const onChangeWeight = (e) => {
    const Weight = e.target.value;
    setWeight(Weight);
  }

  const onChangeStock = (e) => {
    const stock = e.target.value;
    setStock(stock);
  }

  

  

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
  data.append("color", color);
  data.append("size", size);
  data.append("weight", weight);
  data.append("stock", stock);
  data.append("productId", id_product);
  

  const config = {
    method: 'post',
    url: 'http://localhost:8000/api/product_reference/create',
    headers: { 
      'x-access-token': token, 
      // ...data.getHeaders()
    },
    data: data,
  };
    axios(config)
.then(function (response) {
  // console.log(JSON.stringify(response.data));
  window.location.href = "/admin/products";
})
.catch(function (error) {
  console.log(error);
});
  

  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
          </div>
          <div className="right">
            <form onSubmit={onSubmit} >
            
                <div className="formInput"  >
                  <label>Color</label>
                  <input type="text" placeholder="Green" name="color" onChange={onChangeColor} />
                </div>

                <div className="formInput"  >
                  <label>Size</label>
                  <input type="text" placeholder="Description" name="Description" onChange={onChangeSize} />
                </div>

                <div className="formInput"  >
                  <label>weight</label>
                  <input type="text" placeholder="0.25" name="weight" onChange={onChangeWeight} />
                </div>

                <div className="formInput"  >
                  <label>Stock</label>
                  <input type="text" placeholder="50" name="stock" onChange={onChangeStock} />
                </div>
             
              <button>Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReference;
