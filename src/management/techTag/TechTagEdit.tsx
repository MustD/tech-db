import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Chip, Stack, TextField, Typography} from "@mui/material";
import {
  GetTechTagListDocument, useDeleteTech2TagByIdMutation,
  useDeleteTechTagByIdMutation,
  useGetTagGroupListQuery,
  useGetTechTagByIdQuery, useInsertTech2TagMutation,
  useUpdateTechTagByIdMutation
} from "../../generated/graphql/generated";
import {addNewGroup, tech2group, toggleExistedGroup} from "./techTagService";

export const TechTagEdit = () => {
  const navigate = useNavigate()
  const {techTagId} = useParams<{ techTagId: string }>()
  const id = Number(techTagId) || 0

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

  const {data: oldData} = useGetTechTagByIdQuery({
    variables: {id: id}
  })
  const {data: groupList} = useGetTagGroupListQuery()
  const allGroups = groupList?.tag_group.map((group) => ({id: group.id, name: group.name})) || []

  useEffect(() => {
    if (oldData?.tech_tag_by_pk) {
      setName(oldData.tech_tag_by_pk.name)
      setSelectedGroups(oldData.tech_tag_by_pk.tag2groups.map(item => (
        {
          relationId: item.id,
          status: "selected",
          groupId: item.tag_group.id
        }
      )))
    }
  }, [oldData?.tech_tag_by_pk])

  const [saveTechTag, {error: saveError, data: saveData}] = useUpdateTechTagByIdMutation({
    variables: {id: id, techTag: {name: name}},
    refetchQueries: [GetTechTagListDocument]
  })

  const [deleteTechTag, {error: deleteError, data: deleteData}] = useDeleteTechTagByIdMutation({
    variables: {id: id},
    refetchQueries: [GetTechTagListDocument]
  })

  const [deleteUnusedGroupRelations] = useDeleteTech2TagByIdMutation({
    variables: {
      _in: selectedGroups.filter(item => "unselected" === item.status).map((item) => item.relationId)
    },
  })

  const [createNewGroupRelations] = useInsertTech2TagMutation({
    variables: {
      objects: selectedGroups.filter(item => "new" === item.status).map((item) => ({
        tag_group_id: item.groupId,
        tech_tag_id: id
      }))
    },
  })

  const performSaveTechTag = () => {
    saveTechTag()
    if (selectedGroups.findIndex(item => "new" === item.status) >= 0) {
      createNewGroupRelations()
    }
    if (selectedGroups.findIndex(item => "unselected" === item.status) >= 0) {
      deleteUnusedGroupRelations()
    }
  }

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}>
      <Typography>Update tech tag</Typography>

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

      {saveError ? <Typography variant={"caption"}> Saving error: {saveError.message} </Typography> : null}
      {deleteError ? <Typography variant={"caption"}> Deleting error: {deleteError.message} </Typography> : null}

      <Stack direction="row" alignItems="center" spacing={1}>
        {deleteData?.delete_tech_tag_by_pk ?
          <Button onClick={() => navigate(-1)}>deleted, go back</Button> :
          <Button disabled={!!saveData?.update_tech_tag_by_pk} color={"warning"}
                  onClick={() => deleteTechTag()}>delete</Button>
        }
        {saveData?.update_tech_tag_by_pk ?
          <Button onClick={() => navigate(-1)}>Saved, go back</Button> :
          <Button disabled={!!deleteData?.delete_tech_tag_by_pk} onClick={() => performSaveTechTag()}>save</Button>
        }
      </Stack>

    </Stack>
  )
}
