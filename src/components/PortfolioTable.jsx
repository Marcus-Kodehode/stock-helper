import styles from "../styles/PortfolioTable.module.css";
import EditCell from "./EditCell";

function PortfolioTable({ portfolio, quotes, loading, onUpdate }) {
  if (loading) return <p>Laster kurser...</p>;

  const handleManualPriceUpdate = (ticker, newPrice) => {
    const storedPrices = JSON.parse(localStorage.getItem("manualPrices")) || {};
    storedPrices[ticker] = newPrice;
    localStorage.setItem("manualPrices", JSON.stringify(storedPrices));
    onUpdate(ticker, "manualPrice", newPrice);
  };

  const manualPrices = JSON.parse(localStorage.getItem("manualPrices")) || {};

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Navn</th>
          <th>Antall</th>
          <th>GAV</th>
          <th>Valuta</th>
          <th>Kurs</th>
          <th>Endring (%)</th>
          <th>Markedsverdi</th>
          <th>Avkastning (NOK)</th>
          <th>Avkastning (%)</th>
        </tr>
      </thead>
      <tbody>
        {portfolio.map((stock) => {
          const quote = quotes[stock.ticker] || {};
          const apiPrice = quote.price;
          const price =
            typeof apiPrice === "number" && apiPrice > 0
              ? apiPrice
              : manualPrices[stock.ticker] || 0;

          const change = quote.changePercent;
          const marketValue =
            typeof price === "number" && stock.quantity
              ? price * stock.quantity
              : null;

          const totalCost =
            typeof stock.gav === "number" && stock.quantity
              ? stock.gav * stock.quantity
              : null;

          const profit =
            typeof marketValue === "number" && typeof totalCost === "number"
              ? marketValue - totalCost
              : null;

          const returnPercent =
            typeof profit === "number" && totalCost > 0
              ? (profit / totalCost) * 100
              : null;

          const gavChange =
            typeof price === "number" && typeof stock.gav === "number"
              ? ((price - stock.gav) / stock.gav) * 100
              : null;

          return (
            <tr key={stock.ticker}>
              <td>{stock.ticker}</td>
              <td>{stock.name}</td>
              <td>
                <EditCell
                  value={stock.quantity}
                  onSave={(val) => onUpdate(stock.ticker, "quantity", val)}
                />
              </td>
              <td>
                <EditCell
                  value={stock.gav}
                  onSave={(val) => onUpdate(stock.ticker, "gav", val)}
                />
              </td>
              <td>{stock.currency}</td>
              <td>
                <EditCell
                  value={Number(price).toFixed(2)}
                  onSave={(val) =>
                    handleManualPriceUpdate(stock.ticker, Number(val))
                  }
                />
              </td>
              <td>
                {typeof gavChange === "number" ? (
                  <span
                    className={
                      gavChange >= 0 ? styles.positive : styles.negative
                    }
                  >
                    {gavChange.toFixed(2)}%
                  </span>
                ) : (
                  "-"
                )}
              </td>
              <td>{marketValue ? marketValue.toFixed(2) : "-"}</td>
              <td>
                {typeof profit === "number" ? (
                  <span
                    className={
                      profit >= 0 ? styles.positive : styles.negative
                    }
                  >
                    {profit.toFixed(2)}
                  </span>
                ) : (
                  "-"
                )}
              </td>
              <td>
                {typeof returnPercent === "number" ? (
                  <span
                    className={
                      returnPercent >= 0 ? styles.positive : styles.negative
                    }
                  >
                    {returnPercent.toFixed(2)}%
                  </span>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default PortfolioTable;
