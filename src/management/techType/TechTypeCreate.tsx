import {Button, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSaveTechTypeMutation} from "../../generated/graphql/generated";

export const TechTypeCreate = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")

  const [saveTechType, {error, data}] = useSaveTechTypeMutation({
    variables: {techType: {name: name}}
  })

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}>
      <Typography>Create new tech type</Typography>
      <TextField value={name} onChange={(event) => setName(event.target.value)}></TextField>
      {error ? <Typography variant={"caption"}> {error.message} </Typography> : null}
      {data && data.insert_tech_type_one ?
        <Button onClick={() => navigate(-1)}>Saved, go back</Button> :
        <Button onClick={() => saveTechType()}>save</Button>
      }
    </Stack>
  )
}
