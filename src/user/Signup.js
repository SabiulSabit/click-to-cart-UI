import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../core/Layout";
import { Container, Row, Col } from "react-bootstrap";

import { API } from "../config";

const Signup = () => {
  
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    

      const signup = (user) => {
           // console.log(name, email, password)
            fetch(`${API}/signup`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then(res => {
                return res.json();
            }).catch(err => {
                console.log(err);
            })
      }

     let onSubmit = (data) => {

         const {name, email, password} =  data;
         signup( {name, email, password} );

      };
    

  const singUPForm = () => (
    <Container className="center">
      <Row>
        <Col md={8} className="offset-md-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name" className="text-muted">
                Name <span className="err">{errors.name && "This Fields is Required"}</span> 
              </label>
              <input type="text" id="name" placeholder="Your Name" className="form-control" {...register("name", { required: true, maxLength: 32 })} />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text-muted">
                Email <span className="err">{errors.email && "This Fields is Required"}</span> 
              </label>
              <input type="email" id="email" className="form-control" {...register("email", { required: true })} />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-muted">
                Password <span className="err">{errors.password && "This Fields is Required"}</span> 
              </label>
              <input type="password" id="password" className="form-control" {...register("password", { required: true })} />
            </div>
            <button className="btn btn-primary" type="submit">Submit</button>
          </form>
        </Col>
      </Row>
    </Container>
  );

  return (
    <Layout title="Signup" description="E-Commerce Website">
      {singUPForm()}
    </Layout>
  );
};

export default Signup;
