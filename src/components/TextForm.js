import React from "react";

export const TextForm = (props) => {
  const { addCard, addColumn, id, placeholder } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    placeholder === "Add card..."
      ? addCard(id, event.target.input.value)
      : addColumn(event.target.input.value);
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="TextForm__input"
        name="input"
        placeholder={placeholder}
      />
    </form>
  );
};
