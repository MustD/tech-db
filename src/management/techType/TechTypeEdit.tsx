import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {
  GET_TECH_TYPE_LIST,
  TechTypeData,
  SAVE_TECH_TYPE,
  TechType,
  UPDATE_TECH_TYPE,
  TechTypeInventoryData, GET_TECH_BY_ID
} from "./api";
import {Button, Stack, TextField, Typography} from "@mui/material";

export const TechTypeEdit = () => {
  const navigate = useNavigate()
  const {techTypeId} = useParams<{ techTypeId: string }>()
  const id = Number(techTypeId) || 0
  const [name, setName] = useState("")

  const {loading, data: oldData} = useQuery<{ tech_type_by_pk: TechType }, { id: number }>(
    GET_TECH_BY_ID, {
      variables: {id: id}
    })

  useEffect(() => {
    if (oldData !== undefined) {
      setName(oldData.tech_type_by_pk.name)
    }
  }, [oldData?.tech_type_by_pk])

  const [
    saveTechType, {
      error,
      data
    }
  ] = useMutation<{ update_tech_type_by_pk: TechType }, { id: { id: number }, techTypeData: TechTypeData }>(
    UPDATE_TECH_TYPE,
    {
      variables: {id: {id: id}, techTypeData: {name: name}},
      refetchQueries: [GET_TECH_TYPE_LIST]
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
