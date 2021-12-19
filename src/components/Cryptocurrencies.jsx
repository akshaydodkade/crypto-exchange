import { Card, Col, Input, Row, Typography } from 'antd';
import millify from 'millify';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text } = Typography;

export default function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(cryptoList?.data?.coins);
    const filteredData = cryptoList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);
  if (isFetching) return 'Loading...';

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}
      <Row gutter={[32, 32]}>
        {cryptos?.map(currency => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className='crypto-image' src={currency.iconUrl} alt={currency.name} />}
                hoverable
              >
                <p>Price: {'$' + currency.price}</p>
                <p>Market Cap: {'$' + millify(currency.marketCap)}</p>
                <p>Daily Change: <Text type={currency.change < 0 ? `danger` : `success`}>{currency.change > 0 ? `+` : ``}{millify(currency.change)}%</Text></p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
