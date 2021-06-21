import React, {useState, useEffect} from "react";
import Layout from "../core/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import {getUserInfo, upadetUserInfo, updateLocalStorageUser} from './apiUser'
import { Link } from "react-router-dom";

const Profile = (props) => {
   
  const [values, setValues] = useState({
      name: '',
      password: '',
      error: '',
      success: false,
  })

  const  {name, password, error, success} = values;

  const init = (userId) => {
   console.log(userId);
  }

  useEffect( () =>{
      init(props.match.params.userId);
  },[] )

    return (
        <Layout title="Update Profile" description="E-Commerce Website">
              <h2 className="mb-4">Profile Update</h2>
    </Layout>
    )
}

export default Profile;
