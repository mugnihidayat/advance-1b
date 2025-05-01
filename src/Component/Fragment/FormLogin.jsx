// import InputForm from "../Element/Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoginStore } from "../../store/store";


const FormLogin = () => {
  const { email, password, setUser, updateEmail, updatePassword } = useLoginStore();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

     // Admin login
     if (email === "admin@admin.com" && password === "admin1234") {
      alert("Login sebagai Admin berhasil!");
      localStorage.setItem("isLoggedIn", true);
      navigate("/admin");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
 

    if (storedUser) {
      if (storedUser.email === email && storedUser.password === password) {
        alert("Login Berhasil!");

        // Simpan ke localStorage
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("loggedInUser", JSON.stringify(storedUser));

        // Simpan ke Zustand store
        setUser({
          username: storedUser.username,
          email: storedUser.email,
          password: storedUser.password,
        });

        navigate("/beranda/profile");
      } else {
        setErrorMessage("Email atau password salah");
      }
    } else {
      setErrorMessage("Pengguna tidak ditemukan. Silakan daftar.");
    }
    
  };

  return (
    <>
      <form onSubmit={handleLogin} className="w-full flex flex-col gap-2">
        <label htmlFor=""> Email</label>
        <input type="email" onChange={(e) => updateEmail(e.target.value)} value={email} required className="p-2 lg:p-3 rounded-3xl bg-transparent text-white w-full border border-white" />
        <label htmlFor=""> Password</label>
        <input type="password" onChange={(e) => updatePassword(e.target.value)} value={password} required className="p-2 lg:p-3 rounded-3xl bg-transparent text-white w-full border border-white" autoComplete="off" />
        <div className="flex justify-between">
          <p>
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Daftar
            </Link>
          </p>
          <p>
            <Link to="/forgot-password" className="text-white hover:underline">
              Lupa Password
            </Link>
          </p>
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit" className="w-full bg-gray-800 border border-white hover:bg-gray-800/80 hover:text-white text-xl rounded-3xl py-2 lg:py-2 text-sm lg:text-lg mt-6">
          Masuk
        </button>
        <h1 className="text-white font-light text-sm text-center mt-4">Atau</h1>
        <button className="w-full bg-black/80 border border-white hover:bg-gray-800/80 hover:text-white text-xl rounded-3xl py-2 lg:py-2 text-sm lg:text-lg mt-6">
          <img src="../assets/goggle.webp" alt="" className="w-6 h-6 inline mr-2" />
          Masuk Dengan Google
        </button>
      </form>
    </>
  );
};

export default FormLogin;
