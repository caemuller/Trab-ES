
/* Replace with your SQL commands */
/* Esses comandos sao rodados quando a DB sobe por meio da migration */
/*Eles criam as tables e algumas instancias*/

DROP TABLE IF EXISTS Enrollments;
DROP TABLE IF EXISTS VolunteerServices;
DROP TABLE IF EXISTS Campaigns;
DROP TABLE IF EXISTS Services;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    user_id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name VARCHAR(255) NOT NULL,
	password VARCHAR(255)NOT NULL,
	profile_description VARCHAR(255),
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    birth_year BIGINT,
    cpf VARCHAR(255) UNIQUE,
    admin_user BOOLEAN DEFAULT FALSE
);

CREATE TABLE Services (
    service_id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    service_name VARCHAR(255),
    service_description VARCHAR(255)
);

CREATE TABLE Campaigns (
    campaign_id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name VARCHAR(255),
    description TEXT,
    creator_id BIGINT,
    requested_service_id BIGINT,
    city VARCHAR(255),
    subscription_limit_date DATE,
    event_date DATE,
    aprovada BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (creator_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (requested_service_id) REFERENCES Services(service_id) ON DELETE CASCADE
);



CREATE TABLE VolunteerServices (
    volunteer_id BIGINT,
    service_id BIGINT,
    FOREIGN KEY (volunteer_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES Services(service_id) ON DELETE CASCADE
);

CREATE TABLE Enrollments (
    campaign_id BIGINT,
    volunteer_id BIGINT,
    FOREIGN KEY (volunteer_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (campaign_id) REFERENCES Campaigns(campaign_id) ON DELETE CASCADE,
    PRIMARY KEY (campaign_id, volunteer_id)
);


-- INSERTIONS

INSERT INTO Users (name, password, profile_description, gender, birth_year, cpf, admin_user) VALUES
('Alice Santos', 'senha123', 'Adora voluntariado e organizar campanhas.', 'female', 1990, '12345678901', FALSE),
('Carlos Oliveira', 'senhaSegura456', 'Apaixonado por projetos comunitários.', 'male', 1985, '98765432109', FALSE),
('Joana Silva', 'joanaSenha789', NULL, 'female', 1995, '12312312345', FALSE),
('Rafael Costa', 'rafaelSeguro99', 'Especialista em organizar workshops de tecnologia.', 'male', 1992, '45645645678', FALSE),
('Sam Taylor', 'samOHelper01', 'Voluntário não-binário apaixonado por inclusão.', 'other', 1998, '78978978900', FALSE),
('admin', 'superadmin', 'Gerenciador do sistema.', 'male', 1992, '74354883058', TRUE);


INSERT INTO Services (service_name, service_description) VALUES
('Distribuição de Alimentos', 'Ajudar a distribuir alimentos para comunidades carentes.'),
('Workshop de Tecnologia', 'Ensinar habilidades básicas de informática para membros da comunidade.'),
('Mutirão de Limpeza', 'Participar da limpeza de parques e espaços públicos.'),
('Apoio Psicológico', 'Fornecer suporte de saúde mental para jovens.'),
('Cozinheiro', 'Preparar alimentos para eventos comunitários e pessoas necessitadas.'),
('Mão de Obra', 'Fornecer suporte geral em projetos comunitários e construções.'),
('Construção', 'Ajudar na construção e reforma de estruturas comunitárias.'),
('Veterinário', 'Cuidar da saúde de animais em abrigos ou de rua.'),
('Enfermeiro', 'Prestar assistência de saúde básica para comunidades e eventos.'),
('Professor', 'Ensinar e compartilhar conhecimentos em diversas áreas.'),
('Apoio Psicológico', 'Oferecer suporte emocional e psicológico para aqueles que precisam.'),
('Reparo de Eletrodomésticos', 'Consertar eletrodomésticos para famílias de baixa renda.'),
('Jardinagem', 'Manter e revitalizar jardins e espaços verdes comunitários.'),
('Babá', 'Cuidar de crianças durante eventos comunitários ou para famílias carentes.'),
('Apoio Escolar', 'Ajudar crianças e jovens com suas tarefas escolares.'),
('Costureiro', 'Consertar e confeccionar roupas para pessoas necessitadas.'),
('Transporte', 'Oferecer transporte para eventos ou atividades comunitárias.'),
('Limpeza', 'Participar da limpeza e organização de espaços públicos e comunitários.'),
('Apoio a Idosos', 'Ajudar idosos com tarefas diárias e atividades recreativas.'),
('Tradutor', 'Fornecer serviços de tradução e interpretação em eventos comunitários.'),
('Design Gráfico', 'Criar materiais visuais para divulgação de eventos e campanhas.'),
('Programador', 'Desenvolver e manter soluções tecnológicas para a comunidade.'),
('Consultoria', 'Oferecer orientação especializada em áreas específicas para projetos comunitários.');


INSERT INTO Campaigns (name, description, creator_id, requested_service_id, city, subscription_limit_date, event_date) VALUES
('Workshop Tech4All', 'Uma campanha para ensinar habilidades de informática para pessoas necessitadas.', 1, 2, 'Porto Alegre', '2024-01-10', '2024-01-15'),
('Refeições Saudáveis para Todos', 'Distribuição de refeições saudáveis para os necessitados.', 2, 1, 'Caxias do Sul', '2024-02-15', '2024-02-20'),
('Mutirão de Embelezamento do Parque', 'Junte-se a nós para limpar e embelezar os parques locais.', 3, 3, 'Pelotas', '2024-03-05', '2024-03-10'),
('Iniciativa de Aconselhamento para Jovens', 'Oferecendo sessões de aconselhamento gratuitas para jovens locais.', 4, 4, 'Santa Maria', '2024-04-01', '2024-04-05');


INSERT INTO VolunteerServices (volunteer_id, service_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 1),
(5, 3);


INSERT INTO Enrollments (campaign_id, volunteer_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(3, 5),
(4, 5);