# Projeto GeolocationMobile

Bem-vindo ao guia do projeto GeolocationMobile que combina Expo Go e TypeScript, além de usar local storage, background tasks, serviços de localização e ter as principais features cobertas por testes unitários usando Jest e a React Testing Library

## Iniciando

### 1. Clone o Repositório

Clone este repositório para o seu sistema executando o seguinte comando:

```
git clone https://github.com/lucasdmandrade/geolocationMobile
cd geolocationMobile
```

### 2. Instale as Dependências

Instale as dependências do projeto executando:

```
npm install
```

#### ou com Yarn

```
yarn
```

### 3. Inicialize o Projeto Expo GO

Siga as instruções do Expo CLI para iniciar o projeto de acordo com o sistema operacional do seu dispositivo ou emulador.

```
yarn start
```

> Lembre-se de que o backend deve estar em execução localmente, pois o projeto está apontando para o callback do emulador

### 4. Gerenciamento de Permissões

Certifique-se de que seu dispositivo/emulador tenha as permissões de localização e segundo plano liberadas. Isso é necessário devido ao uso das bibliotecas `expo-location expo-background-fetch expo-task-manager`.

### 5. Testes

Criei comandos para simplificar o processo de execução dos testes. Para rodar os testes, basta executar os seguintes comandos:

```
yarn test
```

E atualize os snapshots com o comando:

```
yarn test-snapshot
```

## Licença

Este projeto é distribuído sob a licença [MIT](LICENSE). Sinta-se à vontade para personalizar e usar conforme necessário.

---

Este README serve como um guia detalhado para executar este projeto. Para obter informações adicionais sobre configuração e uso, consulte a documentação oficial do Expo e das bibliotecas relevantes.
