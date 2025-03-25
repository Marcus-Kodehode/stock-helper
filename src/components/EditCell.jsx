import { useState } from "react";

function EditCell({ value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(value);

  const handleBlur = () => {
    setEditing(false);
    if (input !== value) {
      onSave(input);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setEditing(false);
      setInput(value); // Tilbakestill
    }
  };

  return editing ? (
    <input
      type="number"
      value={input}
      onChange={(e) => setInput(Number(e.target.value))}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  ) : (
    <span onClick={() => setEditing(true)} style={{ cursor: "pointer" }}>
      {value}
    </span>
  );
}

export default EditCell;
