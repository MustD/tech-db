import {useGetTechTagListQuery} from "../../../generated/graphql/generated";
import {Chip, Stack} from "@mui/material";
import {entity2relative} from "../../utils/many2many";

export const TechEditTags = (
  {
    toggleSelectedTag,
    selectedTags
  }: {
    selectedTags: entity2relative[]
    toggleSelectedTag: (tagId: number) => void
  }
) => {
  const {data: tags} = useGetTechTagListQuery()
  const allTags = tags?.tech_tag.map((tag) => ({id: tag.id, name: tag.name})) || []

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {allTags.map(tag => (
        <Chip
          key={tag.id}
          label={tag.name}
          onClick={() => toggleSelectedTag(tag.id)}
          color={selectedTags.findIndex((item) =>
            item.relativeId === tag.id &&
            item.status !== "unselected"
          ) >= 0 ? "primary" : "default"
          }
        />
      ))}
    </Stack>
  )
}
