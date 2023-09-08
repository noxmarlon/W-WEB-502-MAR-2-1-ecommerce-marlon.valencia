import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { prodructColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_AUTH_URL, API_BASE_URL, API_PUBLIC_URL } from "../../../../config";

const AdminProducst = () => {
  // const [data, setData] = useState(userRows);

  const token = JSON.parse(localStorage.getItem("token"));
  const [data, setData] = useState([]);
  const getProduct = async () => {
    const res = await axios.get(`${API_BASE_URL}/product/list`, {
      headers: {
        'x-access-token': token
      },
    });
    console.log(res.data.products[0].under_categories.categories.name);
    setData(res.data.products);
  }
  useEffect(() => {
    if (token) {
      getProduct();
    }

  }, [token]);


  const handleDelete = (id) => {
    const config = {
      method: 'delete',
      url: `${API_BASE_URL}/product/delete/${id}`,
      headers: {
        'x-access-token': token,
      },

    };
    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        window.location.href = "/admin/products";
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"edit/" + params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>
            <Link to={"editreferences/" + params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit Ref</div>
            </Link>
            <Link to={"addreferences/" + params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">Add Ref</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>

        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Product
        <Link to="/admin/products/new" className="link">
          Add New Product
        </Link>

      </div><div className="datatableTitle">
        📊
        <Link to="/admin/products/categorie/create" className="link">
          Create Categorie
        </Link>

      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={prodructColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default AdminProducst;
