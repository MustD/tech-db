import {Button, Card, CardActions, CardContent, Chip, Stack, Typography} from "@mui/material";
import {useGetTechWithSubListQuery} from "../../generated/graphql/generated";
import {extractTechInfo} from "./service";

export const Technologies = () => {
  const {data, loading} = useGetTechWithSubListQuery({fetchPolicy: "no-cache"})

  if (!data || loading) {
    return (<div>loading</div>)
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
    <Stack spacing={1} direction={"row"}>
      {structure.entrySeq().map(([techId, groups]) =>
        <Card key={techId} sx={{ minWidth: 300 }}>
          <CardContent>
            <Typography variant={"h4"}>{getTech(techId).techName}</Typography>
            <Typography variant={"overline"}>{getTech(techId).techType}</Typography>
            <Stack  direction={"column"} spacing={1}>
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
  )
}
