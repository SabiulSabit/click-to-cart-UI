import React, {useState, useEffect} from "react";
import Layout from "../core/Layout/Layout";
import moment from "moment";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { Link } from "react-router-dom";
import {getOrderHistory} from './apiUser'

const Dashboard = () => {

  const [history, setHistory] = useState([]);

  const {
    user: {_id, name, email, role },
  } = isAuthenticate();

 const  {token} = isAuthenticate();


  const init = (userId, token) =>{
    getOrderHistory(userId, token).then(data => {
      if(data.error){
        console.log(data.error)
      }else{
        setHistory(data)
      }
    })
  }

  useEffect(  () =>{
    init(_id, token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
 
  const userLinks = () => {
    return (
      <div className="card bg-dark text-light">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item bg-secondary">
            <Link className="sideBarLink" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item bg-secondary">
            <Link className="sideBarLink" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
         
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card dashBoardCard mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item"> <strong> Name:  </strong>{name}</li>
          <li className="list-group-item"> <strong> Email:  </strong>  {email}</li>
          <li className="list-group-item">
          <strong> User Type:  </strong> {role === 1 ? "Admin" : "Registred User"}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = history => {
    return (
        <div className="card dashBoardCard mb-5">
            <h3 className="card-header">Purchase history</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    {history.map((h, i) => {
                        return (
                            <div>
                                <hr />
                                <h4 className="text-danger">Status: {h.status}</h4>
                                {h.products.map((p, i) => {
                                    return (
                                        <div key={i}>
                                            <h6>Product name: {p.name}</h6>
                                            <h6>Product price: ${p.price}</h6>
                                            <h6>
                                                Purchased date:{" "}
                                                {moment(p.createdAt).fromNow()}
                                            </h6>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </li>
            </ul>
        </div>
    );
};

  return (
    <Layout title="User Dashboard" description="User Dashboard">
      <Container>
            <Row>
                <Col md={3}>
                    {userLinks()}
                </Col>
                <Col md={9}>
                    {userInfo()}
                    {purchaseHistory(history)}
                </Col>
            </Row>
      </Container>
    </Layout>
  );
};

export default Dashboard;
