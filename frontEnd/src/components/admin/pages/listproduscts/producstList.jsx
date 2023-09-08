import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import AdminProducst from "../../components/products/adminProdusct"

const ProductsList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <AdminProducst />
      </div>
    </div>
  )
}

export default ProductsList