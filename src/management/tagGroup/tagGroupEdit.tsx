import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Stack, TextField, Typography} from "@mui/material";
import {
  useDeleteTagGroupByIdMutation,
  useGetTagGroupByIdQuery,
  useUpdateTagGroupByIdMutation
} from "../../generated/graphql/generated";
import {ApolloErrorMessage} from "../components";

export const TagGroupEdit = () => {
  const navigate = useNavigate()
  const {tagGroupId} = useParams<{ tagGroupId: string }>()
  const id = Number(tagGroupId) || 0
  const [name, setName] = useState("")

  const {data: oldData} = useGetTagGroupByIdQuery({
    variables: {id: id}
  })

  useEffect(() => {
    if (oldData?.tag_group_by_pk !== undefined && oldData?.tag_group_by_pk !== null) {
      setName(oldData.tag_group_by_pk.name)
    }
  }, [oldData?.tag_group_by_pk])

  const [saveTagGroup, {error: errorSave, data: saveData}] = useUpdateTagGroupByIdMutation({
    variables: {id: id, tagGroup: {name: name}},
  })

  const [deleteTagGroup, {error: errorDelete, data: deleteData}] = useDeleteTagGroupByIdMutation({
    variables: {id: id},
  })

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}>
      <Typography>Update tag group</Typography>
      <TextField value={name} onChange={(event) => setName(event.target.value)}></TextField>
      <ApolloErrorMessage errors={[errorSave, errorDelete]}/>
      <Stack direction="row" alignItems="center" spacing={1}>
        {deleteData?.delete_tag_group_by_pk ?
          <Button onClick={() => navigate(-1)}>deleted, go back</Button> :
          <Button disabled={!!saveData?.update_tag_group_by_pk} color={"warning"}
                  onClick={() => deleteTagGroup()}>delete</Button>
        }
        {saveData?.update_tag_group_by_pk ?
          <Button onClick={() => navigate(-1)}>Saved, go back</Button> :
          <Button disabled={!!deleteData?.delete_tag_group_by_pk} onClick={() => saveTagGroup()}>save</Button>
        }
      </Stack>
    </Stack>
  )
}
