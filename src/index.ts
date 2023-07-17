import {
  LocationQueryRaw,
  type NavigationFailure,
  type RouteLocationNormalizedLoaded,
  type Router,
  useRoute,
  useRouter,
} from "vue-router"
import { type WritableComputedRef, computed } from "vue"

type QueryParamValue = string | number | boolean | Array<string | number | boolean>
type DefaultQueryParams = Record<string, () => any>


const DEFAULT_QUERY_PARAMS:  DefaultQueryParams = import.meta.env.DEFAULT_QUERY_PARAMS as Record<string, () => any>

const QUERY_PARAM_VALUE_MAPPER_SET: {
  [key: string]: (rawValue: any) => any
} = import.meta.env.QUERY_PARAM_VALUE_MAPPER_SET as Record<string, (rawValue: any) => any>


const QUERY_PARAM_VALUE_MAPPER_GET: {
  [key: string]: (rawValue: any) => any
} = import.meta.env.QUERY_PARAM_VALUE_MAPPER_GET as Record<string, (rawValue: any) => any>


for (const [key, value] of Object.entries({DEFAULT_QUERY_PARAMS, QUERY_PARAM_VALUE_MAPPER_SET})) {
  if (!value) {
    throw new Error(`${key} not defined`)
  }
}

function updateQueryParams(
  router: Router,
  route: RouteLocationNormalizedLoaded,
  newQueryParams: Record<string, QueryParamValue>,
): Promise<NavigationFailure | void | undefined> {
  const keys = Object.keys(newQueryParams)
  keys.forEach((queryParam) => {
    const newQueryParamValue = newQueryParams[queryParam]
    newQueryParams[queryParam] =
      newQueryParamValue !== undefined &&
      QUERY_PARAM_VALUE_MAPPER_SET[queryParam]
        ? QUERY_PARAM_VALUE_MAPPER_SET[queryParam]!(newQueryParamValue)
        : newQueryParamValue
  })
  return router.replace({
    query: { ...route.query, ...newQueryParams } as LocationQueryRaw,
  })
}
export function useUpdateQueryParams(): (
  newQueryParams: Record<string, any>
) => Promise<NavigationFailure | void | undefined> {
  const router = useRouter()
  const route = useRoute()
  return (newQueryParams: Record<string, any>) =>
    updateQueryParams(router, route, newQueryParams)
}

export function getDefaultQueryParamValue<T>(
  router: RouteLocationNormalizedLoaded,
  queryParam: string
): T {
  if (DEFAULT_QUERY_PARAMS[queryParam] === undefined) {
    throw new Error(`Unknown queryParam: ${queryParam}`)
  }
  return DEFAULT_QUERY_PARAMS[queryParam]()
}

function mapQueryParamValue(queryParam: string, value: any) {
  return QUERY_PARAM_VALUE_MAPPER_GET[queryParam]
    ? QUERY_PARAM_VALUE_MAPPER_GET[queryParam]!(value)
    : value
}

export function useQueryParam<T extends QueryParamValue>(
  queryParam: string,
  callbackOnSet?: () => void
): WritableComputedRef<T> {
  const route = useRoute()
  const router = useRouter()
  const getQueryParam = (): T => {
    return <T>(
      (route.query && route.query[queryParam] !== undefined
        ? mapQueryParamValue(queryParam, route.query[queryParam])
        : getDefaultQueryParamValue(route, queryParam))
    )
  }

  return computed({
    get() {
      return getQueryParam()
    },
    async set(newValue: T) {
      await updateQueryParams(router, route, { [queryParam]: newValue })
      callbackOnSet?.()
    },
  })
}
