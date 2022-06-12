import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Stack, TextField, Typography} from "@mui/material";
import {
  useGetTechTypeByIdQuery,
  useUpdateTechTypeMutation,
  GetTechTypeListDocument,
  useDeleteTechTypeByIdMutation
} from "../../generated/graphql/generated";

export const TechTypeEdit = () => {
  const navigate = useNavigate()
  const {techTypeId} = useParams<{ techTypeId: string }>()
  const id = Number(techTypeId) || 0
  const [name, setName] = useState("")

  const {data: oldData} = useGetTechTypeByIdQuery({
    variables: {id: id}
  })

  useEffect(() => {
    if (oldData?.tech_type_by_pk !== undefined && oldData?.tech_type_by_pk !== null) {
      setName(oldData.tech_type_by_pk.name)
    }
  }, [oldData?.tech_type_by_pk])

  const [saveTechType, {error: saveError, data: saveData}] = useUpdateTechTypeMutation({
    variables: {id: id, techTypeData: {name: name}},
    refetchQueries: [GetTechTypeListDocument]
  })

  const [deleteTechType, {error: deleteError, data: deleteData}] = useDeleteTechTypeByIdMutation({
    variables: {id: id},
    refetchQueries: [GetTechTypeListDocument]
  })

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}>
      <Typography>Update tech type</Typography>
      <TextField value={name} onChange={(event) => setName(event.target.value)}></TextField>
      {saveError ? <Typography variant={"caption"}> Saving error: {saveError.message} </Typography> : null}
      {deleteError ? <Typography variant={"caption"}> Deleting error: {deleteError.message} </Typography> : null}
      <Stack direction="row" alignItems="center" spacing={1}>
        {deleteData?.delete_tech_type_by_pk ?
          <Button onClick={() => navigate(-1)}>deleted, go back</Button> :
          <Button disabled={!!saveData?.update_tech_type_by_pk} color={"warning"}
                  onClick={() => deleteTechType()}>delete</Button>
        }
        {saveData?.update_tech_type_by_pk ?
          <Button onClick={() => navigate(-1)}>Saved, go back</Button> :
          <Button disabled={!!deleteData?.delete_tech_type_by_pk} onClick={() => saveTechType()}>save</Button>
        }
      </Stack>
    </Stack>
  )
}
