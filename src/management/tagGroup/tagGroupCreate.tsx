import {Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useInsertTagGroupMutation} from "../../generated/graphql/generated";
import {ApolloErrorMessage, CreateButtonGroup} from "../components";

export const TagGroupCreate = () => {
  const [name, setName] = useState("")

  const [saveTagGroup, {error: errorSave, data}] = useInsertTagGroupMutation({
    variables: {tagGroup: {name: name}},
  })

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}>
      <Typography>Create new tag group</Typography>
      <TextField value={name} onChange={(event) => setName(event.target.value)}></TextField>
      <ApolloErrorMessage errors={[errorSave]}/>
      <CreateButtonGroup saved={Boolean(data)} onSave={() => saveTagGroup()}/>
    </Stack>
  )
}
