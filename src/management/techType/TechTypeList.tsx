import {useQuery} from "@apollo/client";
import {GET_TECH_LIST, TechType, TechTypeInventoryData} from "./api";

const TechTypeList = () => {
  const {loading, data} = useQuery<TechTypeInventoryData, TechType>(GET_TECH_LIST)

  return (
    <div>
      <div>Hello work</div>
      {data && data.tech_type.map((item) =>
        <div key={item.id}>{item.name}</div>
      )}
    </div>
  )
}

export default TechTypeList
