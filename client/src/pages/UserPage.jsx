import React, { useState } from "react";

function UserPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    gender: "male",
    birthYear: "",
    services: "",  // Agora é apenas um único serviço selecionado
  });

  // Lista de serviços possíveis
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
  ].sort(); // Ordena a lista alfabeticamente

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // LÓGICA DE SALVAR ALTERAÇÕES DO PERFIL
    console.log("Updated Profile Data:", formData);
    alert("Perfil atualizado com sucesso!");
  };

  return (
    <div className="user-page-container">
      <h1>Editar Perfil</h1>
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
          <label htmlFor="gender">Gênero:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleSelectChange}
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
        <div className="form-group">
          <label htmlFor="services">Serviços:</label>
          <select
            id="services"
            name="services"
            value={formData.services}
            onChange={handleSelectChange}
          >
            <option value="" disabled>Selecione o serviço</option>
            {availableServices.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        <button className="save-button" type="submit">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}

export default UserPage;
