import { useState } from "react";
import styles from "../styles/PortfolioTable.module.css";

function AddStockForm({ onAdd }) {
  const [form, setForm] = useState({
    ticker: "",
    name: "",
    quantity: "",
    gav: "",
    currency: "NOK"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStock = {
      ticker: form.ticker.trim().toUpperCase(),
      name: form.name.trim(),
      quantity: Number(form.quantity),
      gav: Number(form.gav),
      currency: form.currency
    };

    if (
      !newStock.ticker ||
      !newStock.name ||
      isNaN(newStock.quantity) ||
      isNaN(newStock.gav)
    ) {
      alert("Fyll ut alle feltene korrekt.");
      return;
    }

    onAdd(newStock);
    setForm({ ticker: "", name: "", quantity: "", gav: "", currency: "NOK" });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        name="ticker"
        placeholder="Ticker (f.eks. AKERBP.OL)"
        value={form.ticker}
        onChange={handleChange}
      />
      <input
        name="name"
        placeholder="Navn"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="quantity"
        type="number"
        placeholder="Antall"
        value={form.quantity}
        onChange={handleChange}
      />
      <input
        name="gav"
        type="number"
        step="0.01"
        placeholder="GAV"
        value={form.gav}
        onChange={handleChange}
      />
      <select name="currency" value={form.currency} onChange={handleChange}>
        <option value="NOK">NOK</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
      <button type="submit">Legg til aksje</button>
    </form>
  );
}

export default AddStockForm;
