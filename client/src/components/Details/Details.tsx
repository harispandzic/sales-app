import { useState, useEffect } from "react";
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import './Details.css'
import { useHistory } from 'react-router';

const Details = () => {
    const id = window.localStorage.getItem("id");
    const [data, setData] = useState<IData>();
    const [rate,setRate] = useState(0);
    const routerHistory = useHistory();
    useEffect(() => {
        axios.get(`http://localhost:3001/findOne/${id}`)
            .then(res => {
                setData(res.data);
                setRate(res.data.rating);
            })
    });

    const handleProducts = () =>{
        routerHistory.push('/');
    }
    
    return (
        <>
        <div className="content">
            <div>
            <h1 className="headProductDetails">Product details</h1>
            <a className="aProductList" onClick={handleProducts}>Product list</a><br></br><br></br>
                <b>Title: </b><p>{data?.title}</p>
                <b>Description: </b><p>{data?.description}</p>
                <b>Rating: </b><br></br>
                <Rating name="read-only" value={rate} readOnly /><br></br>
                <b>Price: </b><p>{data?.price}  €</p>
                <img className="slika" src={data?.image}/>
            </div>
        </div>
            
        </>
    )
}
export default Details;