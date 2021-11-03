import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import _ from "lodash";
import { Board } from "./components/Board";
import * as APIServices from "./services/backendAPI";
import TestAsyn from "./components/TestAsyn";

let _cardId = 20;

class App extends Component {
  state = {
    cards: [],
    columns: [],
  };

  componentDidMount() {
    const fetchData = async () => {
      this.setState({
        columns: await APIServices.getColumns(),
        cards: await APIServices.getCards(),
      });
      this.setState({
        _cardId: this.state.cards[this.state.cards.length - 1].id,
      });
    };
    fetchData();
  }

  addColumn = (_title) => {
    const title = _title.trim();
    let name;
    if (!title) {
      return;
    } else {
      name = title;
    }

    const newColumn = {
      id: this.state.columns.length + 1,
      title: name,
      cardIds: [],
    };
    APIServices.addColumn(name, this.state.columns.length + 1);
    this.setState((state) => ({
      columns: [...state.columns, newColumn],
    }));
  };

  addCard = (columnId, _title) => {
    const title = _title.trim();
    if (!title) return;
    const newCard = { id: ++_cardId, title };
    APIServices.addCard(_title, columnId);
    this.setState((state) => ({
      cards: [...state.cards, newCard],
      columns: state.columns.map((column) =>
        column.id === columnId
          ? { ...column, cardIds: [...column.cardIds, newCard.id] }
          : column
      ),
    }));
  };

  moveCard = (cardId, destColumnId, index) => {
    this.setState((state) => ({
      columns: state.columns.map((column) => ({
        ...column,
        cardIds: _.flowRight(
          // 2) If this is the destination column, insert the cardId.
          (ids) =>
            column.id === destColumnId
              ? [...ids.slice(0, index), cardId, ...ids.slice(index)]
              : ids,
          // 1) Remove the cardId for all columns
          (ids) => ids.filter((id) => id !== cardId)
        )(column.cardIds),
      })),
    }));
    APIServices.moveCard(cardId, destColumnId);
  };

  render() {
    return (
      <Board
        cards={this.state.cards}
        columns={this.state.columns}
        moveCard={this.moveCard}
        addCard={this.addCard}
        addColumn={this.addColumn}
      />
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
