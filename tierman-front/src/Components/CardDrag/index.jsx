import { useDraggable } from "@dnd-kit/core";

export default function CardDrag({ imageUrl, id }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="w-[100px] h-[100px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-200 dark:border-gray-700"
      style={style}
    >
      <img
        className="w-full h-full object-fill rounded-t-lg"
        src={imageUrl}
        alt=""
      />
    </div>
  );
}
