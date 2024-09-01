import React, { useState, useEffect } from 'react';
import './RenderStock.css';
import './smo.css';
import fetchStockData from './StockData';
import { Card, Container, Table, InputGroup, FormControl, Row, Col, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../NavBar/NavBar';
import image from '../../assets/images/Price.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';


function RenderStock({ onStockSelect }) {
  const symbols = [ 'AAPL','MSFT','GOOGL','AMZN','NVDA','TSLA','META','BRK.B','LLY','V','XOM','UNH','TSM',	'WMT','JPM','NVO','JNJ','MA','PG','HD','ORCL','ABBV','MRK','COST','TM',	'KO',	'ASML',	'PEP',	'ADBE',	'BABA',	'CSCO',	'BAC','NVS','AZN','CRM','TMO','FMX',	'ACN',	'MCD',	'PFE',	'DHR',	'CMCSA','LIN',	'ABT',	'NFLX',	'AMD',	'TMUS',	'TTE',	'HSBC',	'SAP',	'WFC',	'HDB',	'INTC',	'DIS',	'NKE',	'TXN',	'BHP',	'AMGN',	'PM',	'COP',	'INTU',	'CAT',	'VZ',	'MS'];
  const [stockData, setStockData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [extendedCard, setExtendedCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      for (const symbol of symbols) {
        if (!stockData[symbol]) {
          const newStockData = await fetchStockData(symbol);
          if (newStockData) {
            setStockData(prevStockData => ({
              ...prevStockData,
              [symbol]: newStockData,
            }));
          }
        }
      }
    };
    fetchData();
  }, [stockData, symbols]);

  const stocks = Object.values(stockData);

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const toggleExtendedCard = index => {
    setExtendedCard(extendedCard === index ? null : index);
  };

  return (
    <div className="stock-list">
      <NavBar heding="Stock Overview" />
      <Container>
        <Row className="Av_Search mx-auto" style={{ marginTop: '20px' }}>
          <Col xs={4} className="text-right">
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search Stocks By Symbol"
                value={searchTerm}
                onChange={handleInputChange}
              />
            </InputGroup>
          </Col>
          <Col xs={8} className="text-left">
            <div
              style={{
                display: "flex",
                justifyContent: "right"
              }}
            >
              <img
                src={image}
                alt="stockPrice"
                style={{
                  display: "block",
                  maxWidth: "10%",
                }}
              />
            </div>
          </Col>
        </Row>

        <Row>
          {filteredStocks.map((stock, index) => (
            <Col key={index} xs={12} sm={6}>
                <Card className="my-3">
                  <Card.Body className="text-center">
                    <Card.Title className="mb-3">{stock.company}</Card.Title>
                    <Row>
                      <Col xs={6}>
                        <Card.Text>Symbol: {stock.symbol}</Card.Text>
                      </Col>
                      <Col xs={6}>
                        <Card.Text className={`${stock.change >= 0 ? "positive-return" : "negative-return"}`}>Change: {stock.change}</Card.Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <Card.Text>Price: ${stock.price.toFixed(2)}</Card.Text>
                      </Col>
                      <Col xs={6}>
                        <Card.Text className={`${stock.percentChange >= 0 ? "positive-return" : "negative-return"}`}>Percentage Change: {stock.percentChange}</Card.Text>
                      </Col>
                    </Row>
                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                      <span style={{ fontSize: "24px", cursor: "pointer" }} onClick={() => toggleExtendedCard(index)}>
                        {extendedCard === index ? <FontAwesomeIcon icon={faCircleArrowUp} /> : <FontAwesomeIcon icon={faCircleArrowDown} />}
                      </span>
                    </div>
                    {extendedCard === index && (
                      <>
                    <Row>
                      <Col xs={6}>
                        <Card.Text>Latest Time: {stock.latestTime}</Card.Text>
                      </Col>
                      <Col xs={6}>
                        <Card.Text>Primary Exchange: {stock.primaryExchange}</Card.Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <Card.Text>Market Cap: {stock.marketCap}</Card.Text>
                      </Col>
                      <Col xs={6}>
                        <Card.Text>Previous Close: {stock.previousClose}</Card.Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <Card.Text>Week 52 High: {stock.week52High}</Card.Text>
                      </Col>
                      <Col xs={6}>
                        <Card.Text>Week 52 Low: {stock.week52Low}</Card.Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <Card.Text>YTD Change: {stock.ytdChange.toFixed(4)}</Card.Text>
                      </Col>
                      <Col xs={6}>
                        <Card.Text>PE Ratio: {stock.peRatio}</Card.Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <Card.Text>IEX Close: {stock.iexClose}</Card.Text>
                      </Col>
                      <Col xs={6}>
                        <Card.Text>IEX Close Time: {stock.iexCloseTime}</Card.Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <Card.Text>Currency: {stock.currency}</Card.Text>
                      </Col>
                      <Col xs={6}>
                        <Card.Text>Is US Market Open: {stock.isUSMarketOpen}</Card.Text>
                      </Col>
                    </Row>
                  </>
                    
                    )}
                  </Card.Body>
                </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}



export default RenderStock;
