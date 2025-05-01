import { Link, useNavigate } from "react-router-dom";
// import InputForm from "../Element/Input";
import { useState } from "react";
import { useLoginStore } from "../../store/store";
// import useAuthStore from "../../stores/useAuthStore";

const FormRegister = () => {
  const navigate = useNavigate();

  const setUser = useLoginStore((state) => state.setUser);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Password dan Konfirmasi Password tidak cocok.");
      return;
    }

    // Simpan data user ke zustand dan localStorage
    const newUser = { username, email, password };
    setUser(newUser);
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    localStorage.setItem("isLoggedIn", true);

    alert("Registrasi berhasil!");
    navigate("/login");
  };

  return (
    <>
      <form onSubmit={handleRegister} className="w-full mt-[-2] flex flex-col gap-2">
        <label htmlFor="">Username</label>
        <input type="text" name="username" placeholder="Masukan Username" className="w-full p-2 lg:p-3 rounded-3xl bg-transparent text-white border border-white" onChange={(e) => setUsername(e.target.value)} value={username} />
        <label htmlFor="">Email</label>
        <input type="email" name="email" placeholder="Masukan email" className="w-full p-2 lg:p-3 rounded-3xl bg-transparent text-white border border-white" onChange={(e) => setEmail(e.target.value)} value={email} />
        <label htmlFor="">password</label>
        <input
          type="password"
          name="password"
          placeholder="Masukan password"
          className="w-full p-2 lg:p-3 rounded-3xl bg-transparent text-white border border-white"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          autoComplete="off"
        />
        <label htmlFor="">Confirm Password</label>
        <input
          type="password"
          name="password"
          placeholder="Masukan password"
          className="w-full p-2 lg:p-3 rounded-3xl bg-transparent text-white border border-white"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          autoComplete="off"
        />

        <div>
          <p>
            Sudah punya akun?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Masuk
            </Link>
          </p>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button type="submit" className="w-full bg-gray-800 border border-white hover:bg-gray-800/80 hover:text-white text-xl rounded-3xl py-2 lg:py-2 text-sm lg:text-lg mt-6">
            Daftar
          </button>
          <h1 className="text-white font-light text-sm text-center mt-4">Atau</h1>
          <button className="w-full bg-black/80 border border-white hover:bg-gray-800/80 hover:text-white text-xl rounded-3xl py-2 lg:py-2 text-sm lg:text-lg mt-6">
            <img src="../assets/goggle.webp" alt="" className="h-6 w-6 inline mr-2" />
            Masuk dengan Google
          </button>
        </div>
      </form>
    </>
  );
};
export default FormRegister;
