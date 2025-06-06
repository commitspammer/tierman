import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import FormCreateTier from "../../Components/FormCreateTier";
import ImageUploader from "../../Components/ImageUploader";
import Tier from "../../Components/Tier";
import { api } from "../../Services/api";

export default function TierCreate() {
  const navigate = useNavigate();
  const [tiers, setTiers] = useState([]);
  const [tierListName, setTierListName] = useState("");
  const [creatingTier, setCreatingTier] = useState(true);
  const [files, setFiles] = useState([]);

  const handleImages = (files) => {
    setFiles(files);
  };

  const handleSubmit = async () => {
    if (!files || files.length === 0) {
      toast.warn("Selecione ao menos uma imagem.", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    try {
      const response = await api.post("/images", formData);

      if (response.status === 200 || response.status === 201) {
        const tierListData = {
          name: tierListName,
          tiers: tiers.map(({ name, color }) => ({ name, color })),
          images: response.data.paths.map((path) => ({ path })),
        };

        const tierlistResponse = await api.post("/tierlists", tierListData);

        if (
          tierlistResponse.status === 200 ||
          tierlistResponse.status === 201
        ) {
          toast.success("Tierlist criada com sucesso!", {
            position: "top-right",
            autoClose: 500,
            theme: "light",
            transition: Bounce,
            onClose: () => {
              setTierListName("");
              setTiers([]);
              setCreatingTier(true);
              navigate("/");
            },
          });
        }
      }
    } catch (error) {
      toast.error(
        "Erro ao criar tierlist: " +
          (error?.response?.data?.detail || error.message),
        {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        }
      );
    }
  };

  return (
    <div>
      <div className="my-8">
        <h1 className="mt-8 text-4xl font-bold mb-4">Crie seu template</h1>
        <span className="text-gray-600">
          Crie um template de tiers para o seu servidor. Você pode adicionar,
          editar e remover tiers conforme necessário.
        </span>
      </div>
      <div className="w-full flex flex-row gap-4 justify-between">
        <div className="w-[20rem]">
          <label htmlFor="name" className="text-sm font-bold mb-2">
            Nome da Tierlist
          </label>
          <input
            type="text"
            id="name"
            placeholder="Digite o nome da tierlist"
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline mb-4"
            value={tierListName}
            onChange={(e) => setTierListName(e.target.value)}
          />
        </div>
        <button
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded my-4"
          onClick={handleSubmit}
        >
          Criar Tierlist
        </button>
      </div>

      {tiers.map((tier, index) => (
        <Tier key={index} tierData={tier} />
      ))}
      {creatingTier ? (
        <FormCreateTier setCreatingTier={setCreatingTier} setTiers={setTiers} />
      ) : (
        <button
          className="cursor-pointer bg-neutral-400 text-white px-4 py-2 rounded mt-4"
          onClick={() => setCreatingTier(true)}
        >
          Adicionar Tier
        </button>
      )}
      <div className="mt-8">
        <ImageUploader onImagesChange={handleImages} />
      </div>
    </div>
  );
}
