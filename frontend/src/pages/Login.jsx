import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importez useNavigate
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slice/authSlice";
import { toast } from "react-toastify";

export function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const user = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Utilisez useNavigate

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const response = await dispatch(login(credentials));
      console.log(response);
      if (response.type === "auth/login/rejected") {
        toast.warning(response.payload?.stack || 'Une erreur est survenue');
      } else {
        toast.info('Connexion réussie !');
        navigate('/'); // Redirigez l'utilisateur à la page d'accueil après la connexion réussie
      }
    } catch (error) {
      console.log(error);
      toast.error('Une erreur est survenue lors de la connexion.');
    }
  };
  return (
    <div className=" p-4 border-2 primary rounded-lg shadow-lg max-w-md mx-auto mt-20">
      <h1 className="mt-6 text-4xl text-center mb-10">Se connecter</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="johndoe@email.com"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={credentials.email}
          onChange={(ev) => setCredentials({...credentials,email:ev.target.value})}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={credentials.password}
          onChange={(ev) => setCredentials({...credentials,password:ev.target.value})}
        />
        <button
          type="submit"
          className="w-full px-4 py-2 primary text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Se connecter
        </button>
      </form>
      <p className="mt-4 text-center">
        Pas de compte ?{" "}
        <Link to="/signup" className="text-blue-500 hover:text-blue-700">
          S'inscrire
        </Link>
      </p>
    </div>
  );
}
