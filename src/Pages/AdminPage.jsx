import { useEffect, useState } from "react";
import { useMovieStore } from "../store/store"; // sesuaikan importnya
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const {
    movies,
    fetchMovies,
    addMovie,
    updateMovie,
    deleteMovie,
    error,
    isLoading,
  } = useMovieStore();

  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch data saat pertama kali masuk
  useEffect(() => {
    fetchMovies();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateMovie(editingId, formData);
      setEditingId(null);
    } else {
      await addMovie(formData);
    }
    setFormData({ name: "", rating: "", description: "" });
  };

  // Klik edit
  const handleEdit = (movie) => {
    setEditingId(movie.id);
    setFormData({
      name: movie.name,
      rating: movie.rating,
      description: movie.description,
    });
  };

  // Klik hapus
  const handleDelete = async (id) => {
    if (confirm("Yakin mau hapus?")) {
      await deleteMovie(id);
    }
  };

  return (
    <div className="p-8 mx-20">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        Admin Dashboard - Chill Movie
      </h1>
      <div className="absolute right-10 top-6 border-none p-2 rounded-lg hover:bg-green-500 bg-green-400 text-white ">
        <Link to="/beranda">Beranda</Link>
      </div>

      {/* Form Tambah/Edit */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 max-w-xl">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Judul"
          className="block w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="block w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="block w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {editingId ? "Update Konten" : "Tambah Konten"}
        </button>
      </form>

      {/* Tabel Data */}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full table-auto border text-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-black">Judul</th>
              <th className="border px-4 py-2 text-black">Rating</th>
              <th className="border px-4 py-2 text-black">Description</th>
              <th className="border px-4 py-2 text-black">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td className="border px-4 py-2">{movie.name}</td>
                <td className="border px-4 py-2">{movie.rating}</td>
                <td className="border px-4 py-2">{movie.description}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
