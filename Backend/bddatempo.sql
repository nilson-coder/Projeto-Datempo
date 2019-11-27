CREATE DATABASE bddatempo;

USE bddatempo;

CREATE TABLE tipousuario(
		IdTipoUsuario INT IDENTITY PRIMARY KEY NOT NULL,
		Titulo VARCHAR(255) UNIQUE NOT NULL
);


CREATE TABLE usuario(
		IdUsuario INT IDENTITY PRIMARY KEY NOT NULL,
		Nome VARCHAR(255) NOT NULL,
		Email VARCHAR(255) UNIQUE NOT NULL,
		Senha VARCHAR(255) NOT NULL,
        Identificador VARCHAR(14),
		IdTipoUsuario INT FOREIGN KEY REFERENCES tipousuario(IdTipoUsuario)
);

CREATE TABLE endereco(
		IdEndereco INT IDENTITY PRIMARY KEY NOT NULL,
		CEP CHAR(8) UNIQUE NOT NULL,
		Numero VARCHAR(255) NOT NULL,
        Complemento VARCHAR(255),
        IdUsuario INT FOREIGN KEY REFERENCES usuario(IdUsuario)
);

CREATE TABLE categoria(
		IdCategoria INT IDENTITY PRIMARY KEY NOT NULL,
		NomeCategoria VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE produto(
		IdProduto INT IDENTITY PRIMARY KEY NOT NULL,
		NomeProduto VARCHAR(255) NOT NULL,
		IdCategoria INT FOREIGN KEY REFERENCES categoria(IdCategoria)
);

CREATE TABLE oferta(
		IdOferta INT IDENTITY PRIMARY KEY NOT NULL,
		NomeOferta VARCHAR(255) NOT NULL,
		Marca VARCHAR(255) NOT NULL,
		QuantVenda INT NOT NULL,
		Validade DATETIME NOT NULL,
		Preco MONEY NOT NULL,
		Imagem VARCHAR(255) NOT NULL,
		Descricao VARCHAR(255) NOT NULL,
		IdUsuario INT FOREIGN KEY REFERENCES usuario(IdUsuario),
		IdProduto INT FOREIGN KEY REFERENCES produto(IdProduto)
);

CREATE TABLE reserva(
		IdReserva INT IDENTITY PRIMARY KEY NOT NULL,
		QuantCompra INT NOT NULL,
		DataReserva DATETIME NOT NULL,
		PIN INT NOT NULL,
		IdOferta INT FOREIGN KEY REFERENCES oferta(IdOferta),
		IdUsuario INT FOREIGN KEY REFERENCES usuario(IdUsuario)
);


INSERT INTO tipousuario (Titulo) VALUES ('Administrador'),('Fornecedor'),('Consumidor');

INSERT INTO categoria (NomeCategoria) VALUES ('Bebidas'), ('Higiene'), ('Matinais');

INSERT INTO produto (NomeProduto, IdCategoria) VALUES ('Refrigerante',1), ('Sabonete',2), ('Leite',3);