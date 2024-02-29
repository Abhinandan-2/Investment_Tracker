import React, { useState  , useEffect} from 'react';
import { Table, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import fetchStockData from '../StockMarketOverview/StockData';




function StockList({ onStockSelect }) {
    const symbols = [ 'AAPL','MSFT','GOOGL','AMZN','NVDA','TSLA','META','BRK.B','LLY','V','XOM','UNH','TSM',	'WMT','JPM','NVO','JNJ','MA','PG','HD','ORCL','ABBV','MRK','COST','TM',	'KO',	'ASML',	'PEP',	'ADBE',	'BABA',	'CSCO',	'BAC','NVS','AZN','CRM','TMO','FMX',	'ACN',	'MCD',	'PFE',	'DHR',	'CMCSA','LIN',	'ABT',	'NFLX',	'AMD',	'TMUS',	'TTE',	'HSBC',	'SAP',	'WFC',	'HDB',	'INTC',	'DIS',	'NKE',	'TXN',	'BHP',	'AMGN',	'PM',	'COP',	'INTU',	'CAT',	'VZ',	'MS'];

 const [stocks, setStocks] = useState([]);
   
     

 useEffect(() => {
    const fetchData = async () => {
      for (const symbol of symbols) {
        const newStockData = await fetchStockData(symbol);
        if (newStockData) {
          setStocks((prevStocks) => [...prevStocks, newStockData]);
        }
      }
    };
    fetchData();
  }, []);


      const [searchTerm, setSearchTerm] = useState('');
      
      const filteredStocks = stocks.filter((stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
 

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    
    <div className="stock-list">
       <Row className="Ava_Search">
        <Col xs={8}>
          <h3>Available Stocks</h3>
        </Col>
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
      </Row>
      <p style={{textAlign:'left', color:'#5a287d'}}>*Click On Stock To Buy/Sell Stock</p>
      <Table striped bordered hover>
        <thead>
          <tr>
           <th>Stock Symbol</th>
            <th>Company</th>
            <th>Price</th>
            <th>Percentage Change</th>
          </tr>
        </thead>
        <tbody>
          {filteredStocks.map((stock) => (
            <tr key={stock.id} onClick={() => onStockSelect(stock)}>
              <td>{stock.symbol}</td>
              <td>{stock.company}</td>
              <td>${stock.price.toFixed(2)}</td>
              <td>{stock.percentChange}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default StockList;
