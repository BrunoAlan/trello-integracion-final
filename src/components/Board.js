import React from "react";
import { Column } from "./Column";
import { DraggableCard } from "./Card";
import { TextForm } from "./TextForm";

export function Board({ cards, columns, moveCard, addCard, addColumn }) {
  return (
    <div className="Board">
      {columns.map((column) => (
        <Column
          key={column.id}
          id={column.id}
          title={column.title}
          addCard={addCard}
        >
          {column.cardIds
            .map((cardId) => cards.find((card) => card.id === cardId))
            .map((card, index) => (
              <DraggableCard
                key={card.id}
                id={card.id}
                columnId={column.id}
                columnIndex={index}
                title={card.title}
                description={card.description}
                moveCard={moveCard}
              />
            ))}
          {column.cardIds.length === 0 && (
            <DraggableCard
              isSpacer
              moveCard={(cardId) => moveCard(cardId, column.id, 0)}
            />
          )}
        </Column>
      ))}
      <div className="Column">
        <TextForm addColumn={addColumn} placeholder="Add Column..." />
      </div>
    </div>
  );
}
