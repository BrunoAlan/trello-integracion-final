import React from "react";
import { TextForm } from "./TextForm";

export function Column(props) {
  const { id, addCard, title } = props;
  return (
    <div className="Column">
      <div className="Column__title">{title}</div>
      {props.children}
      <TextForm id={id} addCard={addCard} placeholder="Add card..." />
    </div>
  );
}
