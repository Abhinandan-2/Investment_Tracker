import React,{ useState }  from 'react';

function StockAddition({ stocks, setStocks }) {
    const [stockInput, setStockInput] = useState('');

    const handleAddStock = () => {
        if (stockInput) {
            setStocks([...stocks, { name: stockInput, price: '' }]);
            setStockInput('');
        }
    };

    return (
        <div>
            <input value={stockInput} onChange={e => setStockInput(e.target.value)} />
            <button onClick={handleAddStock}>Add Stock</button>
        </div>
    );
}

export default StockAddition;