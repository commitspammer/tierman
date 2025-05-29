import { DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardDrag from "../../Components/CardDrag";
import TierDrop from "../../Components/TierDrop";
import { api, backURL } from "../../Services/api";

export default function TierlistFill() {
  const { id } = useParams();
  const [tiers, setTiers] = useState([]);
  const [bag, setBag] = useState([]);

  useEffect(() => {
    api
      .get(`/tierlists/${id}`)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200 || response.status === 201) {
          setTiers(response.data.tiers);
          console.log(response.data.bag);
          setBag(response.data.bag);
        } else {
          console.error("Erro ao buscar tierlist:", response.data);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar tierlist:", error);
      });
  }, [id]);

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (!over) return;

    const cardId = active.id;
    const newStatus = over.id;

    setBag(() =>
      bag.map((card) =>
        card.id === cardId ? { ...card, tier_id: newStatus } : card
      )
    );
  };

  return (
    <div>
      <div className="my-8">
        <h1 className="mt-8 text-4xl font-bold mb-4">Preencha as Tiers</h1>
        <span className="text-gray-600">
          Preencha as arrastando e soltando as imagens nas tiers
        </span>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        {tiers.map((tier, index) => (
          <TierDrop
            key={index}
            tierData={tier}
            cards={bag.filter((image) => image.tier_id === tier.id)}
          />
        ))}
        <div className="cursor-grab rounded-lg grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 bg-neutral-700 min-h-[100px] mt-8 p-4 ">
          {bag
            .filter((image) => image.tier_id === null)
            .map((image) => (
              <CardDrag
                key={image.id}
                id={image.id}
                imageUrl={`${backURL}${image.path}`}
              />
            ))}
        </div>
      </DndContext>
    </div>
  );
}
