import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

export function SingUp() {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  async function register(ev) {
    ev.preventDefault();
    try {
      const response = await fetch("http://localhost:8800/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ lastname, firstname, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        toast.info('Inscription réussie !');
        navigate('/login'); // Redirigez vers la page de connexion si l'inscription est réussie
      } else {
        throw new Error('Failed to register');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  }


  return (
    <div>
      <div className="p-4 border-2 primary rounded-lg shadow-lg max-w-md mx-auto mt-20">
        <h1 className="text-4xl text-center mb-4">Inscription</h1>
        <form className="max-w-xl mx-auto " onSubmit={register}>
          <input
            type="text"
            placeholder="Entrez votre nom"
            value={lastname}
            onChange={(ev) => setLastname(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Entrez votre prénom"
            value={firstname}
            onChange={(ev) => setFirstname(ev.target.value)}
          />
          <input
            type="email"
            placeholder="Entrez votre adresse mail"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe "
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">S'inscrire</button>
        </form>
        <p className="mt-4 text-center">
          Déjà un compte ?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
