import React, { useState } from 'react';
import { Card, Col, Row, Typography, Avatar, Select } from 'antd';
import moment from 'moment';
import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Title, Text } = Typography;
const { Option } = Select;

export default function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const count = simplified ? 6 : 15;
  const { data } = useGetCryptosQuery(100);

  const { data: cryptoNews, isFetching } = useGetCryptosNewsQuery({ newsCategory, count });
  if (!cryptoNews?.value) return <Loader />;

  const demoImage = `https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg`;

  return (
    <Row gutter={[24, 24]}>
      {!simplified ?
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={value => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
            {data?.data?.coins.map(currency => (
              <Option value={currency.name}>{currency.name}</Option>
            ))}
          </Select>
        </Col>
        : ''}

      {cryptoNews?.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card className='news-card' hoverable>
            <a href={news.url} target='_blank' rel='noreferrer'>
              <div className="news-image-container">
                <Title className='news-title' level={5}>{news.name}</Title>
                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt='default-news' />
              </div>
              <p>
                {news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news-provider" />
                  <Text className='provider-name'>{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
