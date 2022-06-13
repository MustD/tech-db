import {Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useInsertTechTypeMutation} from "../../generated/graphql/generated";
import {ApolloErrorMessage, CreateButtonGroup} from "../components";

export const TechTypeCreate = () => {
  const [name, setName] = useState("")

  const [saveTechType, {error: errorSave, data}] = useInsertTechTypeMutation({
    variables: {techType: {name: name}},
  })

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}>
      <Typography>Create new tech type</Typography>
      <TextField value={name} onChange={(event) => setName(event.target.value)}></TextField>
      <ApolloErrorMessage errors={[errorSave]}/>
      <CreateButtonGroup saved={Boolean(data)} onSave={() => saveTechType()}/>
    </Stack>
  )
}
