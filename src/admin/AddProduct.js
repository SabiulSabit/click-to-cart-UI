import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { createProduct } from "./apiAdmin";

const AddProdcut = () => {
  let [values, setValues] = useState({
    loading: false,
    error: "",
    createProduct: "",
    redirectToProfile: false,
    formData: "",
    category: [],
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { user, token } = isAuthenticate();
  const {
    loading,
    error,
    createProduct,
    redirectToProfile,
    formData,
    category,
  } = values;

  useEffect( () => {
        setValues({...values, formData: new FormData()})
  }, [])

  const onSubmit = (data) => {
    console.log(data);
    formData.set(data);
  };


  const newPostForm = () => {
    return (
      <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
        <h4>Post Photo</h4>{" "}
        <span className="err">{errors.photo && "This Fields is Required"}</span>
        <div className="form-group">
          <label className="btn btn-secondary">
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: true })}
            />
          </label>
        </div>
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
            placeholder="Product Name"
            className="form-control"
            {...register("name", { required: true, maxLength: 32 })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="text-muted">
            Description{" "}
            <span className="err">
              {errors.description && "This Fields is Required"}
            </span>
          </label>
          <textarea
            type="text"
            id="description"
            placeholder="Product Description"
            className="form-control"
            {...register("description", { required: true, maxLength: 100 })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="text-muted">
            Price{" "}
            <span className="err">
              {errors.price && "This Fields is Required"}
            </span>
          </label>
          <input
            type="number"
            id="price"
            placeholder="Product Name"
            className="form-control"
            {...register("price", { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="text-muted">
            Price{" "}
            <span className="err">
              {errors.price && "This Fields is Required"}
            </span>
          </label>
          <input
            type="number"
            id="price"
            placeholder="Product Price"
            className="form-control"
            {...register("price", { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category" className="text-muted">
            Price{" "}
            <span className="err">
              {errors.category && "This Fields is Required"}
            </span>
          </label>
          <select
            type="text"
            id="category"
            placeholder="Product Category"
            className="form-control"
            {...register("category", { required: true })}>

                <option value="60a4c93a892e99236485f888">Node</option>
            </select>
        </div>

        <div className="form-group">
          <label htmlFor="shipping" className="text-muted">
           Shipping{" "}
            <span className="err">
              {errors.shipping && "This Fields is Required"}
            </span>
          </label>
          <select
            type="text"
            id="shipping"
            placeholder="Shipping"
            className="form-control"
            {...register("shipping", { required: true })}>

                <option value="0">No</option>
                <option value="1">Yes</option>
            </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity" className="text-muted">
          Quantity{" "}
            <span className="err">
              {errors.quantity && "This Fields is Required"}
            </span>
          </label>
          <input
            type="number"
            id="quantity"
            placeholder="Quantity"
            className="form-control"
            {...register("quantity", { required: true })}
          />
        </div>
        <button className="btn btn-outline-primary" type="submit">
          Create Product
        </button>
      </form>
    );
  };

  return (
    <Layout title="Add New Product" description="E-Commerce Website">
      <Container>
        <Row>
          <Col md={8} className="offset-2">
            {newPostForm()}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AddProdcut;
