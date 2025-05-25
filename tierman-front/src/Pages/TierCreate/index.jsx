import { useState } from "react";
import FormCreateTier from "../../Components/FormCreateTier";
import Tier from "../../Components/Tier";

export default function TierCreate() {
  const [tiers, setTiers] = useState([{ name: "S", color: "#FF7F7F" }]);
  const [creatingTier, setCreatingTier] = useState(false);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Crie seu template</h1>
      <span className="text-gray-600 mb-4">
        Crie um template de tiers para o seu servidor. Você pode adicionar,
        editar e remover tiers conforme necessário.
      </span>
      {tiers.map((tier, index) => (
        <Tier key={index} tierData={tier} />
      ))}
      {creatingTier ? (
        <FormCreateTier setCreatingTier={setCreatingTier} setTiers={setTiers} />
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => setCreatingTier(true)}
        >
          Adicionar Tier
        </button>
      )}
    </div>
  );
}
