import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { api } from "../../Services/api";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    api
      .post("/users/login", {
        ...formData,
      })
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          toast.success("Usuário logado com sucesso!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            onClose: () => {
              setFormData({
                login: "",
                password: "",
              });

              document.cookie = `jwt=${response.data.jwt}; path=/; max-age=${
                60 * 60 * 24
              }`;

              navigate("/");
            },
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao entrar:", error);
        toast.error(error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-10/12 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <form className="bg-white p-6 rounded shadow-md w-96">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="login"
          >
            Usuário
          </label>
          <input
            type="text"
            id="login"
            placeholder="Digite seu usuário"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.login}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          onClick={handleSubmit}
        >
          Entrar
        </button>
      </form>
      <div className="mt-4">
        <p className="text-gray-600">
          Não tem uma conta?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Crie uma aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
