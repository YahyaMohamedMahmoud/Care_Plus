import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token, URL } from "../../Url/url";

export const fetchTypeCards = createAsyncThunk(
  "cards/fetchTypeCards",
  async () => {
    const { data } = await axios.get(`${URL}all/cardstype`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data?.data;
  }
);

export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async ({ name, amount }, { dispatch }) => {
    const response = await axios.post(
      `${URL}create/card`,
      { name, amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(fetchTypeCards());
    return response.data.data;
  }
);

const typescardsReducer = createSlice({
  name: "cards",
  initialState: {
    typecards: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypeCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTypeCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.typecards = action.payload;
      })
      .addCase(fetchTypeCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateCard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.typecards = action.payload;
        // const existingCard = state.cards?.find((card) => card.id === updatedCard.id);
        // console.log(existingCard);

        // if (existingCard) {
        //   existingCard.name = updatedCard.name;
        //   existingCard.amount = updatedCard.amount;
        // }
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default typescardsReducer.reducer;
