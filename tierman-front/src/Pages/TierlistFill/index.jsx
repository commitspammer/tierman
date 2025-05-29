import { DndContext, useDroppable } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardDrag from "../../Components/CardDrag";
import TierDrop from "../../Components/TierDrop";
import { api, backURL } from "../../Services/api";

export default function TierlistFill() {
  const { id } = useParams();
  const [tiers, setTiers] = useState([]);

  const [bag, setBag] = useState([]);

  const { setNodeRef } = useDroppable({
    id: null,
  });

  useEffect(() => {
    api
      .get(`/tierlists/${id}`)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200 || response.status === 201) {
          setTiers(response.data.tiers);
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
        <div className="flex w-full h-[100px] flex-row bg-neutral-800 gap-4 justify-center items-center border-b border-orange-50">
          <h2 className="font-semibold text-neutral-100 w-[10%] h-[100px] flex items-center justify-center">
            Imagens
          </h2>
          <div className="flex flex-1 flex-col gap-4">
            <div
              ref={setNodeRef}
              className="cursor-grab rounded-lg flex p-4 shadow-sm hover:shadow-md"
            >
              {bag
                .filter((image) => image.tier_id === null)
                .map((image) => (
                  <CardDrag
                    id={image.id}
                    imageUrl={`${backURL}${image.path}`}
                  />
                ))}
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  );
}
