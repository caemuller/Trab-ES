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
          camp.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            className="search-input"
          />
        </div>
  
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((camp) => (
            <div className="card" key={camp.id}>
              <h3>{camp.name}</h3>
              <p><strong>Criador:</strong> {camp.creator.name}</p>
              <p><strong>Serviço Requisitado:</strong> {camp.requested_service_id}</p>
              <p><strong>Descrição:</strong> {camp.description}</p>
            </div>
          ))
        ) : (
          <h1 className="no-data">Nenhuma campanha encontrada.</h1>
        )}
      </div>
    );

}

export default CampaignList