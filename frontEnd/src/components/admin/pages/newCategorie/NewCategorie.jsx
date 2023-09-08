import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import FormData from "form-data";

const NewCategorie = ({ inputs, title }) => {
  
  // const { newProduct, setNewProduct } = useForm(); 

  const [name, setName] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
   
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
  data.append("name", name);
  
  const config = {
    method: 'post',
    url: 'http://localhost:8000/api/category/create',
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
                <div className="formInput"  >
                  <label>Name Categorie</label>
                  <input type="text" placeholder="Categorie Name" name="name" onChange={onChangeName} />
                </div>

                
             
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCategorie;
