import Card from "../../Components/Card";

export default function Landing() {
  return (
    <div className=" bg-gray-100 overflow-y-auto">
      <div className=" text-center py-10">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Tierman</h1>
        <p className="text-lg mb-8">
          O melhor lugar para criar e compartilhar templates de tier list!
        </p>
        <a
          href="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Criar Template
        </a>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Top Tiers</h1>
        <div className="flex flex-wrap gap-4">
          {Array(10)
            .keys()
            .map((key) => (
              <Card
                key={key}
                description={"Um tier criado"}
                imageUrl={"assets/Tierman_logo.png"}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
