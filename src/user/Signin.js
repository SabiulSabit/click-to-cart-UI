import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { signin, authenticate, isAuthenticate } from "../auth/index";

const Signin = () => {
  let [error, setError] = useState(0);
  let [loading, setLoading] = useState(false);
  let [redirect, setRedirect] = useState(false);

  const {user} = isAuthenticate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  let onSubmit = (data) => {
    const { email, password } = data;
    setLoading(true);
    signin({ email, password }).then((data) => {
      if (data.error) {
        setError(data.error);
        setRedirect(false);
        setLoading(false);
      } else {
        authenticate(data, () => {
          setError(0);
          setValue("email", "", { shouldValidate: false });
          setValue("password", "", { shouldValidate: false });
          setLoading(false);
          setRedirect(true);
        });
      }
    });
  };

  const singUPForm = () => (
    <Container className="center">
      <Row>
        <Col md={8} className="offset-md-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="email" className="text-muted">
                Email{" "}
                <span className="err">
                  {errors.email && "This Fields is Required"}
                </span>
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                {...register("email", { required: true })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-muted">
                Password{" "}
                <span className="err">
                  {errors.password && "This Fields is Required"}
                </span>
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                {...register("password", { required: true })}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );

  const showError = () => {
    console.log(error);
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showLoading = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const redirectUser = () => {
    if (redirect) {
       if(user && user.role === 1){
           return <Redirect to="/admin/dashboard" />;
       }
       else{
          return <Redirect to="/user/dashboard" />;
       }
     
    }
  };

  return (
    <Layout title="Signin" description="E-Commerce Website">
      {showLoading()}
      {redirectUser()}
      {showError()}
      {singUPForm()}
    </Layout>
  );
};

export default Signin;
