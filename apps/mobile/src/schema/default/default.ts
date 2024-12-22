/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * crypto alert
 * OpenAPI spec version: 1.0.0
 */
import {
  useInfiniteQuery,
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseInfiniteQueryResult,
  DefinedUseQueryResult,
  InfiniteData,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type {
  GetAlerts200,
  GetAlerts404,
  GetAlertsParams,
  GetCryptos200,
  GetCryptos404,
  GetCryptosParams,
  GetUserMe404,
  PostAlert200,
  PostAlertBody,
  PostAuthLogin200,
  PostAuthLogin400,
  PostAuthLoginBody,
  PostAuthLogout200,
  PostAuthRegister200,
  PostAuthRegister400,
  PostAuthRegisterBody,
  User
} from '.././model'



export type postAuthRegisterResponse = {
  data: PostAuthRegister200;
  status: number;
  headers: Headers;
}

export const getPostAuthRegisterUrl = () => {


  return `http://localhost:4003/auth/register`
}

export const postAuthRegister = async (postAuthRegisterBody: PostAuthRegisterBody, options?: RequestInit): Promise<postAuthRegisterResponse> => {
  
  const res = await fetch(getPostAuthRegisterUrl(),
  {      
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      postAuthRegisterBody,)
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}




export const getPostAuthRegisterMutationOptions = <TError = PostAuthRegister400,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postAuthRegister>>, TError,{data: PostAuthRegisterBody}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof postAuthRegister>>, TError,{data: PostAuthRegisterBody}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postAuthRegister>>, {data: PostAuthRegisterBody}> = (props) => {
          const {data} = props ?? {};

          return  postAuthRegister(data,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostAuthRegisterMutationResult = NonNullable<Awaited<ReturnType<typeof postAuthRegister>>>
    export type PostAuthRegisterMutationBody = PostAuthRegisterBody
    export type PostAuthRegisterMutationError = PostAuthRegister400

    export const usePostAuthRegister = <TError = PostAuthRegister400,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postAuthRegister>>, TError,{data: PostAuthRegisterBody}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof postAuthRegister>>,
        TError,
        {data: PostAuthRegisterBody},
        TContext
      > => {

      const mutationOptions = getPostAuthRegisterMutationOptions(options);

      return useMutation(mutationOptions);
    }
    export type postAuthLoginResponse = {
  data: PostAuthLogin200;
  status: number;
  headers: Headers;
}

export const getPostAuthLoginUrl = () => {


  return `http://localhost:4003/auth/login`
}

export const postAuthLogin = async (postAuthLoginBody: PostAuthLoginBody, options?: RequestInit): Promise<postAuthLoginResponse> => {
  
  const res = await fetch(getPostAuthLoginUrl(),
  {      
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      postAuthLoginBody,)
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}




export const getPostAuthLoginMutationOptions = <TError = PostAuthLogin400,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postAuthLogin>>, TError,{data: PostAuthLoginBody}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof postAuthLogin>>, TError,{data: PostAuthLoginBody}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postAuthLogin>>, {data: PostAuthLoginBody}> = (props) => {
          const {data} = props ?? {};

          return  postAuthLogin(data,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostAuthLoginMutationResult = NonNullable<Awaited<ReturnType<typeof postAuthLogin>>>
    export type PostAuthLoginMutationBody = PostAuthLoginBody
    export type PostAuthLoginMutationError = PostAuthLogin400

    export const usePostAuthLogin = <TError = PostAuthLogin400,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postAuthLogin>>, TError,{data: PostAuthLoginBody}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof postAuthLogin>>,
        TError,
        {data: PostAuthLoginBody},
        TContext
      > => {

      const mutationOptions = getPostAuthLoginMutationOptions(options);

      return useMutation(mutationOptions);
    }
    export type postAuthLogoutResponse = {
  data: PostAuthLogout200;
  status: number;
  headers: Headers;
}

export const getPostAuthLogoutUrl = () => {


  return `http://localhost:4003/auth/logout`
}

export const postAuthLogout = async ( options?: RequestInit): Promise<postAuthLogoutResponse> => {
  
  const res = await fetch(getPostAuthLogoutUrl(),
  {      
    ...options,
    method: 'POST'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}




export const getPostAuthLogoutMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postAuthLogout>>, TError,void, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof postAuthLogout>>, TError,void, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postAuthLogout>>, void> = () => {
          

          return  postAuthLogout(fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostAuthLogoutMutationResult = NonNullable<Awaited<ReturnType<typeof postAuthLogout>>>
    
    export type PostAuthLogoutMutationError = unknown

    export const usePostAuthLogout = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postAuthLogout>>, TError,void, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof postAuthLogout>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getPostAuthLogoutMutationOptions(options);

      return useMutation(mutationOptions);
    }
    export type postAlertResponse = {
  data: PostAlert200;
  status: number;
  headers: Headers;
}

export const getPostAlertUrl = () => {


  return `http://localhost:4003/alert`
}

export const postAlert = async (postAlertBody: PostAlertBody, options?: RequestInit): Promise<postAlertResponse> => {
  
  const res = await fetch(getPostAlertUrl(),
  {      
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      postAlertBody,)
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}




export const getPostAlertMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postAlert>>, TError,{data: PostAlertBody}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof postAlert>>, TError,{data: PostAlertBody}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postAlert>>, {data: PostAlertBody}> = (props) => {
          const {data} = props ?? {};

          return  postAlert(data,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostAlertMutationResult = NonNullable<Awaited<ReturnType<typeof postAlert>>>
    export type PostAlertMutationBody = PostAlertBody
    export type PostAlertMutationError = unknown

    export const usePostAlert = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postAlert>>, TError,{data: PostAlertBody}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof postAlert>>,
        TError,
        {data: PostAlertBody},
        TContext
      > => {

      const mutationOptions = getPostAlertMutationOptions(options);

      return useMutation(mutationOptions);
    }
    export type getAlertsResponse = {
  data: GetAlerts200;
  status: number;
  headers: Headers;
}

export const getGetAlertsUrl = (params?: GetAlertsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  return normalizedParams.size ? `http://localhost:4003/alerts?${normalizedParams.toString()}` : `http://localhost:4003/alerts`
}

export const getAlerts = async (params?: GetAlertsParams, options?: RequestInit): Promise<getAlertsResponse> => {
  
  const res = await fetch(getGetAlertsUrl(params),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}



export const getGetAlertsQueryKey = (params?: GetAlertsParams,) => {
    return [`http://localhost:4003/alerts`, ...(params ? [params]: [])] as const;
    }

    
export const getGetAlertsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getAlerts>>, GetAlertsParams['page']>, TError = GetAlerts404>(params?: GetAlertsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getAlerts>>, TError, TData, Awaited<ReturnType<typeof getAlerts>>, QueryKey, GetAlertsParams['page']>>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetAlertsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAlerts>>, QueryKey, GetAlertsParams['page']> = ({ signal, pageParam }) => getAlerts({...params, page: pageParam || params?.['page']}, { signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getAlerts>>, TError, TData, Awaited<ReturnType<typeof getAlerts>>, QueryKey, GetAlertsParams['page']> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetAlertsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getAlerts>>>
export type GetAlertsInfiniteQueryError = GetAlerts404


export function useGetAlertsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getAlerts>>, GetAlertsParams['page']>, TError = GetAlerts404>(
 params: undefined |  GetAlertsParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getAlerts>>, TError, TData, Awaited<ReturnType<typeof getAlerts>>, QueryKey, GetAlertsParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAlerts>>,
          TError,
          TData, QueryKey
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAlertsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getAlerts>>, GetAlertsParams['page']>, TError = GetAlerts404>(
 params?: GetAlertsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getAlerts>>, TError, TData, Awaited<ReturnType<typeof getAlerts>>, QueryKey, GetAlertsParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAlerts>>,
          TError,
          TData, QueryKey
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAlertsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getAlerts>>, GetAlertsParams['page']>, TError = GetAlerts404>(
 params?: GetAlertsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getAlerts>>, TError, TData, Awaited<ReturnType<typeof getAlerts>>, QueryKey, GetAlertsParams['page']>>, fetch?: RequestInit}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetAlertsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getAlerts>>, GetAlertsParams['page']>, TError = GetAlerts404>(
 params?: GetAlertsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getAlerts>>, TError, TData, Awaited<ReturnType<typeof getAlerts>>, QueryKey, GetAlertsParams['page']>>, fetch?: RequestInit}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetAlertsInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetAlertsQueryOptions = <TData = Awaited<ReturnType<typeof getAlerts>>, TError = GetAlerts404>(params?: GetAlertsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAlerts>>, TError, TData>>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetAlertsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAlerts>>> = ({ signal }) => getAlerts(params, { signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getAlerts>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetAlertsQueryResult = NonNullable<Awaited<ReturnType<typeof getAlerts>>>
export type GetAlertsQueryError = GetAlerts404


export function useGetAlerts<TData = Awaited<ReturnType<typeof getAlerts>>, TError = GetAlerts404>(
 params: undefined |  GetAlertsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAlerts>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAlerts>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAlerts<TData = Awaited<ReturnType<typeof getAlerts>>, TError = GetAlerts404>(
 params?: GetAlertsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAlerts>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAlerts>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAlerts<TData = Awaited<ReturnType<typeof getAlerts>>, TError = GetAlerts404>(
 params?: GetAlertsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAlerts>>, TError, TData>>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetAlerts<TData = Awaited<ReturnType<typeof getAlerts>>, TError = GetAlerts404>(
 params?: GetAlertsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAlerts>>, TError, TData>>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetAlertsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export type getCryptosResponse = {
  data: GetCryptos200;
  status: number;
  headers: Headers;
}

export const getGetCryptosUrl = (params?: GetCryptosParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  return normalizedParams.size ? `http://localhost:4003/cryptos?${normalizedParams.toString()}` : `http://localhost:4003/cryptos`
}

export const getCryptos = async (params?: GetCryptosParams, options?: RequestInit): Promise<getCryptosResponse> => {
  
  const res = await fetch(getGetCryptosUrl(params),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}



export const getGetCryptosQueryKey = (params?: GetCryptosParams,) => {
    return [`http://localhost:4003/cryptos`, ...(params ? [params]: [])] as const;
    }

    
export const getGetCryptosInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getCryptos>>, GetCryptosParams['page']>, TError = GetCryptos404>(params?: GetCryptosParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getCryptos>>, TError, TData, Awaited<ReturnType<typeof getCryptos>>, QueryKey, GetCryptosParams['page']>>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetCryptosQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getCryptos>>, QueryKey, GetCryptosParams['page']> = ({ signal, pageParam }) => getCryptos({...params, page: pageParam || params?.['page']}, { signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getCryptos>>, TError, TData, Awaited<ReturnType<typeof getCryptos>>, QueryKey, GetCryptosParams['page']> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetCryptosInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getCryptos>>>
export type GetCryptosInfiniteQueryError = GetCryptos404


export function useGetCryptosInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getCryptos>>, GetCryptosParams['page']>, TError = GetCryptos404>(
 params: undefined |  GetCryptosParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getCryptos>>, TError, TData, Awaited<ReturnType<typeof getCryptos>>, QueryKey, GetCryptosParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getCryptos>>,
          TError,
          TData, QueryKey
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetCryptosInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getCryptos>>, GetCryptosParams['page']>, TError = GetCryptos404>(
 params?: GetCryptosParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getCryptos>>, TError, TData, Awaited<ReturnType<typeof getCryptos>>, QueryKey, GetCryptosParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getCryptos>>,
          TError,
          TData, QueryKey
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetCryptosInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getCryptos>>, GetCryptosParams['page']>, TError = GetCryptos404>(
 params?: GetCryptosParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getCryptos>>, TError, TData, Awaited<ReturnType<typeof getCryptos>>, QueryKey, GetCryptosParams['page']>>, fetch?: RequestInit}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetCryptosInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getCryptos>>, GetCryptosParams['page']>, TError = GetCryptos404>(
 params?: GetCryptosParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getCryptos>>, TError, TData, Awaited<ReturnType<typeof getCryptos>>, QueryKey, GetCryptosParams['page']>>, fetch?: RequestInit}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetCryptosInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetCryptosQueryOptions = <TData = Awaited<ReturnType<typeof getCryptos>>, TError = GetCryptos404>(params?: GetCryptosParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getCryptos>>, TError, TData>>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetCryptosQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getCryptos>>> = ({ signal }) => getCryptos(params, { signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getCryptos>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetCryptosQueryResult = NonNullable<Awaited<ReturnType<typeof getCryptos>>>
export type GetCryptosQueryError = GetCryptos404


export function useGetCryptos<TData = Awaited<ReturnType<typeof getCryptos>>, TError = GetCryptos404>(
 params: undefined |  GetCryptosParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getCryptos>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getCryptos>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetCryptos<TData = Awaited<ReturnType<typeof getCryptos>>, TError = GetCryptos404>(
 params?: GetCryptosParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getCryptos>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getCryptos>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetCryptos<TData = Awaited<ReturnType<typeof getCryptos>>, TError = GetCryptos404>(
 params?: GetCryptosParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getCryptos>>, TError, TData>>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetCryptos<TData = Awaited<ReturnType<typeof getCryptos>>, TError = GetCryptos404>(
 params?: GetCryptosParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getCryptos>>, TError, TData>>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetCryptosQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export type getUserMeResponse = {
  data: User;
  status: number;
  headers: Headers;
}

export const getGetUserMeUrl = () => {


  return `http://localhost:4003/user/me`
}

export const getUserMe = async ( options?: RequestInit): Promise<getUserMeResponse> => {
  
  const res = await fetch(getGetUserMeUrl(),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}



export const getGetUserMeQueryKey = () => {
    return [`http://localhost:4003/user/me`] as const;
    }

    
export const getGetUserMeInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getUserMe>>>, TError = GetUserMe404>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserMe>>, TError, TData>>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUserMeQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserMe>>> = ({ signal }) => getUserMe({ signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserMe>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetUserMeInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getUserMe>>>
export type GetUserMeInfiniteQueryError = GetUserMe404


export function useGetUserMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getUserMe>>>, TError = GetUserMe404>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserMe>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUserMe>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getUserMe>>>, TError = GetUserMe404>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserMe>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUserMe>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getUserMe>>>, TError = GetUserMe404>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserMe>>, TError, TData>>, fetch?: RequestInit}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetUserMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getUserMe>>>, TError = GetUserMe404>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserMe>>, TError, TData>>, fetch?: RequestInit}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetUserMeInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetUserMeQueryOptions = <TData = Awaited<ReturnType<typeof getUserMe>>, TError = GetUserMe404>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserMe>>, TError, TData>>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUserMeQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserMe>>> = ({ signal }) => getUserMe({ signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getUserMe>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetUserMeQueryResult = NonNullable<Awaited<ReturnType<typeof getUserMe>>>
export type GetUserMeQueryError = GetUserMe404


export function useGetUserMe<TData = Awaited<ReturnType<typeof getUserMe>>, TError = GetUserMe404>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserMe>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUserMe>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserMe<TData = Awaited<ReturnType<typeof getUserMe>>, TError = GetUserMe404>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserMe>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUserMe>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserMe<TData = Awaited<ReturnType<typeof getUserMe>>, TError = GetUserMe404>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserMe>>, TError, TData>>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetUserMe<TData = Awaited<ReturnType<typeof getUserMe>>, TError = GetUserMe404>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserMe>>, TError, TData>>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetUserMeQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



