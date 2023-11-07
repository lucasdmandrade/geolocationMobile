import MockAdapter from "axios-mock-adapter";
import { getAllPackages, getPackage, newPoint } from "./"; // Importe suas funções do arquivo real
import { LocationPoint } from "../models";
import axios from "../../services/axios";
import { AxiosError } from "axios";

describe("Testes das funções de API", () => {
  let mock: MockAdapter;

  const mockedKeysData = { keys: ["package1", "package2"] };

  const locationPoint = {
    id: "1548",
    latitude: 111.111,
    longitude: 222.222,
    speed: 30,
    time: new Date(),
  };

  const locationPointResponse = {
    id: "1548",
    latitude: 111.111,
    longitude: 222.222,
    speed: 30,
    time: locationPoint.time.toISOString(),
  };

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it("getAllPackages deve retornar os dados corretos", async () => {
    mock.onGet("/points").reply(200, mockedKeysData);

    const result = await getAllPackages();

    expect(result).toEqual(mockedKeysData);
  });

  it("getAllPackages deve tratar erros corretamente", async () => {
    mock.onGet("/points").reply(500, "Erro interno do servidor");

    try {
      await getAllPackages();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      //@ts-ignore
      expect(error.message).toBe(
        "getAllPackages error: Request failed with status code 500"
      );
    }
  });

  it("getPackage deve tratar erros corretamente", async () => {
    mock
      .onGet(`/points/${locationPoint.id}`)
      .reply(404, "Pacote não encontrado");

    try {
      await getPackage(locationPoint.id);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      //@ts-ignore
      expect(error.message).toBe(
        "getPackage error: Request failed with status code 404"
      );
    }
  });

  it("newPoint deve chamar a API corretamente", async () => {
    mock.onPost(`/points/${locationPoint.id}`).reply(200);

    await newPoint(locationPoint);
  });

  it("newPoint deve tratar erros corretamente", async () => {
    mock
      .onPost(`/points/${locationPoint.id}`)
      .reply(500, "Erro interno do servidor");

    try {
      await newPoint(locationPoint);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      //@ts-ignore
      expect(error.message).toBe("newPoint error: Erro interno do servidor");
    }
  });
});
