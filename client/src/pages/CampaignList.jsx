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

    return <div>
        {campaigns.length > 0 ? (
        campaigns.map((camp) => (
          <div>
            <p>{camp.id} - {camp.title}</p>
            <p>{camp.description}</p>
          </div>
        ))
      ) : (
        <h1>Nenhum dado encontrado.</h1>
      )}
    </div>

}

export default CampaignList