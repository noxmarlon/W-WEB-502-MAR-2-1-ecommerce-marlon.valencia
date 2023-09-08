import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import FormData from "form-data";
import { useLocation } from 'react-router-dom';

const EditProduct = ({ inputs, title }) => {

  const location = useLocation();
  const url = location.pathname.split("/")
  const id_product = url[4]

  const [name, setName] = useState("");
  const [categorie, setCategorie] = useState("");
  const [categorieId, setCategorieId] = useState("");
  const [updateCategories, setUpdateCategories] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'http://localhost:8000/api/product/list/' + id_product,
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    };
    var configCategories = {
      method: 'get',
      url: 'http://localhost:8000/api/category/list/',
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    };

    axios.defaults.withCredentials = true

    axios(config)
      .then(function (response) {
        setName(response.data.name);
        setCategorie(response.data.categories[0].name);
        setCategorieId(response.data.categories[0].id);
        setUpdateCategories(response.data.categories[0].id);
        
      })
      .catch(function (error) {
        console.log(error);
      });


        axios(configCategories)
      .then(function (response) {
        setAllCategories(response.data.categories);
        // console.log(response.data.categories);
       
      })
      .catch(function (error) {
        console.log(error);
      });
      
  }, []);

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);

  };

  const onChangeCategorie = (e) => {
    const updateCategories = e.target.value;
    setUpdateCategories(updateCategories);
    console.log(updateCategories);
  };

 



  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("categoryId", updateCategories );
    data.append("productId",  id_product);
    // data.append("price", price);
    // data.append("description", description);
    // data.append("status", status);
    // data.append("reduction", reduction);

    const config = {
      method: 'post',
      url: 'http://localhost:8000/api/product/add_category/',
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
          <div className="right">
            <form onSubmit={onSubmit} >
             

              <div className="formInput"  >
                <label>categorie for {name}</label>
                <select name="categoryId"  onChange={onChangeCategorie}>
                {/* <option value={categorieId} selected> {categorie}</option> */}
                {allCategories.map((category) => (
                    <option value={category.id} key={category.id}>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</option>
                  ))}
  
                </select>
              </div>


              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
