import { useState, useEffect } from "react";
import axios from 'axios';
import './Products.css'
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_PRODUCTS, PURCHASE_ITEMS } from '../../actions';
import { useHistory } from 'react-router';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ModalAdd from '../Modal/ModalAdd';
import ModalUpdate from '../Modal/ModalUpdate';
import EditIcon from '@material-ui/icons/Edit';

interface IPurchased {
  title: string,
  price: number,
  productID: number
}

// interface IData {
//   id: number,
//   title: string,
//   description: string,
//   rating: string,
//   price: number,
//   image: string
// }
const Products = () => {
  const [data, setData] = useState<IData[]>([]);
  //const first = data.slice(0, 6);
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.reducer.products);
  const selector1 = useSelector((state: any) => state.reducer.loggedUserID);
  const routerHistory = useHistory();
  const [total, setTotal] = useState<number>(0);
  const [searchKey, setSearchKey] = useState("");
  const [show, setShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState(0);

  const handleCloseAddModal = () => { setShowAddModal(false) };
  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseUpdateModal = () => { setShowUpdateModal(false) };
  const handleShowUpdateModal = () => setShowUpdateModal(true);

  const handleClose = () => { setShow(false) };
  const handleShow = () => setShow(true);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  }

  const sendData = () => {
    const products = selector;
    const userId = selector1.loggedUserID;
    const user = {
      id: userId,
      products: products
    };

    axios.post('http://localhost:3001/usersshoes', user)
      .then(res => {

      })
  }

  const purchaseItems = () => {
    handleClose();
    sendData()
    toast.info("Items purchased!");
    dispatch(
      {
        type: PURCHASE_ITEMS
      })
    routerHistory.push('/');
  }
  console.log(searchKey);



  const body = (
    <div>
      <div className="modalHeader">
        <img className="headerPNG" src="https://i.ibb.co/fG8tRnp/toppng-com-cart-png-clipart-icon-gi-h-ng-400x356.png" />
        {selector && selector?.length === 0 ? <h1>No items in cart</h1> :
          (<h1 className="headProductDetails">Items in cart</h1>)}
        <br></br>
      </div>
      <div>
        {selector && selector?.length > 0 ? selector ? selector.map((data: IPurchased, index: number) => (
          <div>
            <b>{index + 1 + ". " + data.title + " - " + data.price + " €"}</b><br></br>
          </div>
        )) : null : null}
      </div>
      <br></br>
      {selector && selector?.length !== 0 ? <div>
        <b>Total: </b>{selector?.length > 0 ? selector[selector.length - 1].total + " €" : 0}
        <br></br><br></br>
        <Button onClick={purchaseItems} variant="contained" color="primary">Purchsase items</Button>
      </div> : null}


    </div>
  );

  const downloadData = () => {
    axios.get('http://localhost:3001/findAll')
      .then(res => {
        setData(res.data);
      })
  }

  useEffect(() => {
    document.title = "Sales App";
    downloadData();
  }, []);

  const details = (id: number) => {
    window.localStorage.setItem("id", id.toString());
    routerHistory.push('/details/');
  };

  const buyNow = (title: string, price: number,id: number) => {
    setTotal(total + price);
    console.log(total);

    dispatch(
      {
        type: UPDATE_PRODUCTS,
        payload:
        {
          //data
          title: title,
          price: price,
          total: price + total,
          productID: id
        }
      })
    toast.dark("Product " + title + "(" + price + "€) added!");
    // //console.log(selector2.total);
    // //setTotal(total + price);
  }
  const handleItemsInCart = () => {
    handleShow();
    //routerHistory.push('/purchased');
  }
  const handleDeleteShoe = (id: number) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(res => {
        toast.warning(<span style={{ color: "black" }} >Item deleted!</span>);
        downloadData();
      });
  }

  const filterData = () => {
    var productNumber = data.filter((shoe) => shoe.title.toLowerCase().includes(searchKey.toLowerCase()) ||
      shoe.description.toLowerCase().includes(searchKey.toLowerCase()) ||
      shoe.price.toString().toLowerCase().includes(searchKey.toLowerCase())).length;


    return productNumber;
  }
  const objAdd = {
    handleClose: handleCloseAddModal,
    show: showAddModal,
    downloadData: downloadData
  }
  const objUpdate = {
    handleClose: handleCloseUpdateModal,
    show: showUpdateModal,
    downloadData: downloadData,
    selected: selectedUpdate
  }
  const editProduct = (id: number) => {
    setSelectedUpdate(id);
    handleShowUpdateModal();
  }

  console.log(selector);
  return (
    <>
      <ModalUpdate {...objUpdate} />
      <ModalAdd {...objAdd} />
      {show === true ? <div id="myModal" className="modal">

        <div className="modal-content">
          <span onClick={handleClose} className="close">&times;</span>
          {body}
        </div>

      </div> : null}
      <ToastContainer position="bottom-right" />
      <div className="headerProducts">
        <h1 className="head">Products</h1><br></br><br></br>
        <div className="badge">

          <Badge badgeContent={selector?.length > 0 ? selector.length : 0} color="secondary">
            <ShoppingCartIcon style={{ cursor: "pointer" }} onClick={handleItemsInCart} />
          </Badge>
          <div className="addIcon">
            <AddCircleIcon onClick={handleShowAddModal} />
          </div>
        </div>
        {/* <ShoppingCartIcon onClick={handlePurchased} className="shoppingIcon" />{selector.length} */}
      </div>
      <small>Total: {filterData()}</small><br></br>
      <div className="searchInput">

        <div className="searchClass">

          <TextField onChange={handleSearchInput} style={{ width: "100%" }} id="outlined-search" label="Search products" type="search" variant="outlined" size="small" />
        </div>

      </div>

      <div className="products">
        {data ? data.filter((shoe) => shoe.title.toLowerCase().includes(searchKey.toLowerCase()) ||
          shoe.description.toLowerCase().includes(searchKey.toLowerCase()) ||
          shoe.price.toString().toLowerCase().includes(searchKey.toLowerCase()))
          .map((data: IData, index) => (
            <div className="container">
              <div className="card">
                <div className="imgBx">
                  <img src={data.image} />
                </div>
                <div className="contentBx">
                  <h2>{data.title}</h2>
                  <div className="size">
                    <h3>Price :{data.price} €</h3>
                  </div>
                  <a onClick={() => details(data.id)} >Details</a><br></br>
                  <i onClick={() => buyNow(data.title, data.price, data.id)} ><ShoppingCartIcon style={{ color: "#9BDC28" }} id="buynow" /></i>
                  <i onClick={() => editProduct(data.id)}><EditIcon style={{ color: "#FFC108" }} id="buynow" /></i>
                  <i><DeleteIcon onClick={() => handleDeleteShoe(data.id)} style={{ color: "#E34724" }} id="buynow" /></i>
                  <div>
                  </div>
                </div>
              </div>
            </div>
          )) : null}
      </div>
    </>
  );
}

export default Products;