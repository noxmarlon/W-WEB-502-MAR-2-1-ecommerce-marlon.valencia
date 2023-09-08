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
  // console.log(id_product);
  // const { newProduct, setNewProduct } = useForm(); 

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [reduction, setReduction] = useState("");
  const [photos, setPhotos] = useState({});
  const token = JSON.parse(localStorage.getItem("token"));
  const [category, setCategory] = useState([]);
  const [categorie, setCategorie] = useState("");
  const [categorieId, setCategorieId] = useState("");
  const [updateCategories, setUpdateCategories] = useState("");

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'http://localhost:8000/api/product/list/' + id_product,
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    };
  var config2= {
    method: 'get',
    url: `http://localhost:8000/api/category/list`,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };

    axios.defaults.withCredentials = true

    axios(config)
      .then(function (response) {
        // console.log(response.data.categories.name );
        setName(response.data.name);
        setPrice(response.data.price);
        setDescription(response.data.description);
        setStatus(response.data.status);
        setReduction(response.data.reduction);
        setPhotos(response.data.pictures)
        setCategorie(response.data.under_categories.categories.name)
        setCategorieId(response.data.under_categories.categories.id)
        setUpdateCategories(response.data.categories.id)
        
      })
      .catch(function (error) {
        console.log(error);
      });
      ////////////////////////////////////////////////////////////////////////////////////////////////
      axios(config2)
      .then(function (response) {
        // console.log(response.data);
        setCategory(response.data.categories);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
 
  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);

  };

  const onChangePrice = (e) => {
    const price = e.target.value;
    setPrice(price);
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  }

  const onChangeStatus = (e) => {
    const status = e.target.value;
    setStatus(status);
  }

  const onChangeReduction = (e) => {
    const reduction = e.target.value;
    setReduction(reduction);
  }
  const onChangeCategory = (e) => {
    const category = e.target.value;
    setReduction(category);
  }

  const onChangeCategorie = (e) => {
    const updateCategories = e.target.value;
    setUpdateCategories(updateCategories);
    console.log(updateCategories);
  };



  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("status", status);
    data.append("reduction", reduction);
    data.append("category_id", updateCategories);

    Object.keys(photos).forEach(key => {
      data.append("photos", photos[key]);
    });


    const config = {
      method: 'put',
      url: 'http://localhost:8000/api/product/update/' + id_product,
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
            {/* <img
              src={
                photos.length > 0
                  ? "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  :""
              }
              alt=""
            /> */}
          </div>
          <div className="right">
            <form onSubmit={onSubmit} >
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"

                  multiple
                  id="file"
                  name="photos"
                  onChange={(e) => setPhotos(e.target.files)}
                  style={{ display: "true" }}
                />
              </div>


              <div className="formInput"  >
                <label>Name</label>
                <input type="text" value={name} placeholder="Apple Macbook Pro" name="name" onChange={onChangeName} />
              </div>

              <div className="formInput"  >
                <label>Description</label>
                <input type="text" value={description} placeholder="Description" name="Description" onChange={onChangeDescription} />
              </div>

              <div className="formInput"  >
                <label>Price</label>
                <input type="text" value={price} placeholder="2500" name="Price" onChange={onChangePrice} />
              </div>

              <div className="formInput"  >
                <label>Status</label>
                <select name="status" onChange={onChangeStatus} >
                  <option value="on_stock">On Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>

              <div className="formInput"  >
                <label>Reduction</label>
                <input type="text" value={reduction} placeholder="15" name="status" onChange={onChangeReduction} />
              </div>

              <div className="formInput"  >
                <label>Categorie</label>
              <select onChange={onChangeCategorie}>
                  <option value={categorieId}>{categorie}</option>
                
                  {category .map((category) => (
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
