import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useGetTechTypeListQuery} from "../../../generated/graphql/generated";

export const TechEditType = (
  {
    typeId,
    setTypeId
  }:
    {
      typeId: string,
      setTypeId: (typeId: string) => void
    }
) => {

  const {data: techTypes} = useGetTechTypeListQuery()

  return (
    <FormControl sx={{minWidth: 230}} size={"small"}>
      <InputLabel id="tech-type-select-label">Type</InputLabel>
      <Select
        labelId="tech-type-select-label"
        value={typeId}
        label="Type"
        onChange={(event) => setTypeId(event.target.value as string)}
      >
        {techTypes && techTypes.tech_db_tech_type.map((techType) =>
          <MenuItem key={techType.id} value={techType.id}>{techType.name}</MenuItem>
        )}
      </Select>
    </FormControl>
  )
}
