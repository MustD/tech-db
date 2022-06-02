import {gql} from "@apollo/client";

export type TechType = {
  id: number,
  name: string
}

export type TechTypeInventoryData = {
  tech_type: TechType[]
}

export const GET_TECH_LIST = gql`
query fetchTechType {
  tech_type {
    id
    name
  }
}
`
