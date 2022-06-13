import {Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useInsertGroup2TagMutation, useSaveTechTagMutation} from "../../generated/graphql/generated";
import {entity2relative, toggleRelation} from "../utils/many2many";
import {TechTagEditGroups} from "./components";
import {ApolloErrorMessage, CreateButtonGroup} from "../components";

export const TechTagCreate = () => {
  const [id, setId] = useState(0)
  const [name, setName] = useState("")
  const [selectedGroups, setSelectedGroups] = useState<entity2relative[]>([])

  const toggleSelectedGroup = (groupId: number) => toggleRelation(groupId, selectedGroups, setSelectedGroups)

  const [saveTechTag, {error: errorSaved, data: data}] = useSaveTechTagMutation({
    variables: {techTag: {name: name}},
  })

  const [createNewGroupRelations, {error: errorGroups}] = useInsertGroup2TagMutation({
    variables: {
      objects: selectedGroups.filter(item => "new" === item.status).map((item) => ({
        tag_group_id: item.relativeId,
        tech_tag_id: id
      }))
    },
  })

  useEffect(() => {
    if (data?.insert_tech_tag_one?.id) {
      setId(data?.insert_tech_tag_one?.id)
    }
  }, [data])
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
      <TechTagEditGroups
        selectedGroups={selectedGroups}
        toggleSelectedGroup={(groupId) => toggleSelectedGroup(groupId)}
      />
      <ApolloErrorMessage errors={[errorSaved, errorGroups]}/>
      <CreateButtonGroup saved={Boolean(data)} onSave={() => saveTechTag()}/>
    </Stack>
  )
}
