import React, { useContext, useState, useEffect } from "react";
import { Route, Routes, useLocation } from 'react-router-dom';
import axios from "axios";
import PrivateError from "../components/authAxios/privateError";
import HomeAdmin from "../components/admin/pages/home/Home";
import List from "../components/admin/pages/list/List";
import Single from "../components/admin/pages/single/Single";
import New from "../components/admin/pages/new/New";
import ProductsList from "../components/admin/pages/listproduscts/producstList";
import { productInputs, userInputs } from "../components/admin/formSource";
import { DarkModeContext } from "../components/admin/context/darkModeContext";
import EditProduct from "../components/admin/pages/editProduct/EditProduct";
import { API_BASE_URL } from "../config";
import Header from "../components/header/Header";
import HomePage from "../pages/HomePage";
import Login from "../components/auth/Login/Login";
import Register from "../components/auth/Register/Register";
import Articles from "../pages/Articles";
import ProductPage from "../components/product/ProductCard";
import Cart from "../pages/Cart";
import Footer from "../components/footer/Footer";
import SearchPage from "../pages/SearchPage"
import EditCategorie from "../components/admin/pages/editCategorie/EditCategorie";
import NewCategorie from "../components/admin/pages/newCategorie/NewCategorie";
import NewReference from "../components/admin/pages/newReference/NewReference";

const Home = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [isAdmin, setAdmin] = useState(null);
  const token = JSON.parse(localStorage.getItem("token"));
  const location = useLocation();

  const getAdmin = async () => {
    const res = await axios.get(`${API_BASE_URL}/testrole `, {
      headers: {
        'x-access-token': token
      },
    });
    setAdmin(res.data);
  }

  useEffect(() => {
    if (token) {
      getAdmin();
    }
  }, [token, location]);

  ///
  const url = location.pathname.split("/")
  const adminopen = url[1]
  // console.log(adminopen);
  return (
    <>
      {adminopen !== "admin" && (
        <Header />
      )}

      <div className={darkMode ? "app dark" : "app"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchPage />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/cart" element={<Cart />} />

          {/* ADMIN ROUTES */}
          {isAdmin && (
            <Route path="/admin">
              <Route index element={<HomeAdmin />} />
              <Route path="login" element={<Login />} />
              <Route path="users">
                <Route index element={<List />} />
                <Route path=":userId" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={userInputs} title="Add New User" />}
                />
              </Route>
              <Route path="products">
                <Route index element={<ProductsList />} />
                <Route path=":productId" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={productInputs} title="Add New Product" />}
                />
                <Route
                  path="categorie/create"
                  element={<NewCategorie inputs={productInputs} title="Add New Categorie" />}
                />
                <Route
                  path="new"
                  element={<New inputs={productInputs} title="Add New Product" />}
                />
                <Route
                  path="addreferences/:productId"
                  element={<NewReference inputs={productInputs} title="Add new Reference" />}
                />
                <Route
                  path="edit/:productId"
                  element={<EditProduct inputs={productInputs} title="Edit Product" />}
                />
                <Route
                  path="editcategorie/:productId"
                  element={<EditCategorie inputs={productInputs} title="Edit Product" />}
                />
              </Route>
            </Route>
          )}
          {!isAdmin && (
            <Route path="/admin" element={<PrivateError />} />
          )}
        </Routes>
      </div>
      {adminopen !== "admin" && (
        <Footer />
      )}

    </>
  )
}

export default Home