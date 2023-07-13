import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import { Navbar, Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News } from './components';
import "./App.css";

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route path="/" exact element={<Homepage />}></Route>
              {/* <Route path="/exchanges" exact element={<Exchanges />}></Route> */}
              <Route path="/cryptocurrencies" exact element={<Cryptocurrencies />}></Route>
              <Route path="/crypto/:coinId" exact element={<CryptoDetails />}></Route>
              <Route path="/news" exact element={<News />}></Route>
            </Routes>
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            Crypto Time <br />
            All rights reserved.
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
            {/* <Link to='/exchanges'>Exchange</Link> */}
            <Link to='/news'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
