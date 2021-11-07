import React from 'react';
// Images
import logo from '/images/logo.svg';
import logo_black from '/images/logo_negro.svg';
import avatar from '/images/avatar.svg';
// Icons
import brief from '/images/brief.svg';
import help from '/images/help.svg';
import notifications from '/images/notifications.svg';
import { DownOutlined } from '@ant-design/icons';
//
import { Layout,Menu,Avatar } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;


function Navbar(props) {
    return (
        <Header className="headerTop">
            <Menu
                mode="horizontal"
                className="d-flex align-items-center custom-navigation menu-header">
                {/* Logo Item */}
                <Menu.Item key="logo" className="brand-logo">
                    <Link to="/">
                        <img src={logo} className="m-r-5" />
                    </Link>
                </Menu.Item>
                {/* Dashboard Item */}
                <Menu.Item key="dashboard" className="brand-logo">
                    <Link to="/">
                    <span className="spanHeaderText"> Dashboard</span>
                    </Link>
                </Menu.Item>
                {/* Organization Item */}
                <Menu.Item key="organization" className="brand-logo">
                    <span className="spanHeaderText"> Organización</span>
                </Menu.Item>
                {/* Models Item */}
                <SubMenu  key="models" title={
                    <span>
                        <span className="spanHeaderText"> Modelos</span>
                        <DownOutlined className="downIcon" style={{ fontSize: '10px', color: '#fff' }}/>
                    </span>
                } >
                    <Menu.Item key="model1">Model 1</Menu.Item>
                    <Menu.Item key="model2">Model 2</Menu.Item>
                </SubMenu>
                {/* Trancking Item */}
                <SubMenu  key="tracking" title={
                    <span>
                        <span className="spanHeaderText"> Seguimiento</span>
                        <DownOutlined className="downIcon" style={{ fontSize: '10px', color: '#fff' }}/>
                    </span>
                } >
                    <Menu.Item key="tracking1">Tracking 1</Menu.Item>
                    <Menu.Item key="tracking2">Tracking 2</Menu.Item>
                </SubMenu>
                {/* Brief item */}
                <Menu.Item key="brief" className="auto">
                    <img src={brief} className="iconMenu" />
                </Menu.Item>
                {/* Help item */}
                <Menu.Item key="help">
                    <img src={help} className="iconMenu" />
                </Menu.Item>
                {/* Notifications item */}
                <Menu.Item key="notification">
                    {/* TODO: IMPLEMENT NOTIFICATIONS */}
                    <img src={notifications} className="iconMenu" />
                </Menu.Item>
                {/* Admin Item */}
                <SubMenu  key="admin" title={
                    <span>
                        <Avatar size={24} src={avatar} />
                        <span className="spanHeaderText"> Administrador</span>
                        <DownOutlined className="downIcon" style={{ fontSize: '10px', color: '#fff' }}/>
                    </span>
                } >
                    <Menu.Item key="profile-view">
                        <Link to="/profile">Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="logout"><Link to="/">Logout</Link></Menu.Item>
                </SubMenu>
                {/* LogoBlack Item */}
                <Menu.Item key="LogoBlack" className="brand-logo">
                    <Link to="/">
                        <img src={logo_black} className="m-r-5" />
                    </Link>
                </Menu.Item>
            </Menu>
        </Header>
    );
}

export default Navbar;
