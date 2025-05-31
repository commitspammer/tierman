import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { api, getJwt } from "../../Services/api";

export default function Profile() {
  const navigate = useNavigate();
  const { setIsLogged } = useOutletContext();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    const id = getJwt("jwt");
    api
      .get(`/users/${id}`)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200 || response.status === 201) {
          const data = response.data;
          setFormData({
            email: data.email,
            username: data.username,
            newPassword: "",
            confirmNewPassword: "",
          });
        } else {
          console.error("Erro ao buscar usuário:", response.data);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar usuário:", error);
      });
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, email, newPassword, confirmNewPassword } = formData;

    if (!username || !email) {
      toast.error(
        "Por favor, preencha pelo menos os campos de email e usuário",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
      return;
    } else if (newPassword !== confirmNewPassword) {
      toast.error("As novas senhas não coincidem", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      const id = getJwt("jwt");
      const response = await api.put("/users/" + id, {
        username,
        email,
        ...(newPassword && { password: newPassword }),
      });
      if (response.status === 201 || response.status === 200) {
        setFormData((prevState) => ({
          ...prevState,
          newPassword: "",
          confirmNewPassword: "",
        }));
        toast.success("Usuário atualizado com sucesso", {
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
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
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

  const handleDelete = (event) => {
    const id = getJwt("jwt");
    api
      .delete(`/users/${id}`)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200 || response.status === 201) {
          localStorage.removeItem("jwt");
          navigate("/");
        } else {
          console.error("Erro ao deletar usuário:", response.data);
        }
      })
      .catch((error) => {
        console.error("Erro ao deletar usuário:", error);
      });
  };

  const handleLogout = (event) => {
    localStorage.removeItem("jwt");
    setIsLogged(false);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-10/12 bg-gray-100 mt-8">
      <h1 className="text-4xl font-bold mb-4 mt-4">Perfil</h1>
      <form className="bg-white p-6 rounded shadow-md w-96">
        <button
          type="submit"
          className="cursor-pointer mb-4 bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          onClick={handleLogout}
        >
          Log out
        </button>

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
        </div>
        <div className="mb-4">
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
            Nova senha
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder="Digite sua nova senha"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmNewPassword"
          >
            Confirmar nova senha
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            placeholder="Confirme sua nova senha"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.confirmNewPassword}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          onClick={handleSubmit}
        >
          Atualizar perfil
        </button>
        <button
          type="submit"
          className="cursor-pointer mt-16 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          onClick={handleDelete}
        >
          Deletar conta
        </button>
      </form>
    </div>
  );
}
