import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { api } from "../../Services/api";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      toast.error("Por favor, preencha todos os campos", {
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
      return;
    } else if (password !== confirmPassword) {
      toast.error("As senhas não coincidem", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    try {
      const response = await api.post("/users", {
        username,
        email,
        password,
      });
      if (response.status === 201 || response.status === 200) {
        toast.success("Usuário cadastrado com sucesso", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          onClose: () => {
            setFormData({
              email: "",
              username: "",
              password: "",
              confirmPassword: "",
            });

            navigate("/login");
          },
        });
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
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
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-10/12 bg-gray-100 mt-8">
      <h1 className="text-4xl font-bold mb-4">Cadastre-se</h1>
      <form className="bg-white p-6 rounded shadow-md w-96">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu usuário"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.email}
            onChange={handleChange}
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Usuário
          </label>
          <input
            type="text"
            id="username"
            placeholder="Digite seu usuário"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.username}
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
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirmar Senha
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirme sua senha"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          onClick={handleSubmit}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
