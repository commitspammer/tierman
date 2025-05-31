import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tier from "../../Components/Tier";
import { api } from "../../Services/api";

export default function TierRanked() {
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
          const allImages = response.data.tiers.flatMap((tier) => tier.images);
          setBag(allImages);
        } else {
          console.error("Erro ao buscar tierlist:", response.data);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar tierlist:", error);
      });
  }, [id]);

  return (
    <div>
      <div className="w-full flex flex-row gap-4 justify-between items-center">
        <div className="my-8">
          <h1 className="mt-8 text-4xl font-bold mb-4">Tierlist Rankeada</h1>
          <span className="text-gray-600">
            Essa tierlist foi rankeada por{" "}
            <span className="text-gray-600 font-black">
              {tierList.owner_name}
            </span>
          </span>
        </div>
      </div>
      {tiers.map((tier, index) => (
        <Tier
          key={index}
          tierData={tier}
          cards={bag.filter((image) => image.tier_id === tier.id)}
        />
      ))}
    </div>
  );
}
