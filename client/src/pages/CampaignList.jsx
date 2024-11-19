import { useEffect, useState } from "react";
import CampaignService from "../services/CampaignService"

function CampaignList() {
    const [campaigns, setCampaigns] = useState([]);
    const [filteredCampaigns, setFilteredCampaigns] = useState([]); // Lista filtrada
    const [searchTerm, setSearchTerm] = useState("");
    const campaignService = new CampaignService();


    useEffect(() => {
        const getCampaigns = async () => {
            const data = await campaignService.list();
            setCampaigns(data || []); 
            setFilteredCampaigns(data || []);
        };
  
        getCampaigns();
    }, []);

    useEffect(() => {
      if (searchTerm.trim() === "") {
        setFilteredCampaigns(campaigns);
      } else {
        const filtered = campaigns.filter((camp) =>
          camp.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setFilteredCampaigns(filtered);
      }
    }, [searchTerm, campaigns]);
    

    return (
      <div className="container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar campanha pelo nome"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="col g-15 cursor">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((camp) => (
            <div className="card" key={camp.id}>
              <h3>{camp.name}</h3>
              <p><strong>Criador:</strong> {camp.creator.name}</p>
              <p><strong>Serviço Requisitado:</strong> {camp.requested_service_id}</p>
              <p><strong>Data do evento:</strong> {camp.event_date}</p>
              <p><strong>Descrição:</strong> {camp.description}</p>
              <p><strong>Cidade:</strong> {camp.city}</p>
              <p><strong>Data final de inscrição:</strong> {camp.subscription_limit_date}</p>
            </div>
          ))
        ) : (
          <h1 className="no-data">Nenhuma campanha encontrada.</h1>
        )}
        </div>
</div>
    );

}

export default CampaignList