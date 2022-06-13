import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Stack, TextField, Typography} from "@mui/material";
import {
  GetTechTypeByIdDocument,
  useDeleteTechTypeByIdMutation,
  useGetTechTypeByIdQuery,
  useUpdateTechTypeMutation
} from "../../generated/graphql/generated";
import {ApolloErrorMessage, EditButtonGroup} from "../components";

export const TechTypeEdit = () => {
  const {techTypeId} = useParams<{ techTypeId: string }>()
  const id = Number(techTypeId) || 0
  const [name, setName] = useState("")

  const {data: oldData} = useGetTechTypeByIdQuery({
    variables: {id: id}, fetchPolicy: "no-cache"
  })

  useEffect(() => {
    if (oldData?.tech_type_by_pk) {
      setName(oldData.tech_type_by_pk.name)
    }
  }, [oldData?.tech_type_by_pk])

  const [saveTechType, {error: errorSave, data: saveData}] = useUpdateTechTypeMutation({
    variables: {id: id, techTypeData: {name: name}},
  })

  const [deleteTechType, {error: errorDelete, data: deleteData}] = useDeleteTechTypeByIdMutation({
    variables: {id: id},
  })

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}>
      <Typography>Update tech type</Typography>
      <TextField value={name} onChange={(event) => setName(event.target.value)}></TextField>
      <ApolloErrorMessage errors={[errorSave, errorDelete]}/>
      <EditButtonGroup
        saved={Boolean(saveData)}
        deleted={Boolean(deleteData)}
        onSave={() => saveTechType()}
        onDelete={() => deleteTechType()}
      />
    </Stack>
  )
}
