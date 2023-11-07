# Projeto GeolocationMobile

Bem-vindo ao guia do projeto Expo Go que combina Expo Go e TypeScript, além de usar local storage, background tasks, serviços de localização e ter as principais features cobertas por testes unitários usando Jest e a React Testing Library

## Iniciando

### 1. Clone o Repositório

Clone este repositório para o seu sistema executando o seguinte comando:

```
git clone https://github.com/lucasdmandrade/geolocationMobile
cd seu-repositorio
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

> Lembre-se de estar com o backend rodando de forma local, o projeto esta apontando para callback do emulador

### 7. Gerenciamento de Permissões de Localização

Certifique-se de que o seu projeto esteja configurado para solicitar permissões de localização quando necessário. Isso geralmente envolve o uso da biblioteca `expo-location`.

### 8. Lidando com Tarefas em Segundo Plano

Para lidar com tarefas em segundo plano, você pode usar a biblioteca `expo-background-fetch`. Consulte a documentação do Expo para obter mais detalhes sobre como configurar tarefas em segundo plano no seu projeto.

## Executando o Projeto

Para iniciar o projeto, utilize o seguinte comando:

```
expo start
```

Isso iniciará o servidor de desenvolvimento do Expo e abrirá a interface no seu navegador. A partir daí, você pode escolher executar o aplicativo no seu dispositivo físico ou em um emulador.

## Licença

Este projeto é distribuído sob a licença [MIT](LICENSE). Sinta-se à vontade para personalizar e usar conforme necessário.

---

Este README serve como um guia detalhado para configurar o seu projeto Expo Go com TypeScript, AsyncStorage, permissões de localização e tarefas em segundo plano. Consulte a documentação oficial do Expo e das bibliotecas relevantes para obter informações adicionais sobre configuração e uso.

Boa sorte com o seu projeto!
