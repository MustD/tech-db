import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Stack, TextField, Typography} from "@mui/material";
import {
  GetTechTagByIdDocument,
  useDeleteGroup2TagByIdsMutation,
  useDeleteTechTagByIdMutation,
  useGetTechTagByIdQuery,
  useInsertGroup2TagMutation,
  useUpdateTechTagByIdMutation
} from "../../generated/graphql/generated";
import {entity2relative, toggleRelation} from "../utils/many2many";
import {TechTagEditGroups} from "./components";
import {ApolloErrorMessage, EditButtonGroup} from "../components";

export const TechTagEdit = () => {
  const {techTagId} = useParams<{ techTagId: string }>()
  const id = Number(techTagId) || 0

  const [name, setName] = useState("")
  const [selectedGroups, setSelectedGroups] = useState<entity2relative[]>([])

  const toggleSelectedGroup = (groupId: number) => toggleRelation(groupId, selectedGroups, setSelectedGroups)

  const {data: oldData} = useGetTechTagByIdQuery({
    variables: {id: id}
  })

  useEffect(() => {
    if (oldData?.tech_tag_by_pk) {
      setName(oldData.tech_tag_by_pk.name)
      setSelectedGroups(oldData.tech_tag_by_pk.tag2groups.map(item => (
        {
          pairId: item.id,
          status: "selected",
          relativeId: item.tag_group.id
        }
      )))
    }
  }, [oldData?.tech_tag_by_pk])

  const [saveTechTag, {error: saveError, data: saveData}] = useUpdateTechTagByIdMutation({
    variables: {id: id, techTag: {name: name}},
    refetchQueries: [GetTechTagByIdDocument]
  })

  const [deleteTechTag, {error: deleteError, data: deleteData}] = useDeleteTechTagByIdMutation({
    variables: {id: id},
  })

  const [deleteGroupRelations, {error: errorDeleteGroups}] = useDeleteGroup2TagByIdsMutation({
    variables: {
      _in: selectedGroups.filter(item => "unselected" === item.status).map((item) => item.pairId)
    }
  })

  const [insertGroupRelations, {error: errorInsertGroups}] = useInsertGroup2TagMutation({
    variables: {
      objects: selectedGroups.filter(item => "new" === item.status).map((item) => ({
        tag_group_id: item.relativeId,
        tech_tag_id: id
      }))
    }
  })

  useEffect(() => {
    if (selectedGroups.findIndex(tag => tag.status === "new") >= 0) {
      insertGroupRelations()
    }
    if (selectedGroups.findIndex(tag => tag.status === "unselected") >= 0) {
      deleteGroupRelations()
    }
  }, [saveData?.update_tech_tag_by_pk])

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}>
      <Typography>Update tech tag</Typography>

      <TextField value={name} onChange={(event) => setName(event.target.value)}></TextField>
      <TechTagEditGroups
        selectedGroups={selectedGroups}
        toggleSelectedGroup={(groupId) => toggleSelectedGroup(groupId)}
      />

      <ApolloErrorMessage errors={[saveError, deleteError, errorInsertGroups, errorDeleteGroups]}/>
      <EditButtonGroup
        saved={Boolean(saveData)}
        deleted={Boolean(deleteData)}
        onSave={() => saveTechTag()}
        onDelete={() => deleteTechTag()}
      />
    </Stack>
  )
}
