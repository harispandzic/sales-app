import { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import './ModalAdd.css'
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';

const ModalAdd = ({ handleClose, show, downloadData }: any) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const handleChangeDescription= (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }
  const handleChangeRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(e.target.value);
  }
  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  }
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  }
  
  const handleSaveProduct = () =>{
    const product ={title,description,rating,price,image};
        axios.post('http://localhost:3001/createShoe', product)
            .then(res => {
                console.log(res.data.name);
                toast(<span style={{color: "black"}} >Product succefuly added!</span>);
                downloadData();
                handleClose();
                
            })
            .catch((e) => {
                toast.error("Error message!");
            });
  }

  const body = (
    <div>
      <h1>Add product</h1>
      <form>
          <div className="input">
            <TextField onChange={handleChangeTitle} className="inputField" id="standard-basic" label="Title" /><br></br>
          </div>
          <div className="input">
            <TextField onChange={handleChangeDescription} className="inputField" id="standard-basic" label="Description" /><br></br>
          </div>
          <div className="input">
            <TextField onChange={handleChangeRating} className="inputField" id="standard-basic" label="Rating" /><br></br>
          </div>
          <div className="input">
            <TextField onChange={handleChangePrice} className="inputField" id="standard-basic" label="Price" /><br></br>
          </div>
          <div className="input">
            <TextField onChange={handleChangeImage} className="inputField" id="standard-basic" label="Image" /><br></br>
          </div>
        </form><br></br>
        <div className="addButton">
        <Button onClick={handleSaveProduct} variant="contained" color="primary">Add product</Button><br></br><br></br>

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

export default ModalAdd;