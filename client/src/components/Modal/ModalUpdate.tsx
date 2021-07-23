import { useState,useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import './ModalAdd.css'
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';

const ModalUpdate = ({ handleClose, show, downloadData, selected}: any) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 0,
    image: ""
  });

  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [rating, setRating] = useState("");
  // const [price, setPrice] = useState("");
  // const [image, setImage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setData({...data,
    [e.target.name]: e.target.value})
  }

  // const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitle(e.target.value);
  // }
  // const handleChangeDescription= (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setDescription(e.target.value);
  // }
  // const handleChangeRating = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setRating(e.target.value);
  // }
  // const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPrice(e.target.value);
  // }
  // const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setImage(e.target.value);
  // }

  useEffect(() => {
    axios.get(`http://localhost:3001/findOne/${selected}`)
        .then(res => {
            // setTitle(res.data.title);
            // setDescription(res.data.description);
            // setPrice(res.data.price);
            // setRating(res.data.rating);
            // setImage(res.data.image);
          setData(res.data);
        })
},[show]);
  const handleSaveProduct = () =>{
    //const product ={title,description,rating,price,image};
    const product =data;
        axios.patch('http://localhost:3001/updateShoe/' + selected, product)
            .then(res => {
                console.log(res.data.name);
                toast(<span style={{color: "black"}} >Product succefuly updated!</span>);
                downloadData();
                handleClose();
                
            })
            .catch((e) => {
                toast.error("Error message!");
            });
  }

  const body = (
    <div>
      <h1>Update product</h1>
      <form>
          <div className="input">
            <TextField name="title" value={data.title} onChange={handleChange} className="inputField" id="standard-basic"  /><br></br>
          </div>
          <div className="input">
            <TextField name="description" value={data.description} onChange={handleChange} className="inputField" id="standard-basic"  /><br></br>
          </div>
          <div className="input">
            <TextField name="rating" value={data.rating} onChange={handleChange} className="inputField" id="standard-basic"  /><br></br>
          </div>
          <div className="input">
            <TextField name="price" value={data.price} onChange={handleChange} className="inputField" id="standard-basic"  /><br></br>
          </div>
          <div className="input">
            <TextField name="image" value={data.image} onChange={handleChange} className="inputField" id="standard-basic"  /><br></br>
          </div>
        </form><br></br>
        <div className="addButton">
        <Button onClick={handleSaveProduct} variant="contained" color="secondary">Update product</Button><br></br><br></br>
          </div>
    </div>
  );

  return (
    <>
      {show === true ? <div id="myModal" className="modal">

        <div className="modal-content">
          <span onClick={handleClose} className="close">&times;</span>
          {body}
        </div>
        
      </div> : null}
    </>
  )
}

export default ModalUpdate;