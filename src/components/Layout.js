import {Link, useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useReducer } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserSwitchOutlined,
  MoneyCollectOutlined,
  LogoutOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import './Layout.css';
import { useSelector } from 'react-redux';
import Spinner from './spinner';

const { Header, Sider, Content } = Layout;

const AppLayout = ({children}) => {
  const {cartItems , loading} = useSelector(state => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const toggle = ()=>{
    setCollapsed(!collapsed);
  }

  useEffect(()=>{
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
  },[cartItems])

  return (
    <Layout>
    {loading && <Spinner/>}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"><h2 className='logo-title'>Group B</h2></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={window.location.pathname}>
            <Menu.Item key="/" icon={<HomeOutlined/>}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/bills"icon={<MoneyCollectOutlined/>}>
                <Link to="/bills">Bills</Link>
            </Menu.Item>
            <Menu.Item key="/products" icon={<HomeOutlined/>}>
                <Link to="/products">Products</Link>
            </Menu.Item>
            <Menu.Item key="/customers" icon={<UserSwitchOutlined/>}>
                <Link to="/customers">Customers</Link>
            </Menu.Item>
            <Menu.Item key="/logout" icon={<LogoutOutlined/>} onClick={()=>{localStorage.removeItem("auth");navigate('./login');}}>
                <Link to="/logout">Logout</Link>
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
          <div className='cart-items' onClick={()=> navigate("/cart")}>
            <ShoppingCartOutlined/>
            <span className='cart-badge'>{cartItems.length}</span>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;  