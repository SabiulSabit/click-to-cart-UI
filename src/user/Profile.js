import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { getUserInfo, upadetUserInfo, updateLocalStorageUser } from "./apiUser";
import { Link, Redirect } from "react-router-dom";

const Profile = (props) => {
  const [values, setValues] = useState({
    name: "",
    password: "",
    error: false,
    success: false,
  });

  const { name, password, error, success } = values;
  const { token } = isAuthenticate();

  const init = (userId) => {
    getUserInfo(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name });
      }
    });
  };

  useEffect(() => {
    init(props.match.params.userId);
  }, []);

  const handelChnage = name => e => {
  setValues({...values, error: false, [name]: e.target.value})
  };

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

  const redirectUser = (success) => {
      if(success) {
          return <Redirect to="/user/dashboard" />
      }
  }

  const profileUpdate = (name, password) => {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <form>
              <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                  type="text"
                  onChange={handelChnage("name")}
                  className="form-control"
                  value={name}
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                  type="text"
                  onChange={handelChnage("password")}
                  className="form-control"
                  value={password}
                />
              </div>

              <button onClick={clickSubmit} className="btn btn-primary">
                Submit
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Layout title="Update Profile" description="E-Commerce Website">
      <h2 className="mb-4">Profile Update</h2>
      {profileUpdate(name, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
