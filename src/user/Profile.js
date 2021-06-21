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
      error: false,
      success: false,
  })

  const  {name, password, error, success} = values;
  const {token} = isAuthenticate();

  const init = (userId) => {
    getUserInfo(userId,token).then(data => {
        if(data.error ){
            setValues({...values, error: true});
        }
        else{
            setValues({...values, name: data.name, success: true})
        }
    } )
  }

  useEffect( () =>{
      init(props.match.params.userId);
  },[] )

    return (
        <Layout title="Update Profile" description="E-Commerce Website">
              <h2 className="mb-4">Profile Update</h2>
              {JSON.stringify(values)}
    </Layout>
    )
}

export default Profile;
