import {Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
  GetTechListDocument,
  useDeleteTechByIdMutation,
  useGetTechByIdQuery,
  useGetTechTypeListQuery,
  useSaveTechMutation
} from "../../generated/graphql/generated";

export const TechEdit = () => {
  const navigate = useNavigate()
  const {techId} = useParams<{ techId: string }>()
  const id = Number(techId) || 0

  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const [type, setType] = useState("")

  const {data: oldData} = useGetTechByIdQuery(
    {variables: {id: id}}
  )
  const {data: techTypes} = useGetTechTypeListQuery()

  useEffect(() => {
    if (oldData?.tech_by_pk) {
      setName(oldData.tech_by_pk.name)
      setLink(oldData.tech_by_pk.link)
      setType(String(oldData.tech_by_pk.tech_type_id))
    }
  }, [oldData])

  const [saveTech, {error: saveError, data: saveData}] = useSaveTechMutation({
    variables: {tech: {name: name, link: link, tech_type_id: Number(type)}},
    refetchQueries: [GetTechListDocument]
  })

  const [deleteTech, {error: deleteError, data: deleteData}] = useDeleteTechByIdMutation({
    variables: {id: id},
    refetchQueries: [GetTechListDocument]
  })

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={2}>
      <Typography>Create new tech</Typography>
      <TextField size={"small"} label={"Name"} value={name}
                 onChange={(event) => setName(event.target.value)}/>
      <TextField size={"small"} label={"Tech link"} value={link}
                 onChange={(event) => setLink(event.target.value)}/>
      <FormControl sx={{minWidth: 230}} size={"small"}>
        <InputLabel id="tech-type-select-label">Type</InputLabel>
        <Select
          labelId="tech-type-select-label"
          value={type}
          label="Type"
          onChange={(event) => setType(event.target.value as string)}
        >
          {techTypes && techTypes.tech_type.map((techType) =>
            <MenuItem key={techType.id} value={String(techType.id)}>{techType.name}</MenuItem>
          )}
        </Select>
      </FormControl>
      {saveError ? <Typography variant={"caption"}> Saving error: {saveError.message} </Typography> : null}
      {deleteError ? <Typography variant={"caption"}> Deleting error: {deleteError.message} </Typography> : null}
      <Stack direction="row" alignItems="center" spacing={1}>
        {deleteData?.delete_tech_by_pk ?
          <Button onClick={() => navigate(-1)}>deleted, go back</Button> :
          <Button disabled={!!saveData?.insert_tech_one} color={"warning"} onClick={() => deleteTech()}>delete</Button>
        }
        {saveData?.insert_tech_one ?
          <Button onClick={() => navigate(-1)}>Saved, go back</Button> :
          <Button disabled={!!deleteData?.delete_tech_by_pk} onClick={() => saveTech()}>save</Button>
        }
      </Stack>
    </Stack>
  )
}
