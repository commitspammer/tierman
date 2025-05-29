import { useState } from "react";
import Tier from "../../Components/Tier";

export default function TierlistFill() {
  const [tiers, setTiers] = useState([
    { name: "S", color: "#FF7F7F" },
    { name: "A", color: "#a8a632" },
    { name: "B", color: "#98a832" },
    { name: "C", color: "#4ea832" },
    { name: "D", color: "#32a89a" },
  ]);

  const [cards, setCards] = useState([
    { id: "card1", content: "Card 1" },
    { id: "card2", content: "Card 2" },
    { id: "card3", content: "Card 3" },
  ]);

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (!over) return;

    const cardId = active.id;
    const newStatus = over.id;
  };

  return (
    <div>
      <div className="my-8">
        <h1 className="mt-8 text-4xl font-bold mb-4">Preencha as Tiers</h1>
        <span className="text-gray-600">
          Preencha as arrastando e soltando as imagens nas tiers
        </span>
      </div>
      {tiers.map((tier, index) => (
        <Tier key={index} tierData={tier} />
      ))}
    </div>
  );
}
