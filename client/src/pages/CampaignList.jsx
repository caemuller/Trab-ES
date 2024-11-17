import { useEffect, useState } from "react";
import CampaignService from "../services/CampaignService"

function CampaignList() {
    const [campaigns, setCampaigns] = useState([]);
    const campaignService = new CampaignService();


    useEffect(() => {
        const getCampaigns = async () => {
            const data = await campaignService.list();
            setCampaigns(data || []); 
        };
  
        getCampaigns();
    }, []);
    console.log(campaigns);
    

    return (
      <div className="container">
        {campaigns.length > 0 ? (
          campaigns.map((camp) => (
            <div className="card" key={camp.id}>
              <h3>{camp.name}</h3>
              <p><strong>Criador:</strong> {camp.creator.name}</p>
              <p><strong>Serviço Requisitado:</strong> {camp.requested_service_id}</p>
              <p><strong>Descrição:</strong> {camp.description}</p>
            </div>
          ))
        ) : (
          <h1 className="no-data">Nenhum dado encontrado.</h1>
        )}
      </div>
    );

}

export default CampaignList