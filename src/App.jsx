import { useEffect, useState } from "react";
import axios from "axios";
import PortfolioTable from "./components/PortfolioTable";
import "./App.css";

const LOCAL_KEY = "aksjeportefolje";
const MANUAL_KEY = "manualPrices";

function App() {
  const [portfolio, setPortfolio] = useState(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [quotes, setQuotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState({
    ticker: "",
    name: "",
    quantity: "",
    gav: "",
    currency: "NOK",
  });

  const API_KEY = "67e29047935b76.95928858";

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      const newQuotes = {};
      const manualPrices = JSON.parse(localStorage.getItem(MANUAL_KEY) || "{}");

      for (const stock of portfolio) {
        if (manualPrices[stock.ticker]) {
          newQuotes[stock.ticker] = {
            price: manualPrices[stock.ticker],
            change: null,
            changePercent: null,
            manual: true,
          };
          continue;
        }

        try {
          const res = await axios.get(
            `https://eodhistoricaldata.com/api/real-time/${stock.ticker}?api_token=${API_KEY}&fmt=json`
          );

          const price = parseFloat(res.data.close);
          const change = parseFloat(res.data.change);
          const changePercent = parseFloat(res.data.change_p);

          if (!isNaN(price) && price > 0) {
            newQuotes[stock.ticker] = { price, change, changePercent };
          }
        } catch (error) {
          console.error("Feil ved henting av kurser", error);
        }
      }

      setQuotes(newQuotes);
      setLoading(false);
    };

    fetchQuotes();
  }, [portfolio]);

  const handleUpdate = (ticker, field, newValue) => {
    setPortfolio((prev) =>
      prev.map((stock) =>
        stock.ticker === ticker ? { ...stock, [field]: newValue } : stock
      )
    );
  };

  const handleManualPrice = (ticker, price) => {
    const updated = { ...quotes[ticker], price: parseFloat(price), manual: true };
    const manualPrices = JSON.parse(localStorage.getItem(MANUAL_KEY) || "{}");
    manualPrices[ticker] = updated.price;
    localStorage.setItem(MANUAL_KEY, JSON.stringify(manualPrices));
    setQuotes((prev) => ({ ...prev, [ticker]: updated }));
  };

  const addStock = () => {
    const { ticker, name, quantity, gav, currency } = inputs;
    if (!ticker || !name || !quantity || !gav) return;
    setPortfolio((prev) => [
      ...prev,
      { ticker, name, quantity: Number(quantity), gav: Number(gav), currency },
    ]);
    setInputs({ ticker: "", name: "", quantity: "", gav: "", currency: "NOK" });
  };

  return (
    <div className="app-container">
      <h1>Min aksjeoversikt</h1>
      <div className="input-row">
        <input
          placeholder="Ticker (f.eks. AKERBP.OL)"
          value={inputs.ticker}
          onChange={(e) => setInputs({ ...inputs, ticker: e.target.value })}
        />
        <input
          placeholder="Navn"
          value={inputs.name}
          onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
        />
        <input
          placeholder="Antall"
          type="number"
          value={inputs.quantity}
          onChange={(e) => setInputs({ ...inputs, quantity: e.target.value })}
        />
        <input
          placeholder="GAV"
          type="number"
          value={inputs.gav}
          onChange={(e) => setInputs({ ...inputs, gav: e.target.value })}
        />
        <select
          value={inputs.currency}
          onChange={(e) => setInputs({ ...inputs, currency: e.target.value })}
        >
          <option value="NOK">NOK</option>
          <option value="USD">USD</option>
        </select>
        <button onClick={addStock}>Legg til aksje</button>
      </div>

      {loading ? (
        <p>Laster kurser...</p>
      ) : (
        <PortfolioTable
          portfolio={portfolio}
          quotes={quotes}
          onUpdate={handleUpdate}
          onManualPrice={handleManualPrice}
        />
      )}
    </div>
  );
}

export default App;




// 💍 One bug to find them,
// 🔥 One fix to bring them all,
// 💡 And in the darkness bind them.
