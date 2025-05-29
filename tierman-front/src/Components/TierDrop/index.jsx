import { useDroppable } from "@dnd-kit/core";
import { backURL } from "../../Services/api";
import CardDrag from "../CardDrag";

export default function TierDrop({ tierData, cards }) {
  const { setNodeRef } = useDroppable({
    id: tierData.id,
  });

  console.log("TierDrop", cards);

  return (
    <div className="flex w-full h-[100px] flex-row justify-center items-center mb-0.5">
      <h2
        className={`font-semibold text-neutral-100 w-[10%] min-h-[100px] flex items-center justify-center`}
        style={{ backgroundColor: tierData.color ?? "#ffffff" }}
      >
        {tierData.name}
      </h2>
      <div className="flex flex-1 flex-col gap-4">
        <div
          ref={setNodeRef}
          className="cursor-grab  flex bg-neutral-700 min-h-[100px] "
        >
          {cards.map((card) => (
            <CardDrag id={card.id} imageUrl={`${backURL}${card.path}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
