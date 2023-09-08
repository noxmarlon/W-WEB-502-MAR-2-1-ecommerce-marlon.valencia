import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import FormData from "form-data";

const New = ({ inputs, title }) => {

    // const { newProduct, setNewProduct } = useForm(); 

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [reduction, setReduction] = useState("");
    const [photos, setPhotos] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [category, setCategory] = useState("1");
    const [under_categories, setUnder_categories] = useState("");
    const token = JSON.parse(localStorage.getItem("token"));


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

    const onChangeUnder_category = (e) => {
        const under_category = e.target.value;
        setUnder_categories(under_category);
    }

    const onChangecategory = (e) => {
        const category = e.target.value;
        setCategory(category);
        // console.log(category);
    }
    useEffect(() => {
        var config2 = {
            method: 'get',
            url: `http://localhost:8000/api/category/list`,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        axios.defaults.withCredentials = true
        ////////////////////////////////////////////////////////////////////////////////////////////////
        axios(config2)
            .then(function (response) {
                // console.log(response.data);
                setAllCategory(response.data.categories);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", name);
        data.append("price", price);
        data.append("description", description);
        data.append("status", status);
        data.append("reduction", reduction);
        data.append("category_id", category);
        data.append("under_category_id", under_categories)
        Object.keys(photos).forEach(key => {
            data.append("photos", photos[key]);
        });


        const config = {
            method: 'post',
            url: 'http://localhost:8000/api/product/create',
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

        console.log(photos[0]);
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
                                <input type="text" placeholder="Apple Macbook Pro" name="name" onChange={onChangeName} />
                            </div>

                            <div className="formInput"  >
                                <label>Description</label>
                                <input type="text" placeholder="Description" name="Description" onChange={onChangeDescription} />
                            </div>

                            <div className="formInput"  >
                                <label>Price</label>
                                <input type="text" placeholder="2500" name="Price" onChange={onChangePrice} />
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
                                <input type="text" placeholder="15" name="status" onChange={onChangeReduction} />
                            </div>

                            <div className="formInput"  >
                                <label>Sous catégorie id</label>
                                <input type="text" placeholder="15" name="under_categories" onChange={onChangeUnder_category} />
                            </div>

                            <div className="formInput"  >
                                <label>Categorie</label>
                                <select onChange={onChangecategory}>
                                    {allCategory.map((category) => (
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

export default New;
