import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "../core/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { createProduct, getCategorys } from "./apiAdmin";

const AddProdcut = () => {
  const form = useRef(null);
  let [category, setCategory] = useState([]);
  let [values, setValues] = useState({
    loading: false,
    error: "",
    createProductName: "",
    redirectToProfile: false,
    categorys: [],
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { user, token } = isAuthenticate();
  const { loading, error, createProductName } = values;

  //load categories and use it
  useEffect(() => {
    getCategorys().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategory((category) => data);
      }
    });
  }, []);

 // console.log(createProductName);
  const onSubmit = (data) => {
    //console.log(data);
    const data1 = new FormData(form.current);
    //formData.set(data);

    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, data1)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
        //  console.log(data.result.name)
          setValue("photo", "", { shouldValidate: false });
          setValue("name", "", { shouldValidate: false });
          setValue("description", "", { shouldValidate: false });
          setValue("price", "", { shouldValidate: false });
          setValue("quantity", "", { shouldValidate: false });
          setValue("shipping", "0", { shouldValidate: false });
          setValues({
            ...values,
            error: "",
            loading: false,
            createProductName: data.result.name,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const newPostForm = () => {
    return (
      <form ref={form} className="mb-3" onSubmit={handleSubmit(onSubmit)}>
        <h4>Post Photo</h4>{" "}
        <span className="err">{errors.photo && "This Field is Required"}</span>
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
              {errors.name && "This Field is Required"}
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
              {errors.description && "This Field is Required"}
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
              {errors.price && "This Field is Required"}
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
            Category{" "}
            <span className="err">
              {errors.category && "This Field is Required"}
            </span>
          </label>
          <select
            type="text"
            id="category"
            placeholder="Product Category"
            className="form-control"
            {...register("category", { required: true })}
          >
            <option>Pleaes Select One</option>

            {category.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="shipping" className="text-muted">
            Shipping{" "}
            <span className="err">
              {errors.shipping && "This Field is Required"}
            </span>
          </label>
          <select
            type="text"
            id="shipping"
            placeholder="Shipping"
            className="form-control"
            {...register("shipping", { required: true })}
          >
            <option>Pleaes Select One</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity" className="text-muted">
            Quantity{" "}
            <span className="err">
              {errors.quantity && "This Field is Required"}
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

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div className="alert alert-info" style={{ display: createProductName ? "" : "none" }}>
       <h3> {`${createProductName} is Created !`} </h3>
    </div>
  );

  const showLoading = () => (
     loading &&  ( <div className="alert alert-sucess"><h2>Loading</h2></div> )
  );


  return (
    <Layout title="Add New Product" description="E-Commerce Website" src="/images/product.png">
      <Container>
        <Row>
          <Col md={8} className="offset-2">
            {showLoading()}
            {showSuccess()}
            {showError()}
            {newPostForm()}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AddProdcut;
