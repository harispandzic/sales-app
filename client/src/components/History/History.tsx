import axios from 'axios';
import { useState, useEffect } from 'react';
import '../History/History.css'

interface IUserShoes {
    id: number,
    title: string,
    description: string,
    price: number,
    rating: number,
    createdAt: string,

}


const History = () => {
    const loggedUserID = localStorage.getItem("loggedID");
    const [data, setData] = useState<IUserShoes[]>([]);

    useEffect(() => {
        document.title = "History";
        axios.get(`http://localhost:3001/usersshoes/${loggedUserID}`)
            .then(res => {
                setData(res.data);
            })
    }, []);
    console.log(data);
    return (
        <>
            <div className="pHistory">
                <h1>Purchase history</h1>
                {data.map(p => (
                    <div>
                        <h3>{p.title + "(" + p.price + "€) - " + p.createdAt}</h3>
                    </div>
                )
                )}

            </div>


        </>
    )
}

export default History;