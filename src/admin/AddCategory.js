import React, { useState } from "react";
import { useForm } from "react-hook-form";
import  {Link} from "react-router-dom"
import Layout from "../core/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  let [error, setError] = useState(0);
  let [success, setSuccess] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //token
  const { user, token } = isAuthenticate();

  let onSubmit = (data) => {
    setSuccess(0);
    createCategory(user._id, token, data).then((data) => {
      if (data.error) {
        setSuccess(0);
        setError(1);
      } else {
        setSuccess(1);
        setValue("name", "", { shouldValidate: false });
        setError(0);
      }
    });
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
          <div className="mt-5">
              <Link to='/admin/dashboard' className="text-warning">Back to Dashboard</Link>
      </div>
        </Col>
      </Row>
    </Container>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success text-center"> Category Create Successfuly!! </h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger text-center"> Category Should be Unique </h3>;
    }
  };



  return (
    <Layout title="Add New Category" description="E-Commerce Website">
      {showError()}
      {showSuccess()}
      {newCategoryForm()}
    </Layout>
  );
};

export default AddCategory;