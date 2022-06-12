import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Stack, TextField, Typography} from "@mui/material";
import {useGetTechTypeByIdQuery, useUpdateTechTypeMutation, GetTechTypeListDocument} from "../../generated/graphql/generated";

export const TechTypeEdit = () => {
  const navigate = useNavigate()
  const {techTypeId} = useParams<{ techTypeId: string }>()
  const id = Number(techTypeId) || 0
  const [name, setName] = useState("")

  const {loading, data: oldData} = useGetTechTypeByIdQuery({
    variables: {id: id}
  })

  useEffect(() => {
    if (oldData?.tech_type_by_pk !== undefined && oldData?.tech_type_by_pk !== null) {
      setName(oldData.tech_type_by_pk.name)
    }
  }, [oldData?.tech_type_by_pk])

  const [saveTechType, {error, data}] = useUpdateTechTypeMutation({
    variables: {id: {id: id}, techTypeData: {name: name}},
    refetchQueries: [GetTechTypeListDocument]
  })

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}>
      <Typography>Update tech type</Typography>
      <TextField value={name} onChange={(event) => setName(event.target.value)}></TextField>
      {error ? <Typography variant={"caption"}> {error.message} </Typography> : null}
      {data && data.update_tech_type_by_pk ?
        <Button onClick={() => navigate(-1)}>Saved, go back</Button> :
        <Button onClick={() => saveTechType()}>save</Button>
      }
    </Stack>
  )
}
