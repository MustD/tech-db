import {Button, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useInsertTagGroupMutation} from "../../generated/graphql/generated";
import {ApolloErrorMessage} from "../components";

export const TagGroupCreate = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")

  const [saveTagGroup, {error: errorSave, data}] = useInsertTagGroupMutation({
    variables: {tagGroup: {name: name}},
  })

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}>
      <Typography>Create new tag group</Typography>
      <TextField value={name} onChange={(event) => setName(event.target.value)}></TextField>
      <ApolloErrorMessage errors={[errorSave]}/>
      {data && data.insert_tag_group_one ?
        <Button onClick={() => navigate(-1)}>Saved, go back</Button> :
        <Button onClick={() => saveTagGroup()}>save</Button>
      }
    </Stack>
  )
}
