import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampaignService from "../services/CampaignService";
import Notification from "./Notification";
import "../assets/css/main.css";
import Menu from "./Menu";

function CampaignForm() {
    const [formData, setFormData] = useState({
        campaign_id: "",
        name: "",
        description: "",
        creator_id: "",
        requested_service_id: "",
        city: "",
        subscription_limit_date: "",
        event_date: "",
        aprovada: false
    });

    const [notification, setNotification] = useState({ message: "", isVisible: false });
    const navigate = useNavigate();
    const campaignService = new CampaignService();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const hideNotification = () => {
        setNotification({ message: "", isVisible: false });
    };

    const validateForm = () => {
        if (!formData.name) {
            setNotification({ message: "Nome da campanha é obrigatório", isVisible: true });
            throw new Error("Validation error");
        }
        if (!formData.subscription_limit_date || !formData.event_date) {
            setNotification({ message: "Datas são obrigatórias", isVisible: true });
            throw new Error("Validation error");
        }
        if (new Date(formData.subscription_limit_date) > new Date(formData.event_date)) {
            setNotification({ message: "A data limite de inscrição deve ser antes da data do evento", isVisible: true });
            throw new Error("Validation error");
        }
        return true;
    };

    const saveCampaign = async () => {
        try {
            validateForm();

            const response = await campaignService.save(formData);

            if (response.status === 200) {
                navigate("/campaigns");
            }
        } catch (error) {
            console.error("Failed to save campaign", error);
            setNotification({ message: "Erro ao salvar campanha", isVisible: true });
        }
    };

    return (
        <div>
          <Menu />
          <div className="content"> 
            <div className="page-container p-10-per m-bottom-320">
                <div className="form-container">
                    <h1>Cadastro de Campanha</h1>

                    <div className="form-group">
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            placeholder="Digite o nome da campanha"
                            value={formData.name}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descrição:</label>
                        <textarea
                            id="description"
                            name="description"
                            onChange={handleChange}
                            placeholder="Digite a descrição"
                            value={formData.description}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="requested_service_id">Serviço Requisitado:</label>
                        <input
                            type="text"
                            id="requested_service_id"
                            name="requested_service_id"
                            onChange={handleChange}
                            placeholder="Digite o ID do serviço"
                            value={formData.requested_service_id}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">Cidade:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            onChange={handleChange}
                            placeholder="Digite a cidade"
                            value={formData.city}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subscription_limit_date">Data limite de inscrição:</label>
                        <input
                            type="date"
                            id="subscription_limit_date"
                            name="subscription_limit_date"
                            onChange={handleChange}
                            value={formData.subscription_limit_date}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="event_date">Data do evento:</label>
                        <input
                            type="date"
                            id="event_date"
                            name="event_date"
                            onChange={handleChange}
                            value={formData.event_date}
                        />
                    </div>

                    <div>
                        <button className="submit-button" onClick={saveCampaign}>
                            Salvar Campanha
                        </button>
                    </div>
                </div>
                <Notification
                    message={notification.message}
                    isVisible={notification.isVisible}
                    onClose={hideNotification}
                />
            </div>
          </div>
      </div>
    );
}

export default CampaignForm;
