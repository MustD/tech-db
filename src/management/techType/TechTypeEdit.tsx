import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Stack, TextField, Typography} from "@mui/material";
import {
  GetTechTypeByIdDocument,
  useDeleteTechTypeByIdMutation,
  useGetTechTypeByIdQuery,
  useUpdateTechTypeMutation
} from "../../generated/graphql/generated";
import {ApolloErrorMessage} from "../components";

export const TechTypeEdit = () => {
  const navigate = useNavigate()
  const {techTypeId} = useParams<{ techTypeId: string }>()
  const id = Number(techTypeId) || 0
  const [name, setName] = useState("")

  const {data: oldData} = useGetTechTypeByIdQuery({
    variables: {id: id}
  })

  useEffect(() => {
    if (oldData?.tech_type_by_pk) {
      setName(oldData.tech_type_by_pk.name)
    }
  }, [oldData?.tech_type_by_pk])

  const [saveTechType, {error: errorSave, data: saveData}] = useUpdateTechTypeMutation({
    variables: {id: id, techTypeData: {name: name}},
    refetchQueries: [GetTechTypeByIdDocument]
  })

  const [deleteTechType, {error: errorDelete, data: deleteData}] = useDeleteTechTypeByIdMutation({
    variables: {id: id},
  })

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}>
      <Typography>Update tech type</Typography>
      <TextField value={name} onChange={(event) => setName(event.target.value)}></TextField>
      <ApolloErrorMessage errors={[errorSave, errorDelete]}/>
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
