import Autosuggest from "react-autosuggest";
import { useState } from "react";
import { tickers } from "../data/tickers";

function TickerAutosuggest({ value, onChange, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (input) => {
    if (typeof input !== "string") return [];
    const inputValue = input.trim().toLowerCase();

    return inputValue.length === 0
      ? []
      : tickers.filter((ticker) =>
          ticker.symbol.toLowerCase().includes(inputValue)
        );
  };

  const getSuggestionValue = (suggestion) => suggestion.symbol;

  // ✅ Dette fjerner prikkene – fordi <li> får ren tekst
  const renderSuggestion = (suggestion) =>
    `${suggestion.symbol} – ${suggestion.name}`;

  const inputProps = {
    placeholder: "Ticker (f.eks. AKRBP)",
    value,
    onChange: (e, { newValue }) => onChange(newValue),
  };

  const handleSuggestionSelected = (event, { suggestion }) => {
    onSelect({ symbol: suggestion.symbol, name: suggestion.name });
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) =>
        setSuggestions(getSuggestions(value))
      }
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={handleSuggestionSelected}
    />
  );
}

export default TickerAutosuggest;
