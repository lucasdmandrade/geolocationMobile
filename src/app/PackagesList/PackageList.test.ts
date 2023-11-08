import MockAdapter from "axios-mock-adapter";
import { render } from "@testing-library/react-native";
import axios from "../../services/axios";
import { getAllPackages } from "../../api/packages";
import PackagesList from ".";
import { mockPoints, pointsKeys } from "../../api/models/mocks";

const component = PackagesList;

describe("Testes das funções de API", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it("getPackage deve retornar os dados corretos", async () => {
    mock.onGet("/points").reply(200, pointsKeys);

    mockPoints.forEach((mockPoint) => {
      mock.onGet(`/points/${mockPoint.points.id}`).reply(200, mockPoint.points);
    });

    const tree = render(component()).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
