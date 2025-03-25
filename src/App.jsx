import { useEffect, useState } from "react";
import axios from "axios";
import PortfolioTable from "./components/PortfolioTable";
import "./App.css";

const initialPortfolio = [
  { ticker: "AKERBP.OL", name: "Aker BP", quantity: 40, gav: 247.02, currency: "NOK" },
  { ticker: "HOEGH.OL", name: "Hoegh Autoliners", quantity: 115, gav: 90.15, currency: "NOK" },
  { ticker: "PPG.OL", name: "Pioneer Property Group", quantity: 80, gav: 89.83, currency: "NOK" },
  { ticker: "RANA.OL", name: "Rana Gruber", quantity: 76, gav: 60.10, currency: "NOK" },
  { ticker: "DOF.OL", name: "DOF Group", quantity: 56, gav: 86.06, currency: "NOK" },
  { ticker: "ENSU.OL", name: "Ensurge Micropower", quantity: 2340, gav: 0.75, currency: "NOK" },
  { ticker: "MPCC.OL", name: "MPC Container Ships", quantity: 124, gav: 16.22, currency: "NOK" }
];

function App() {
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [quotes, setQuotes] = useState({});
  const [loading, setLoading] = useState(true);

  const API_KEY = "67e29047935b76.95928858";

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

          if (!isNaN(price) && price > 0) {
            newQuotes[stock.ticker] = { price, change, changePercent };
            continue;
          }

          try {
            const fallback = await axios.get(
              `https://eodhistoricaldata.com/api/eod/${stock.ticker}?api_token=${API_KEY}&fmt=json&limit=1`
            );

            const data = fallback.data;
            if (Array.isArray(data) && data.length > 0) {
              const last = data[0];
              const fallbackPrice = parseFloat(last.close);
              const fallbackChange = parseFloat(last.change);
              const fallbackChangePercent = parseFloat(last.change_p);

              newQuotes[stock.ticker] = {
                price: isNaN(fallbackPrice) ? null : fallbackPrice,
                change: isNaN(fallbackChange) ? null : fallbackChange,
                changePercent: isNaN(fallbackChangePercent)
                  ? null
                  : fallbackChangePercent
              };
              continue;
            }
          } catch (eodFallbackError) {
            console.warn(`EOD fallback feilet for ${stock.ticker}`);
          }
        } catch (error) {
          console.error("Feil ved henting av data for", stock.ticker, error);
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

  return (
    <div className="app-container">
      <h1>Min aksjeoversikt</h1>
      <PortfolioTable
        portfolio={portfolio}
        quotes={quotes}
        loading={loading}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;

// 💍 One bug to find them,
// 🔥 One fix to bring them all,
// 💡 And in the darkness bind them.
