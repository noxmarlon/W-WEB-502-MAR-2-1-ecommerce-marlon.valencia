import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState, useEffect } from "react";

const List = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [produts, setProduts] = useState([]);
  const getProduct = async () => {
    const res = await axios.get("http://localhost:8000/api/product/list", {
      headers: {
        'x-access-token': token
      },
    });
    setProduts(res.data.products);
    console.log(res.data.products);
  }
    useEffect(() => {
      if(token){
      getProduct();
      }
      
    }, [token]);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Description</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {produts.map((products) => (
            <TableRow key={products.id}>
              <TableCell className="tableCell">{products.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={`http://localhost:8000${products.pictures[0].picture}`} alt="" className="image" />
                  {products.name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{products.description}</TableCell>
              {/* <TableCell className="tableCell">{products.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
