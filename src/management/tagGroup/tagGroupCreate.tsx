import {Button, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {GetTagGroupListDocument, useSaveTagGroupMutation} from "../../generated/graphql/generated";

export const TagGroupCreate = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")

  const [saveTagGroup, {error, data}] = useSaveTagGroupMutation({
    variables: {tagGroup: {name: name}},
    refetchQueries: [GetTagGroupListDocument]
  })

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}>
      <Typography>Create new tag group</Typography>
      <TextField value={name} onChange={(event) => setName(event.target.value)}></TextField>
      {error ? <Typography variant={"caption"}> {error.message} </Typography> : null}
      {data && data.insert_tag_group_one ?
        <Button onClick={() => navigate(-1)}>Saved, go back</Button> :
        <Button onClick={() => saveTagGroup()}>save</Button>
      }
    </Stack>
  )
}
