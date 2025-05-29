import { useDroppable } from "@dnd-kit/core";
import { backURL } from "../../Services/api";
import CardDrag from "../CardDrag";

export default function TierDrop({ tierData, cards }) {
  const { setNodeRef } = useDroppable({
    id: tierData.id,
  });

  console.log("TierDrop", cards);

  return (
    <div className="flex w-full h-[100px] flex-row bg-neutral-800 gap-4 justify-center items-center border-b border-orange-50">
      <h2
        className={`font-semibold text-neutral-100 w-[10%] h-full flex items-center justify-center`}
        style={{ backgroundColor: tierData.color ?? "#ffffff" }}
      >
        {tierData.name}
      </h2>
      <div className="flex flex-1 flex-col gap-4">
        <div
          ref={setNodeRef}
          className="cursor-grab rounded-lg flex p-4 shadow-sm hover:shadow-md"
        >
          {cards.map((card) => (
            <CardDrag id={card.id} imageUrl={`${backURL}${card.path}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
