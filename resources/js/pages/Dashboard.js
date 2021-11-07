import { React,useEffect,useState } from 'react';
import 'antd/dist/antd.css'
import { Col,Row } from 'antd';
import Navbar from '../components/Navbar';
import Body from '../components/Body';
import store from '../store';
import { Provider } from 'react-redux';
function Dashboard(props) {


    return (
        <>
        <Provider store={store}>
            <Row>
                <Col span={24}>
                    <Navbar />
                </Col>
            </Row>
            <br/>
            <div className="bodyOrganization"><Body/></div>
        </Provider>
        </>
    );
}

export default Dashboard;

