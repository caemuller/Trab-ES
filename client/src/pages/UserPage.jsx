import React, { useState } from "react";

function UserPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    gender: "male",
    birthYear: "",
  });

  const [selectedService, setSelectedService] = useState("");
  const [addedServices, setAddedServices] = useState([]);

  const availableServices = [
    "Cozinheiro",
    "Mão de Obra",
    "Construção",
    "Veterinário",
    "Enfermeiro",
    "Professor",
    "Apoio Psicológico",
    "Reparo de Eletrodomésticos",
    "Jardinagem",
    "Babá",
    "Apoio Escolar",
    "Costureiro",
    "Transporte",
    "Limpeza",
    "Apoio a Idosos",
    "Tradutor",
    "Design Gráfico",
    "Programador",
    "Consultoria",
  ].sort();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    alert("Perfil atualizado com sucesso!");
  };

  const handleAddService = () => {
    if (selectedService && !addedServices.includes(selectedService)) {
      setAddedServices([...addedServices, selectedService]);
      setSelectedService("");
    } else {
      alert("Selecione um serviço válido que ainda não foi adicionado.");
    }
  };

  const handleRemoveService = (service) => {
    setAddedServices(addedServices.filter((s) => s !== service));
  };

  const handleSaveServices = async () => {
    if (addedServices.length === 0) {
        alert("Nenhum serviço para salvar.");
        return;
    }

    try {
        const userId = 123; // Replace with the actual user ID from context or props
        const response = await fetch(`http://localhost:8080/users/${userId}/services`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ services: addedServices }),
        });

        if (response.ok) {
            const result = await response.json();
            alert("Serviços salvos com sucesso!");
        } else {
            throw new Error("Falha ao salvar serviços.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao salvar os serviços. Tente novamente.");
    }
};


  return (
    <div className="user-page-container">
      <h1>Editar Perfil</h1>
      <div className="form-container">
        {/* Parte 1: Alterar informações do usuário */}
        <div className="form-half">
          <form className="user-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descrição:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="gender">Género:</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="other">Outro</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="birthYear">Ano de Nascimento:</label>
              <input
                type="number"
                id="birthYear"
                name="birthYear"
                value={formData.birthYear}
                onChange={handleInputChange}
              />
            </div>
            <button className="save-button" type="submit">
              Salvar Alterações
            </button>
          </form>
        </div>

        {/* Parte 2: Adicionar serviços */}
        <div className="form-half">
          <div className="form-group">
            <label htmlFor="services">Adicionar Serviço:</label>
            <select
              id="services"
              value={selectedService}
              onChange={handleServiceChange}
            >
              <option value="" disabled>
                Selecione o serviço
              </option>
              {availableServices.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <button
              className="add-service-button"
              type="button"
              onClick={handleAddService}
            >
              Adicionar Serviço
            </button>
          </div>
          <div className="added-services">
            <h3>Serviços Adicionados:</h3>
            {addedServices.length > 0 ? (
                <ul>
                {addedServices.map((service, index) => (
                    <li key={index} className="service-item">
                    {service}
                    <button
                        className="remove-service-button"
                        onClick={() => handleRemoveService(service)}
                    >
                        X
                    </button>
                    </li>
                ))}
                </ul>
            ) : (
                <p>Nenhum serviço adicionado ainda.</p>
            )}
            {/* Ensure the save button is easily visible */}
            <button
                className="save-services-button"
                onClick={handleSaveServices}
                style={{
                display: "block",
                marginTop: "10px",
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                }}
            >
                Salvar Serviços
            </button>
            </div>

        </div>
      </div>
    </div>
  );
}

export default UserPage;
