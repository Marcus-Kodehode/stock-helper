import { useEffect, useState } from "react";
import axios from "axios";
import PortfolioTable from "./components/PortfolioTable";
import TickerAutosuggest from "./components/TickerAutosuggest";
import styles from "./styles/PortfolioTable.module.css";

function App() {
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem("portfolio");
    return saved ? JSON.parse(saved) : [];
  });

  const [quotes, setQuotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [tickerInput, setTickerInput] = useState("");

  const [form, setForm] = useState({
    ticker: "",
    name: "",
    quantity: "",
    gav: "",
    currency: "NOK",
  });

  const API_KEY = "67e29047935b76.95928858";

  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      const newQuotes = {};
      for (const stock of portfolio) {
        try {
          const res = await axios.get(
            `https://eodhistoricaldata.com/api/real-time/${stock.ticker}?api_token=${API_KEY}&fmt=json`
          );
          const price = parseFloat(res.data.close);
          const change = parseFloat(res.data.change);
          const changePercent = parseFloat(res.data.change_p);
          if (!isNaN(price)) {
            newQuotes[stock.ticker] = { price, change, changePercent };
          }
        } catch {
          console.warn("Feil ved henting av kurs for:", stock.ticker);
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

  const handleDelete = (ticker) => {
    setPortfolio((prev) => prev.filter((stock) => stock.ticker !== ticker));
  };

  const handleSelectTicker = ({ symbol, name }) => {
    setForm((prev) => ({
      ...prev,
      ticker: symbol,
      name: name,
    }));
    setTickerInput(symbol);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!form.ticker || !form.quantity || !form.gav) return;

    const newStock = {
      ticker: form.ticker.toUpperCase(),
      name: form.name,
      quantity: Number(form.quantity),
      gav: Number(form.gav),
      currency: form.currency || "NOK",
    };

    setPortfolio((prev) => [...prev, newStock]);

    setForm({
      ticker: "",
      name: "",
      quantity: "",
      gav: "",
      currency: "NOK",
    });

    setTickerInput("");
  };

  return (
    <div className="app-container">
      <h1>Min aksjeoversikt</h1>
      <div className={styles["form-wrapper"]}>
        <div className={styles.row}>
          <div className={styles.autosuggestWrapper}>
            <TickerAutosuggest
              value={tickerInput || ""} // <-- FIXED: Prevent undefined
              onChange={setTickerInput}
              onSelect={handleSelectTicker}
            />
          </div>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Navn"
          />
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Antall"
          />
          <input
            type="number"
            name="gav"
            value={form.gav}
            onChange={handleChange}
            placeholder="GAV"
          />
          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
          >
            <option value="NOK">NOK</option>
            <option value="USD">USD</option>
          </select>
          <button onClick={handleAdd}>Legg til aksje</button>
        </div>
      </div>

      <PortfolioTable
        portfolio={portfolio}
        quotes={quotes}
        loading={loading}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;




// 💍 One bug to find them,
// 🔥 One fix to bring them all,
// 💡 And in the darkness bind them.