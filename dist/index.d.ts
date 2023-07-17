import { type NavigationFailure, type RouteLocationNormalizedLoaded } from "vue-router";
import { type WritableComputedRef } from "vue";
type QueryParamValue = string | number | boolean | Array<string | number | boolean>;
export declare function useUpdateQueryParams(): (newQueryParams: Record<string, any>) => Promise<NavigationFailure | void | undefined>;
export declare function getDefaultQueryParamValue<T>(router: RouteLocationNormalizedLoaded, queryParam: string): T;
export declare function useQueryParam<T extends QueryParamValue>(queryParam: string, callbackOnSet?: () => void): WritableComputedRef<T>;
export {};
