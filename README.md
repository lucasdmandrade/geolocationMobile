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

---

## Considerações

As tecnologias foram cuidadosamente escolhidas para atender às necessidades do projeto e ao contexto. Optou-se por utilizar React Native e Expo Go devido à impossibilidade de emular para iOS, uma vez que o MacBook estava indisponível durante o desenvolvimento. A escolha do Expo também se justifica pela sua agilidade e ambiente amigável para desenvolvedores.

Além disso, buscou-se demonstrar o comprometimento com a qualidade do código e do aplicativo, investindo na implementação de testes. Utilizaram-se testes de snapshot para garantir a integridade da interface, testes das principais funções para verificar o comportamento esperado e testes de integrações nativas para assegurar o funcionamento adequado das características específicas do Expo.

No que diz respeito ao design, utilizou-se o modelo como referência, com o principal objetivo de oferecer uma experiência de usuário eficaz e funcional.

É importante destacar que, devido às limitações do Expo Go, algumas funcionalidades em segundo plano não podem ser testadas. No entanto, foram realizadas todas as configurações necessárias para o projeto.

Caso haja alguma dúvida ou feedback, não hesitem em entrar em contato.

---

## Aprofundamento em tecnologias

Daqui para frente, estou argumentando as escolhas técnicas, mas é importante ressaltar que o principal motivador de cada tomada de decisão foi o contexto.

Como já dito, utilizei o Expo Go por estar impossibilitado de emular para iOS, sendo essa a única alternativa. Dados os requisitos nativos, o React Native CLI é uma escolha mais consistente. Apesar das integrações do Expo com serviços nativos serem simples, elas apresentam muitas inconsistências e dificuldades de manutenção. Então, nesse requisito, fui forçado a fazer uso dessa tecnologia e isso causou outras escolhas.

Optei por armazenar os pontos localmente usando o Async Storage. Além de sua facilidade de integração graças ao Expo, ele apresenta um baixo custo de uso e processamento em comparação com as alternativas mais robustas. Vale ressaltar que, com o devido tempo e consequentemente fora do Expo (usando o React Native CLI), minha primeira escolha seria um banco NoSQL local, como o Realm, por exemplo. Além disso, seria possível usar o MKKV devido à simplicidade dos dados, sendo uma solução moderna e possivelmente a mais performática atualmente, embora não sendo ideal por ser projetada principalmente para dados primitivos.

Os testes foram realizados com o Jest, testing-library/react-native e axios-mock-adapter. O Jest é a biblioteca mais consistentemente utilizada, sendo inclusive padrão no React, a testing-library/react-native por melhorar a usabilidade dos testes de renderização e o axios-mock-adapter por ser a forma mais ágil de simular requisições.

Além disso, optei por usar TypeScript no projeto para aumentar a qualidade do código e garantir maior precisão nos testes.

Utilizei a biblioteca UUID, por ser a mais consistente atualmente e referenciada na maioria dos casos.
