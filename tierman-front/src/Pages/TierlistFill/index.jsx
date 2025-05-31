import { DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import CardDrag from "../../Components/CardDrag";
import TierDrop from "../../Components/TierDrop";
import { api, backURL } from "../../Services/api";

export default function TierlistFill() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tierList, setTierList] = useState({});
  const [tiers, setTiers] = useState([]);
  const [bag, setBag] = useState([]);

  useEffect(() => {
    api
      .get(`/tierlists/${id}`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setTierList(response.data);
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

  useEffect(() => {
    const tierListFilled = {
      ...tierList,
      bag: bag.filter((image) => image.tier_id === null),
      tiers: tiers.map((tier) => ({
        ...tier,
        images: bag.filter((image) => image.tier_id === tier.id),
      })),
    };
    console.log("TierList Filled:", tierListFilled);
  }, [bag]);

  const postRanking = async () => {
    const tierListFilled = {
      ...tierList,
      bag: bag.filter((image) => image.tier_id === null),
      tiers: tiers.map((tier) => ({
        ...tier,
        images: bag.filter((image) => image.tier_id === tier.id),
      })),
    };

    api
      .post(`tierlists/${tierList.id}/rankings`, tierListFilled)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          toast.success("Ranking publicado com sucesso!", {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            onClose: () => {
              setBag([]);
              setTiers([]);
              setTierList({});

              navigate("/");
            },
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao publicar ranking:", error);
        toast.error("Erro ao publicar ranking", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  return (
    <div>
      <div className="w-full flex flex-row gap-4 justify-between items-center">
        <div className="my-8">
          <h1 className="mt-8 text-4xl font-bold mb-4">Preencha as Tiers</h1>
          <span className="text-gray-600">
            Preencha as arrastando e soltando as imagens nas tiers
          </span>
        </div>
        <button
          className="cursor-pointer h-12 bg-green-600 text-white px-4 py-2 rounded"
          onClick={postRanking}
        >
          Publicar Ranking!
        </button>
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
