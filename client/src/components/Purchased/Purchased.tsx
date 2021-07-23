import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Purchased.css';
import { useHistory } from 'react-router';

interface IPurchased{
    title: string,
    price: number
}

const Purchased = () =>{
    const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false) };
  const handleShow = () => setShow(true);




    const dispatch = useDispatch();
    const selector = useSelector((state :any)=> state.reducer.products);
    const routerHistory = useHistory();
    const handleProducts = () =>{
        routerHistory.push('/');
    }
    

    return (
        <>
        <button id="myBtn" onClick={handleShow}>Open Modal</button>

{show === true ? <div id="myModal" className="modal">

<div className="modal-content">
  <span onClick={handleClose} className="close">&times;</span>
  <p>Some text in the Modal..</p>
</div>

</div> : null}
            <div className="content">
            <div>
            <h1 className="headProductDetails">Purchased products</h1>
            <a onClick={handleProducts} className="aProductList">Product list</a><br></br><br></br>
            {selector ? selector.map((data: IPurchased, index: number) => (
                <div>
                    <b>{index+1 + ". " + data.title + " - " + data.price}</b><br></br>

                </div>
            )) : null}
            </div>
            <br></br>
        <b>Total: </b>{selector[selector.length -1].total}
        </div>
        </>
    );
}

export default Purchased;