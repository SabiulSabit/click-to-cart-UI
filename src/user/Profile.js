import React, { useState, useEffect } from "react";
import Layout from "../core/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { getUserInfo, upadetUserInfo, updateLocalStorageUser } from "./apiUser";
import { Redirect } from "react-router-dom";

const Profile = (props) => {
  //state
  const [values, setValues] = useState({
    name: "",
    password: "",
    error: false,
    success: false,
  });

  const { name, password, error, success } = values;

  //get auth user token
  const { token } = isAuthenticate();
 
  //get user info
  const init = (userId) => {
    getUserInfo(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name });
      }
    });
  };

  //load
  useEffect(() => {
    init(props.match.params.userId);
  }, []);
 
  //handel change
  const handelChnage = name => e => {
  setValues({...values, error: false, [name]: e.target.value})
  };

  //on submit
  const clickSubmit = (e) => {
      e.preventDefault();
      upadetUserInfo(props.match.params.userId, token,  {name, password} ).then(data =>{
          if(data.error){
            setValues({ ...values, error: true });
          }else{
              updateLocalStorageUser(data, ()=>{
                setValues({ ...values, name: data.name, password: data.password, success: true });
              })
          }
      } )
  };

  //redirect user to dashboard
  const redirectUser = (success) => {
      if(success) {
          return <Redirect to="/user/dashboard" />
      }
  }

  //profile update component
  const profileUpdate = (name, password) => {
    return (
      <Container>
        <Row>
          <Col md={12}>
          <h2 className="mb-4">Profile Update</h2> 
            <form>
              <div className="form-group">
                <label className="text-muted"><strong>Name</strong> </label>
                <input
                  type="text"
                  onChange={handelChnage("name")}
                  className="form-control"
                  value={name}
                />
              </div>
              <div className="form-group">
                <label className="text-muted"><strong>Password</strong></label>
                <input
                  type="text"
                  onChange={handelChnage("password")}
                  className="form-control"
                  value={password}
                />
              </div>

              <button onClick={clickSubmit} className="btn btn-info">
                Update
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  };

  //return layout
  return (
    <Layout title="Update Profile" description="E-Commerce Website">
    
      {profileUpdate(name, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
