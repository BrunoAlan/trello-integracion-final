import axios from "axios";
import { BACKEND_URL } from "../shared/constants";

// BOARD
const getBoard = async ({ id }) => {
  const boardID = id ? id : 1;
  try {
    const { data } = await axios.get(`${BACKEND_URL}/boards/${boardID}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// COLUMNS

const getColumns = async () => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/columns`);
    const columns = data.map(({ id, name, cards }) => {
      if (cards) {
        const cardIds = cards.map(({ id }) => id);
        return { id, title: name, cardIds, cards };
      } else {
        return { id, title: name, cardIds: [], cards: [] };
      }
    });
    return columns;
  } catch (error) {
    console.log(error);
  }
};

const addColumn = async (title, order) => {
  await axios.post(`${BACKEND_URL}/columns`, {
    name: title,
    order: order,
    cards: [{}],
    board: {
      id: 1,
      name: "board_name",
      user_id: 1,
    },
    board_id: 1,
  });
};

// CARD

const getCards = async () => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/cards`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const addCard = async (title, columnId) => {
  try {
    await axios.post(`${BACKEND_URL}/cards`, {
      title: title,
      description: "",
      column_board_id: columnId,
    });
  } catch (error) {
    console.log(error);
  }
};

const moveCard = async (id,destinationColumn)=>{
  const headers= { 
    'Content-Type': 'application/merge-patch+json'
  }
  try {
    await axios.patch(`${BACKEND_URL}/cards/${1}`,{
      id,
      column_board_id: destinationColumn
    },{headers})
  } catch (error) {
    
  }
}

export { getBoard, getColumns, addColumn, getCards, addCard, moveCard };
