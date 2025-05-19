import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de connexion ici
    console.log("Tentative de connexion avec:", credentials);
    // Après connexion réussie, rediriger vers la page d'accueil

    navigate("/manager");
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative overflow-hidden">
        {/* Élément décoratif */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-lightpink/30 rounded-full"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2 text-text">Connexion</h2>
          <div className="relative inline-block mb-6">
            <span className="text-fuchsia text-lg">Accédez à votre compte</span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="6"
              viewBox="0 0 150 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 3C35 1 115 1 150 3"
                stroke="#D4006D"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text mb-1"
              >
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-lightpink focus:border-transparent"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text mb-1"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-lightpink focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>


            <div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-lightpink text-fuchsia font-bold py-2.5 px-4 rounded-md transition-colors duration-300"
              >
                CONNEXION
              </button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-text">Vous n'avez pas de compte? </span>
            <a
              href="/register"
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
              className="font-medium text-fuchsia hover:text-fuchsia/80"
            >
              Inscrivez-vous
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
