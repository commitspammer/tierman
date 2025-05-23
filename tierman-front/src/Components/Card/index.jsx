export default function Card({ description, imageUrl }) {
  return (
    <div className="w-[140px] h-[130px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-200 dark:border-gray-700">
      <a href="#" className="block relative w-full h-full">
        <div className="relative w-full h-full">
          <img
            className="w-full h-full object-cover rounded-t-lg"
            src={imageUrl}
            alt=""
          />
          <div className="absolute bottom-0 left-0 w-full bg-black opacity-50 text-white text-sm p-1">
            {description}
          </div>
        </div>
      </a>
    </div>
  );
}
