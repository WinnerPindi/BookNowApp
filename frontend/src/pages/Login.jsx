export function Login({ email, password }) {
  return (
    <div className="p-4 border-2 primary rounded-lg shadow-lg max-w-md mx-auto mt-20 ">
      <h1 className="mt-6 text-4xl text-center mb-10">Se connecter</h1>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="johndoe@email.com"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 primary text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
