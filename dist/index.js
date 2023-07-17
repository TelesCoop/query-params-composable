import { useRoute, useRouter, } from "vue-router";
import { computed } from "vue";
const DEFAULT_QUERY_PARAMS = import.meta.env.DEFAULT_QUERY_PARAMS;
const QUERY_PARAM_VALUE_MAPPER_SET = import.meta.env.QUERY_PARAM_VALUE_MAPPER_SET;
const QUERY_PARAM_VALUE_MAPPER_GET = import.meta.env.QUERY_PARAM_VALUE_MAPPER_GET;
for (const [key, value] of Object.entries({ DEFAULT_QUERY_PARAMS, QUERY_PARAM_VALUE_MAPPER_SET })) {
    if (!value) {
        throw new Error(`${key} not defined`);
    }
}
function updateQueryParams(router, route, newQueryParams) {
    const keys = Object.keys(newQueryParams);
    keys.forEach((queryParam) => {
        const newQueryParamValue = newQueryParams[queryParam];
        newQueryParams[queryParam] =
            newQueryParamValue !== undefined &&
                QUERY_PARAM_VALUE_MAPPER_SET[queryParam]
                ? QUERY_PARAM_VALUE_MAPPER_SET[queryParam](newQueryParamValue)
                : newQueryParamValue;
    });
    return router.replace({
        query: { ...route.query, ...newQueryParams },
    });
}
export function useUpdateQueryParams() {
    const router = useRouter();
    const route = useRoute();
    return (newQueryParams) => updateQueryParams(router, route, newQueryParams);
}
export function getDefaultQueryParamValue(router, queryParam) {
    if (DEFAULT_QUERY_PARAMS[queryParam] === undefined) {
        throw new Error(`Unknown queryParam: ${queryParam}`);
    }
    return DEFAULT_QUERY_PARAMS[queryParam]();
}
function mapQueryParamValue(queryParam, value) {
    return QUERY_PARAM_VALUE_MAPPER_GET[queryParam]
        ? QUERY_PARAM_VALUE_MAPPER_GET[queryParam](value)
        : value;
}
export function useQueryParam(queryParam, callbackOnSet) {
    const route = useRoute();
    const router = useRouter();
    const getQueryParam = () => {
        return ((route.query && route.query[queryParam] !== undefined
            ? mapQueryParamValue(queryParam, route.query[queryParam])
            : getDefaultQueryParamValue(route, queryParam)));
    };
    return computed({
        get() {
            return getQueryParam();
        },
        async set(newValue) {
            await updateQueryParams(router, route, { [queryParam]: newValue });
            callbackOnSet?.();
        },
    });
}
