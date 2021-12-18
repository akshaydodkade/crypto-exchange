import { Card, Col, Row, Typography } from 'antd';
import millify from 'millify';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text } = Typography;

export default function Cryptocurrencies() {
  const { data: cryptoList, isFetching } = useGetCryptosQuery();
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);

  useEffect(() => {
    setCryptos(cryptoList?.data?.coins);
  }, [cryptoList]);
  if (isFetching) return 'Loading...';

  return (
    <Row gutter={[32, 32]}>
      {cryptos && cryptos.map(currency => (
        <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
          <Link to={`/crypto/${currency.id}`}>
            <Card
              title={`${currency.rank}. ${currency.name}`}
              extra={<img className='crypto-image' src={currency.iconUrl} alt={currency.name} />}
              hoverable
            >
              <p>Price: {'$' + millify(currency.price)}</p>
              <p>Market Cap: {'$' + millify(currency.marketCap)}</p>
              <p>Daily Change: <Text type={currency.change < 0 ? `danger` : `success`}>{currency.change > 0 ? `+` : ``}{millify(currency.change)}</Text></p>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}
