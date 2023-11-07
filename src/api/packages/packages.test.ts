import { AllPackagesKeys, LocationPoint } from "../models";
import { getAllPackages, getPackage, newPoint } from "./"; // Importe suas funções do arquivo real

// Importe as bibliotecas necessárias para simulação
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Testes das funções de API", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it("getAllPackages deve retornar os dados corretos", async () => {
    const mockData: AllPackagesKeys = { keys: ["package1", "package2"] };
    mock.onGet("/points").reply(200, mockData);

    const result = await getAllPackages();
    console.log("aaaaaaaaaaaa", result);
    expect(result).toEqual(mockData);
  });

  it("getAllPackages deve tratar erros corretamente", async () => {
    mock.onGet("/points").reply(500, "Erro interno do servidor");

    try {
      await getAllPackages();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        "getAllPackages error: Erro interno do servidor"
      );
    }
  });

  it("getPackage deve retornar os dados corretos", async () => {
    const id = "package1"; // ID de exemplo
    const mockData: LocationPoint = {
      id: id,
      latitude: 123.456,
      longitude: 789.012,
      speed: 50,
      time: new Date(),
    };
    mock.onGet(`/points/${id}`).reply(200, mockData);

    const result = await getPackage(id);
    expect(result).toEqual(mockData);
  });

  it("getPackage deve tratar erros corretamente", async () => {
    const id = "package1"; // ID de exemplo
    mock.onGet(`/points/${id}`).reply(404, "Pacote não encontrado");

    try {
      await getPackage(id);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("getPackage error: Pacote não encontrado");
    }
  });

  it("newPoint deve chamar a API corretamente", async () => {
    const locationPoint: LocationPoint = {
      id: "package3",
      latitude: 111.111,
      longitude: 222.222,
      speed: 30,
      time: new Date(),
    };

    mock.onPost(`/points/${locationPoint.id}`).reply(200);

    await newPoint(locationPoint);

    // Você pode adicionar mais asserções aqui para garantir que os dados foram enviados corretamente.
  });

  it("newPoint deve tratar erros corretamente", async () => {
    const locationPoint: LocationPoint = {
      id: "package4",
      latitude: 222.222,
      longitude: 333.333,
      speed: 40,
      time: new Date(),
    };

    mock
      .onPost(`/points/${locationPoint.id}`)
      .reply(500, "Erro interno do servidor");

    try {
      await newPoint(locationPoint);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("newPoint error: Erro interno do servidor");
    }
  });
});
