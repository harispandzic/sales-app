import { useState, useEffect } from 'react';
import './Users.css';
import axios from 'axios'

const Users = () => {
    const[users, setUsers] = useState<IUser[]>([]);
    useEffect(() => {
        document.title = "Sales App";
        axios.get('http://localhost:3001/findAllUsers')
          .then(res => {
            setUsers(res.data);
          })
      }, []);
    return (
        <>
        <h1 style={{marginLeft:"8%"}}>Users</h1>
        <div className="userContent">
        <div className="users">
        {users.map((data: IUser, index) => (
            <div className="box">
            <div className="card-1">
              <div className="imgBx-1">
                  <img src={data.photo} alt="images"/>
              </div>
              <div className="details">
                  <h2>{data.name + " " + data.lastname}<br></br><span>{data.email}</span></h2>
              </div>
            </div>
       
        </div>
            
            
            ))}
            </div>
 
</div>
        </>
    )
}

export default Users;