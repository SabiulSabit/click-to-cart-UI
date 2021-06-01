import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { createProduct } from "./apiAdmin";

const AddProdcut = () => {
  return (
    <Layout title="Add New Product" description="E-Commerce Website">
     .... 
    </Layout>
  );
};

export default AddProdcut;
