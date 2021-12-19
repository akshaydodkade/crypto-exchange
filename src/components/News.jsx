import { Card, Col, Row, Typography } from 'antd';
import React from 'react';
import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi';

const { Title } = Typography;

export default function News({ simplified }) {
  const count = simplified ? 6 : 12;
  const { data: cryptoNews, isFetching } = useGetCryptosNewsQuery('cryptocurrency', count);
  if (!cryptoNews?.value) return 'Loading...';

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews?.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card className='news-card' hoverable>
            <a href={news.url} target='_blank' rel='noreferrer'>
              <div className="news-image-container">
                <Title className='news-title' level={4}>{news.name}</Title>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
