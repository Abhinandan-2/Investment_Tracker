import API_KEY from '../../APIs/stockDataApi';

const API_BASE_URL = 'https://cloud.iexapis.com/stable/stock';

async function fetchStockData(stockSymbol, flag) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${stockSymbol}/quote?token=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }

    const data = await response.json();

    return  { 
          symbol: data.symbol,
          company: data.companyName,
          price: data.latestPrice,
          percentChange: data.changePercent,
          change: data.change,
          time : data.latestTime,
          marketCap : data.marketCap,
          previousClose : data.previousClose,
          week52High : data.week52High,
          week52Low : data.week52Low,
          ytdChange : data.ytdChange,
          peRatio : data.peRatio,
          primaryExchange : data.primaryExchange,
          isUSMarketOpen : data.isUSMarketOpen,
          iexClose : data.iexClose,
          iexCloseTime : data.iexCloseTime,
          currency : data.currency
        };
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return null;
  }
}

export default fetchStockData;
