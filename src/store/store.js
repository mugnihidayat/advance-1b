// import { useShallow } from "/zustand/react/shallow";
import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

const useLoginStore = create(
  persist(
    (set) => ({
      username: "",
      email: "",
      password: "",
      setUser: ({ username, email, password }) =>
        set(() => ({ username, email, password })),
      updateUserName: (username) => set(() => ({ username })),
      updateEmail: (email) => set(() => ({ email })),
      updatePassword: (password) => set(() => ({ password })),
    }),
    {
      name: "login-storage",
    }
  )
);

const useMovieStore = create((set) => ({
  movies: [],
  isLoading: false,
  error: null,
  fetchMovies: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        "https://670026164da5bd2375535bbc.mockapi.io/api/movie/movie"
      );
      set({ movies: response.data });
    } catch (err) {
      set({ error: err.message || "Terjadi kesalahan saat fetching data" });
    } finally {
      set({ isLoading: false });
    }
  }, // Tambah film
  addMovie: async (newFilm) => {
    try {
      const response = await axios.post(
        "https://670026164da5bd2375535bbc.mockapi.io/api/movie/movie",
        newFilm
      );
      set((state) => ({
        movies: [...state.movies, response.data],
      }));
    } catch (err) {
      set({ error: err.message || "Terjadi kesalahan saat menambahkan film" });
    }
  },

  // Edit film
  editMovie: (film) => {
    set({ currentFilm: film });
  },

  // Update film
  updateMovie: async (id, updatedFilm) => {
    try {
      const response = await axios.put(
        `https://670026164da5bd2375535bbc.mockapi.io/api/movie/movie/${id}`,
        updatedFilm
      );
      set((state) => ({
        movies: state.movies.map((film) =>
          film.id === id ? response.data : film
        ),
        currentFilm: null,
      }));
    } catch (err) {
      set({ error: err.message || "Terjadi kesalahan saat memperbarui film" });
    }
  },

  // Hapus film
  deleteMovie: async (id) => {
    try {
      await axios.delete(
        `https://670026164da5bd2375535bbc.mockapi.io/api/movie/movie/${id}`
      );
      set((state) => ({
        movies: state.movies.filter((film) => film.id !== id),
      }));
    } catch (err) {
      set({ error: err.message || "Terjadi kesalahan saat menghapus film" });
    }
  },
}));

export { useLoginStore, useMovieStore };
