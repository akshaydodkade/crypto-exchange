import React from 'react';
import { Typography, Row, Col, Statistic } from "antd";

const { Title } = Typography;

export default function Homepage() {
  return (
    <>
      <Title level={5} className='heading'>Global Crypto Statistics</Title>
      <Row>
        <Col span={12}><Statistic title='Total Cryptocurrencies' value='5' /></Col>
        <Col span={12}><Statistic title='Total Exchanges' value='5' /></Col>
        <Col span={12}><Statistic title='Total Market Cap' value='5' /></Col>
        <Col span={12}><Statistic title='Total 24h Volume' value='5' /></Col>
        <Col span={12}><Statistic title='Total Markets' value='5' /></Col>
      </Row>
    </>
  );
}
