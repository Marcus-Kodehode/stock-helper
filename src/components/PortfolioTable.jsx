import React from 'react';
import EditCell from './EditCell';
import styles from '../styles/PortfolioTable.module.css';

function PortfolioTable({ portfolio, quotes, loading, onUpdate, onDelete }) {
  if (loading) return <p>Laster kurser...</p>;

  const handleManualPriceUpdate = (ticker, newPrice) => {
    const storedPrices = JSON.parse(localStorage.getItem('manualPrices')) || {};
    storedPrices[ticker] = newPrice;
    localStorage.setItem('manualPrices', JSON.stringify(storedPrices));
    onUpdate(ticker, 'manualPrice', newPrice);
  };

  const manualPrices = JSON.parse(localStorage.getItem('manualPrices')) || {};

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Ticker (aksjesymbol)</th>
          <th>Navn</th>
          <th>Antall (aksjer)</th>
          <th>GAV (gj.sn. kjøpspris)</th>
          <th>Valuta</th>
          <th>Kurs (nåverdi)</th>
          <th>Endring (%)</th>
          <th>Markedsverdi</th>
          <th>Avkastning (NOK)</th>
          <th>Avkastning (%)</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {portfolio.map((stock) => {
          const quote = quotes[stock.ticker] || {};
          const apiPrice = quote.price;
          const price =
            typeof apiPrice === 'number' && apiPrice > 0
              ? apiPrice
              : manualPrices[stock.ticker] ?? 0;

          const changePercent = quote.changePercent ?? 0;

          const marketValue =
            typeof price === 'number' && stock.quantity
              ? price * stock.quantity
              : null;

          const totalCost =
            typeof stock.gav === 'number' && stock.quantity
              ? stock.gav * stock.quantity
              : null;

          const profit =
            typeof marketValue === 'number' && typeof totalCost === 'number'
              ? marketValue - totalCost
              : null;

          const returnPercent =
            typeof profit === 'number' && totalCost > 0
              ? (profit / totalCost) * 100
              : null;

          const gavChangePercent =
            typeof stock.gav === 'number' && typeof price === 'number'
              ? ((price - stock.gav) / stock.gav) * 100
              : null;

          return (
            <tr key={stock.ticker}>
              <td>{stock.ticker}</td>
              <td>{stock.name}</td>
              <td>
                <EditCell
                  value={stock.quantity}
                  onSave={(val) => onUpdate(stock.ticker, 'quantity', val)}
                />
              </td>
              <td>
                <EditCell
                  value={stock.gav}
                  onSave={(val) => onUpdate(stock.ticker, 'gav', val)}
                />
              </td>
              <td>{stock.currency}</td>
              <td>
                <EditCell
                  value={price.toFixed(2)}
                  onSave={(val) =>
                    handleManualPriceUpdate(stock.ticker, Number(val))
                  }
                />
              </td>
              <td>
                {typeof gavChangePercent === 'number' ? (
                  <span
                    className={
                      gavChangePercent >= 0 ? styles.positive : styles.negative
                    }
                  >
                    {gavChangePercent.toFixed(2)}%
                  </span>
                ) : (
                  '-'
                )}
              </td>
              <td>{marketValue ? marketValue.toFixed(2) : '-'}</td>
              <td>
                {typeof profit === 'number' ? (
                  <span
                    className={profit >= 0 ? styles.positive : styles.negative}
                  >
                    {profit.toFixed(2)}
                  </span>
                ) : (
                  '-'
                )}
              </td>
              <td>
                {typeof returnPercent === 'number' ? (
                  <span
                    className={
                      returnPercent >= 0 ? styles.positive : styles.negative
                    }
                  >
                    {returnPercent.toFixed(2)}%
                  </span>
                ) : (
                  '-'
                )}
              </td>
              <td>
                <button
                  onClick={() => onDelete(stock.ticker)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                  }}
                  title="Slett aksjepost"
                >
                  🗑️
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default PortfolioTable;
