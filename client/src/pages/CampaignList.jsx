import { useEffect, useState } from "react";
import CampaignService from "../services/CampaignService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Menu from "./Menu";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import EnrollmentService from "../services/EnrollmentService";

function CampaignList() {
    const [campaigns, setCampaigns] = useState([]);
    const [filteredCampaigns, setFilteredCampaigns] = useState([]); // Lista filtrada
    const [searchTerm, setSearchTerm] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const campaignService = new CampaignService();
    const enrollmentService = new EnrollmentService();
    const authService = new AuthService();
    const navigate = useNavigate();

    const getCampaigns = async () => {
        const data = await campaignService.list();
        setCampaigns(data || []); 
        setFilteredCampaigns(data || []);
    };

    useEffect(() => {  
      console.log(authService.getUserId());
        getCampaigns();
        setIsAdmin(authService.isAdmin());
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

    const handleDelete = async (campaignId) => {
      try {
          await campaignService.delete(campaignId);
          await getCampaigns();
      } catch (error) {
          console.error("Error deleting campaign:", error);
      }
    };

    const handleApprove = async (campaignId) => {
      try {
          await campaignService.approve(campaignId);
          await getCampaigns();
      } catch (error) {
          console.error("Error deleting campaign:", error);
      }
    };

    const enrollCampaign = async (campaignId) => {
      enrollmentService.create(campaignId, authService.getUserId());
      await getCampaigns();
    }

    const cancelEnrollment = async (campaignId) => {
      enrollmentService.delete(campaignId, authService.getUserId());
      await getCampaigns();
    }

    return (
      <>
      <Menu/>
      <div className="content">
        <div className="container">
          <div className="search-bar flex g-15">
            <input
              type="text"
              placeholder="Buscar campanha pelo nome"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
            />
            <button className="approve-button" onClick={() => { navigate("/campaign-form") }}>
              Adicionar
              <FontAwesomeIcon icon={faPlus}/>
            </button>

          </div>
          <div className="col g-15 cursor">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((camp) => (
              <div className="card" key={camp.campaign_id}>
                <div className="flex justify-content-space-between">
                  <h3>{camp.name}</h3>
                  {
                    isAdmin ? 
                    <div className="flex g-15">
                      <button className="delete-button" onClick={() => { handleDelete(camp.campaign_id) }}>
                        <FontAwesomeIcon icon={faTrash}/>
                      </button>
                      {
                        !camp.aprovada ?
                        <button className="approve-button" onClick={() => { handleApprove(camp.campaign_id) }}>
                          <FontAwesomeIcon icon={faCheck}/>
                        </button>
                        : <></>
                      }
                    </div>
                    : <></>
                  }
                </div>
                <p><strong>Criador:</strong> {camp.creator.name}</p>
                <p><strong>Serviço Requisitado:</strong> {camp.requested_service_id}</p>
                <p><strong>Data do evento:</strong> {camp.event_date}</p>
                <p><strong>Descrição:</strong> {camp.description}</p>
                <p><strong>Cidade:</strong> {camp.city}</p>
                <p><strong>Data final de inscrição:</strong> {camp.subscription_limit_date}</p>
                {
                  camp.enrolled_users.includes(parseInt(authService.getUserId())) ? 
                  <button className="delete-button" onClick={() => {cancelEnrollment(camp.campaign_id)}}>Cancelar Inscrição</button>
                  : <button className="submit-button" onClick={() => {enrollCampaign(camp.campaign_id)}}>Inscrever-se</button>
                }
                
              </div>
            ))
          ) : (
            <h1 className="no-data">Nenhuma campanha encontrada.</h1>
          )}
          </div>
        </div>
      </div>
    </>
    );

}

export default CampaignList