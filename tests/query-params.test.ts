import { useQueryParam, useUpdateQueryParams } from "../src";

// Mock meta edit in vite.config.js
jest.mock("../src/meta", () => ({
  getQueryParamsMeta: jest.fn(() => {
    return {
      DEFAULT_QUERY_PARAMS: {
        name: () => "default",
      },
      QUERY_PARAM_VALUE_MAPPER_SET: {},
      QUERY_PARAM_VALUE_MAPPER_GET: {},
    };
  }),
}));
jest.mock("vue-router");

import { useRoute, useRouter } from "vue-router";

describe("Query Params lib", () => {
  it("should allow to get default query param 'name'", () => {
    // @ts-ignore
    useRoute.mockReturnValue({ query: {} });
    const queryParam = useQueryParam("name");
    expect(queryParam.value).toEqual("default");
  });

  it("should allow to get query param 'name'", () => {
    // @ts-ignore
    useRoute.mockReturnValue({ query: { name: "test" } });
    const queryParam = useQueryParam("name");
    expect(queryParam.value).toEqual("test");
  });

  it("should allow to set query param 'name'", () => {
    // @ts-ignore
    let testedValue;
    // @ts-ignore
    useRoute.mockReturnValue({ query: { lol: 1 } });
    // @ts-ignore
    useRouter.mockReturnValue({
      replace: jest.fn((x) => (testedValue = x)),
    });
    const newValue = "test";
    const queryParam = useQueryParam("name");
    queryParam.value = newValue;
    expect(testedValue).toEqual({ query: { name: newValue, lol: 1 } });
  });

  it("should allow to set multiple query params", () => {
    // @ts-ignore
    let testedValue;
    // @ts-ignore
    useRoute.mockReturnValue({ query: { lol: 1 } });
    // @ts-ignore
    useRouter.mockReturnValue({
      replace: jest.fn((x) => (testedValue = x)),
    });
    const newValue = "test";
    const updateQueryParams = useUpdateQueryParams();
    updateQueryParams({ name: newValue, lol: undefined });
    expect(testedValue).toEqual({ query: { name: newValue } });
  });
});
