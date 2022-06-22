# Sistema-de-login
  Sistema para login utilizando node, jwt e mongoDB.
  
  ## Pré requisitos
  mongoDB
  Node
  
  ## Instalação
  Crie um arquivo .env no diretorio com as variáveis:
  
  MONGO_CONECTION_URL="seu endereço mongo"
  PORT = "porta"
  TOKEN_SECRET = "chave_para_criptografia_do_token"
  
  ## Notas
  Estou utilizando o mongo local
  No futuro criarei uma lista bloqueando os tokens após o logout
