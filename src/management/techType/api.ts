import {ApolloCache, FetchResult, gql, QueryResult} from "@apollo/client";

export type TechType = {
  id: number,
  name: string
}

export type TechTypeData = {
  name: string
}

export type TechTypeInventoryData = {
  tech_type: TechType[]
}

export const GET_TECH_TYPE_LIST = gql`
query fetchTechType {
  tech_type (order_by: {id: asc}) {
    id
    name
  }
}
`

export const GET_TECH_BY_ID = gql`
query getTechTypeById ($id: bigint!) {
  tech_type_by_pk(id: $id) {
    id
    name
  }
}
`

export const SAVE_TECH_TYPE = gql`
  mutation saveTechType ($techType: tech_type_insert_input!) {
    insert_tech_type_one(object: $techType) {
      id
      name
    }
  }
`

// Saved as example
export const updateTechListCache = (
  cache: ApolloCache<TechTypeInventoryData>,
  {data}: Omit<FetchResult<{ insert_tech_type_one: TechType }>, "context">
) => {
  if (data === null || data === undefined) return;
  const listData = cache.readQuery<TechTypeInventoryData>({query: GET_TECH_TYPE_LIST})
  if (listData === null) return;
  const newData: TechTypeInventoryData = {tech_type: [...listData.tech_type, data.insert_tech_type_one]}
  cache.writeQuery<TechTypeInventoryData>({query: GET_TECH_TYPE_LIST, data: newData})
}

export const UPDATE_TECH_TYPE = gql`
  mutation updateTechType ($id: tech_type_pk_columns_input!, $techTypeData: tech_type_set_input!) {
    update_tech_type_by_pk(pk_columns: $id, _set: $techTypeData) {
      id
      name
    }
  }
`
