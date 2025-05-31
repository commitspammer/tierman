import { backURL } from "../../Services/api";
import CardDrag from "../CardDrag";

export default function Tier({ tierData, cards }) {
  return (
    <div className="flex w-full h-[100px] flex-row justify-center items-center mb-0.5">
      <h2
        className={`font-semibold text-neutral-100 w-[10%] h-[100px] flex items-center justify-center`}
        style={{ backgroundColor: tierData.color ?? "#ffffff" }}
      >
        {tierData.name}
      </h2>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex bg-neutral-700 min-h-[100px] ">
          {cards?.map((card, key) => (
            <CardDrag
              key={key}
              id={card.id}
              imageUrl={`${backURL}${card.path}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
