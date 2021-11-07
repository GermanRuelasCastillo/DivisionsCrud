import React from 'react';
import 'antd/dist/antd.css'
import { Col,Row } from 'antd';
import Navbar from '../components/Navbar';
import Body from '../components/Body';
function Dashboard(props) {
    return (
        <>
        <Row>
            <Col span={24}>
                <Navbar />
            </Col>
        </Row>
        <br/>
        <div className="container">
           <Body/>
        </div>
        </>
    );
}

export default Dashboard;

