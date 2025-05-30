import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Card from "../../Components/Card";
import { api, backURL, getJwt } from "../../Services/api";

export default function Landing() {
  const [tierLists, setTierLists] = useState([]);
  const { setIsLogged } = useOutletContext();
  setIsLogged(getJwt("jwt"));

  useEffect(() => {
    api
      .get("/tierlists")
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response.data);
          setTierLists(response.data);
        } else {
          toast.error("Erro ao buscar tierlists", {
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
      })
      .catch((error) => {
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
  }, []);

  return (
    <div className=" bg-gray-100 overflow-y-auto">
      <div className=" text-center py-10">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Tierman</h1>
        <p className="text-lg mb-8">
          O melhor lugar para criar e compartilhar templates de tier list!
        </p>
        <Link
          to="/create-template"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Criar Template
        </Link>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Top Tiers</h1>
        <div className="flex flex-wrap gap-4">
          {tierLists.map((item, key) => (
            <Card
              key={key}
              id={item.id}
              description={item.name}
              imageUrl={`${backURL}${item.cover_image_path}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
