export const getQueryParamsMeta = () => {
    return {
        DEFAULT_QUERY_PARAMS: import.meta.env.DEFAULT_QUERY_PARAMS,
        QUERY_PARAM_VALUE_MAPPER_SET: import.meta.env.QUERY_PARAM_VALUE_MAPPER_SET,
        QUERY_PARAM_VALUE_MAPPER_GET: import.meta.env.QUERY_PARAM_VALUE_MAPPER_GET,
    };
};
