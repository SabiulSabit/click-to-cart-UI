import React from 'react'
import Layout from  '../core/Layout'
import {Container}  from 'react-bootstrap'
import {isAuthenticate} from '../auth/index'


const Dashboard = () => {
    const {user: {_id, name, email, role}} = isAuthenticate();
    return (
        <Layout title="User Dashboard" description="User Dashboard">
            <Container>
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                            {name}
                    </li>
                    <li className="list-group-item">
                            {email}
                    </li>
                    <li className="list-group-item">
                            {role  === 1 ? "Admin": "Registred User"}
                    </li>
                </ul>
            </div>
            <div className="card mb-5">
                 <h3 className="card-header">Purchase History</h3>
                 <ul className="list-group">
                    <li className="list-group-item">
                            History
                    </li>
                </ul>
            </div>
            </Container>
        </Layout>
    )
}

export default Dashboard;