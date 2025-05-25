export default function Tier({ tierData }) {
  return (
    <div className="flex w-full h-[100px] flex-row bg-neutral-800 gap-4 justify-center items-center">
      <h2
        className={`font-semibold text-neutral-100 w-[10%] h-[100px] flex items-center justify-center`}
        style={{ backgroundColor: tierData.color ?? "#ffffff" }}
      >
        {tierData.name}
      </h2>
      <div className="flex flex-1 flex-col gap-4">
        <div className="cursor-grab rounded-lg  p-4 shadow-sm hover:shadow-md"></div>
      </div>
    </div>
  );
}
