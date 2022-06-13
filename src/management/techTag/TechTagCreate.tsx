import {Button, Chip, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
  GetTechTagListDocument,
  useGetTagGroupListQuery, useInsertGroup2TagMutation,
  useSaveTechTagMutation
} from "../../generated/graphql/generated";
import {addNewGroup, tech2group, toggleExistedGroup} from "./techTagService";

export const TechTagCreate = () => {
  const navigate = useNavigate()
  const [id, setId] = useState(0)
  const [name, setName] = useState("")
  const [selectedGroups, setSelectedGroups] = useState<tech2group[]>([])

  const toggleGroup = (groupId: number) => {
    const index = selectedGroups.findIndex((item) => item.groupId === groupId)
    if (index === -1) {
      setSelectedGroups((currentGroups) => addNewGroup(currentGroups, groupId))
    } else {
      setSelectedGroups((currentGroups) => toggleExistedGroup(currentGroups, index))
    }
  }

  const {data: groupList} = useGetTagGroupListQuery()
  const allGroups = groupList?.tag_group.map((group) => ({id: group.id, name: group.name})) || []

  const [createNewGroupRelations, {error: errorGroups, data: dataGroups}] = useInsertGroup2TagMutation({
    variables: {
      objects: selectedGroups.filter(item => "new" === item.status).map((item) => ({
        tag_group_id: item.groupId,
        tech_tag_id: id
      }))
    },
    refetchQueries: [GetTechTagListDocument]
  })

  const [saveTechTag, {error: errorSaved, data: dataSaved}] = useSaveTechTagMutation({
    variables: {techTag: {name: name}},
    refetchQueries: [GetTechTagListDocument]
  })

  useEffect(() => {
    if (dataSaved?.insert_tech_tag_one?.id) {
      setId(dataSaved?.insert_tech_tag_one?.id)
    }
  }, [dataSaved])
  useEffect(() => {
    if (id > 0) {
      if (selectedGroups.findIndex(item => "new" === item.status) >= 0) {
        createNewGroupRelations()
      }
    }
  }, [id])

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}>
      <Typography>Create new tech tag</Typography>
      <TextField value={name} onChange={(event) => setName(event.target.value)}></TextField>
      <Stack direction="row" alignItems="center" spacing={1}>
        {allGroups.map(group => (
          <Chip
            key={group.id}
            label={group.name}
            onClick={() => toggleGroup(group.id)}
            color={selectedGroups.findIndex((item) =>
              item.groupId === group.id &&
              item.status !== "unselected"
            ) >= 0 ? "primary" : "default"
            }
          />
        ))}
      </Stack>
      {errorSaved ? <Typography variant={"caption"}> {errorSaved.message} </Typography> : null}
      {errorGroups ? <Typography variant={"caption"}> {errorGroups.message} </Typography> : null}
      {dataSaved && dataSaved.insert_tech_tag_one ?
        <Button onClick={() => navigate(-1)}>Saved, go back</Button> :
        <Button onClick={() => saveTechTag()}>save</Button>
      }
    </Stack>
  )
}
