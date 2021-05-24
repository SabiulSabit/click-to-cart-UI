import React from 'react'
import Layout from '../core/Layout'


import {API} from '../config'

const Signup = () => {
    
    const singUPForm = () =>{
        <form>
            <div className="form-group"></div>
        </form>
    }

    return (
        <Layout title="Signup" description="E-Commerce Website">
            {API}
        </Layout>
    )
}

export default Signup; 