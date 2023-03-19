import {Chip, Stack} from "@mui/material";
import {useGetTagGroupListQuery} from "../../../generated/graphql/generated";
import {entity2relative} from "../../utils/many2many";

export const TechTagEditGroups = (
  {
    selectedGroups,
    toggleSelectedGroup
  }: {
    selectedGroups: entity2relative[],
    toggleSelectedGroup: (id: string) => void
  }
) => {

  const {data: groupList} = useGetTagGroupListQuery()
  const allGroups = groupList?.tech_db_tag_group.map((group) => ({id: group.id, name: group.name})) || []

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {allGroups.map(group => (
        <Chip
          key={group.id}
          label={group.name}
          onClick={() => toggleSelectedGroup(group.id)}
          color={selectedGroups.findIndex((item) =>
            item.relativeId === group.id &&
            item.status !== "unselected"
          ) >= 0 ? "primary" : "default"
          }
        />
      ))}
    </Stack>
  )
}
