import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Stack, TextField, Typography} from "@mui/material";
import {
  GetTechTagListDocument,
  useDeleteTechTagByIdMutation,
  useGetTechTagByIdQuery,
  useUpdateTechTagByIdMutation
} from "../../generated/graphql/generated";

export const TechTagEdit = () => {
  const navigate = useNavigate()
  const {techTagId} = useParams<{ techTagId: string }>()
  const id = Number(techTagId) || 0
  const [name, setName] = useState("")

  const {data: oldData} = useGetTechTagByIdQuery({
    variables: {id: id}
  })

  useEffect(() => {
    if (oldData?.tech_tag_by_pk !== undefined && oldData?.tech_tag_by_pk !== null) {
      setName(oldData.tech_tag_by_pk.name)
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

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}>
      <Typography>Update tech tag</Typography>
      <TextField value={name} onChange={(event) => setName(event.target.value)}></TextField>
      {saveError ? <Typography variant={"caption"}> Saving error: {saveError.message} </Typography> : null}
      {deleteError ? <Typography variant={"caption"}> Deleting error: {deleteError.message} </Typography> : null}
      <Stack direction="row" alignItems="center" spacing={1}>
        {deleteData?.delete_tech_tag_by_pk ?
          <Button onClick={() => navigate(-1)}>deleted, go back</Button> :
          <Button disabled={!!saveData?.update_tech_tag_by_pk} color={"warning"} onClick={() => deleteTechTag()}>delete</Button>
        }
        {saveData?.update_tech_tag_by_pk ?
          <Button onClick={() => navigate(-1)}>Saved, go back</Button> :
          <Button disabled={!!deleteData?.delete_tech_tag_by_pk} onClick={() => saveTechTag()}>save</Button>
        }
      </Stack>
    </Stack>
  )
}
