import { useState } from "react";

export function SingUp() {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function register(ev) {
    ev.preventDefault();
    await fetch('http://localhost:8800/api/auth/register',{
      method:'POST',
      body:JSON.stringify({lastname,firstname,email,password}),
      headers: {'Content-Type': 'application/json'},
    })

  }
  return (
    <div>
      <div className="mt-20">
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
      </div>
    </div>
  );
}
