import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllGames } from "../service/games";

// Acción asincrónica para obtener juegos con paginación y búsqueda
export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async ({ searchTerm = "", currentPage = 1 }) => {
    const response = await fetchAllGames(searchTerm, currentPage);
    return response;
  }
);

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    games: [],
    isLoading: false,
    searchTerm: "",
    currentPage: 1,
    totalPages: 1,
    currentIndex: 0,  // Para el control de las diapositivas
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSlide: (state, action) => {
      state.currentIndex = action.payload;
    },
    nextSlide: (state) => {
      state.currentIndex = (state.currentIndex + 1) % state.games.length;
    },
    prevSlide: (state) => {
      state.currentIndex = (state.currentIndex - 1 + state.games.length) % state.games.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.games = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
      })
      .addCase(fetchGames.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setSearchTerm, setPage, setSlide, nextSlide, prevSlide } = gamesSlice.actions;
export default gamesSlice.reducer;
