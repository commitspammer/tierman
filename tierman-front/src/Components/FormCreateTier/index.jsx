import { useState } from "react";

export default function FormCreateTier({ setCreatingTier, setTiers }) {
  const [formData, setFormData] = useState({
    name: "",
    color: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTiers((prevTiers) => [...prevTiers, formData]);
    setCreatingTier(false);
    setFormData({ name: "", color: "" });
  };

  return (
    <div className="flex w-full h-[100px] flex-row bg-neutral-700 gap-4 justify-center items-center">
      <div className="flex flex-1 flex-col gap-4">
        <div className="p-4">
          <form className="flex flex-row gap-4 justify-evenly">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-white text-sm font-bold mb-2"
              >
                Nome do Tier
              </label>
              <input
                type="text"
                id="name"
                placeholder="Digite o nome do tier"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="color"
                className="text-white text-sm font-bold mb-2"
              >
                Cor do Tier
              </label>
              <input
                type="color"
                id="color"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white  leading-tight focus:outline-none focus:shadow-outline h-12"
                value={formData.color}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                onClick={handleSubmit}
                disabled={!formData.name || !formData.color}
              >
                Adicionar
              </button>
              <button
                type="button"
                className="px-3 py-2 text-xs font-medium text-center text-black bg-stone-300 rounded-lg hover:bg-stone-400 focus:ring-4 focus:outline-none focus:ring-blue-300"
                onClick={() => setCreatingTier(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
