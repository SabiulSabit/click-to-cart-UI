import React, {useState} from "react";
import { useForm } from "react-hook-form";
import Layout from "../core/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { Link } from "react-router-dom";


const AddCategory = () =>{

    let [error, setError] = useState(0);
    let [success, setSuccess] = useState(0);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm();
    
    //token
    const {user, token} = isAuthenticate();   


    let onSubmit = (data) => {
            setSuccess(0);
            console.log(data);

    };

    const newCategoryForm = () => ( 
        <Container className="center">
        <Row>
          <Col md={8} className="offset-md-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="name" className="text-muted">
                  Name{" "}
                  <span className="err">
                    {errors.name && "This Fields is Required"}
                  </span>
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="form-control"
                  {...register("name", { required: true, maxLength: 32 })}
                />
              </div>
          
              <button className="btn btn-outline-primary" type="submit">
                Create Category
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    )
  

   
  return (
    <Layout title="Add New Category" description="E-Commerce Website">
        {newCategoryForm()}
    </Layout>
  );

}

export default AddCategory;