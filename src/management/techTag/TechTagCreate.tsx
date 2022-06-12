import {Button, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {GetTechTagListDocument, useSaveTechTagMutation} from "../../generated/graphql/generated";

export const TechTagCreate = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")

  const [saveTechTag, {error, data}] = useSaveTechTagMutation({
    variables: {techTag: {name: name}},
    refetchQueries: [GetTechTagListDocument]
  })

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}>
      <Typography>Create new tech tag</Typography>
      <TextField value={name} onChange={(event) => setName(event.target.value)}></TextField>
      {error ? <Typography variant={"caption"}> {error.message} </Typography> : null}
      {data && data.insert_tech_tag_one ?
        <Button onClick={() => navigate(-1)}>Saved, go back</Button> :
        <Button onClick={() => saveTechTag()}>save</Button>
      }
    </Stack>
  )
}
