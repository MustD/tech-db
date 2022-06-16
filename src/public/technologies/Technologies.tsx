import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  FormControl,
  InputLabel, LinearProgress, MenuItem,
  Select,
  Stack,
  Typography
} from "@mui/material";
import {useGetAllUsedTagsQuery, useGetTechWithSubListQuery} from "../../generated/graphql/generated";
import {extractTechInfo, getFilter} from "./service";
import {useEffect, useState} from "react";

export const Technologies = () => {
  const [tagFilter, setTagFilter] = useState("")

  const {data, loading, refetch} = useGetTechWithSubListQuery({
    variables: {where: getFilter([tagFilter])},
    fetchPolicy: "no-cache"
  })

  const {data: usedTagsData} = useGetAllUsedTagsQuery()
  const usedTags = usedTagsData?.tech_tag || []

  useEffect(() => {
    refetch({where: getFilter([tagFilter])})
  }, [tagFilter])

  if (!data || loading) {
    return (
      <Box sx={{width: '100%'}}>
        <LinearProgress/>
      </Box>
    )
  }
  const {tech, groups, tags, structure} = extractTechInfo(data)

  const getTech = (id: string) => {
    const emptyTech = {techId: "", techName: "", techType: "", techLink: "",}
    return tech.get(id, emptyTech)
  }

  const getGroup = (id: string) => {
    const emptyGroup = {groupId: "", groupName: ""}
    return groups.get(id, emptyGroup)
  }

  const getTag = (id: string) => {
    const emptyTag = {tagId: "", tagName: ""}
    return tags.get(id, emptyTag)
  }

  return (
    <Stack spacing={2} direction={"column"}>
      <Stack spacing={1} direction={"row"}>
        <FormControl fullWidth>
          <InputLabel id="tag-filter-select-label">Tag</InputLabel>
          <Select
            labelId="tag-filter-select-label"
            id="tag-filter-select"
            value={tagFilter}
            label="Tag"
            onChange={(event) => setTagFilter(event.target.value as string)}
          >
            <MenuItem value={""}>Empty</MenuItem>
            {usedTags.map((tag) =>
              <MenuItem key={tag.id} value={tag.id}>{tag.name}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Stack>
      <Stack spacing={1} direction={"row"}>
        {structure.entrySeq().map(([techId, groups]) =>
          <Card key={techId} sx={{minWidth: 300}}>
            <CardContent>
              <Typography variant={"h4"}>{getTech(techId).techName}</Typography>
              <Typography variant={"overline"}>{getTech(techId).techType}</Typography>
              <Stack direction={"column"} spacing={1}>
                {groups.entrySeq().map(([groupId, tags]) =>
                  <Stack key={groupId} direction={"row"} spacing={1}>
                    <Typography>{getGroup(groupId).groupName}</Typography>
                    {tags.toList().map(tagId => <Chip key={tagId} label={getTag(tagId).tagName} size={"small"}/>)}
                  </Stack>
                )}
              </Stack>
            </CardContent>
            <CardActions>
              <Button href={getTech(techId).techLink} target={"_blank"}>Learn More</Button>
            </CardActions>
          </Card>
        )}
      </Stack>
    </Stack>
  )
}
