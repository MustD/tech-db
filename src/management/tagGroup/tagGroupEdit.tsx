import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Stack, TextField, Typography} from "@mui/material";
import {
  GetTagGroupByIdDocument,
  useDeleteTagGroupByIdMutation,
  useGetTagGroupByIdQuery,
  useUpdateTagGroupByIdMutation
} from "../../generated/graphql/generated";
import {ApolloErrorMessage, EditButtonGroup} from "../components";

export const TagGroupEdit = () => {
  const {tagGroupId} = useParams<{ tagGroupId: string }>()
  const id = Number(tagGroupId) || 0
  const [name, setName] = useState("")

  const {data: oldData} = useGetTagGroupByIdQuery({
    variables: {id: id}
  })

  useEffect(() => {
    if (oldData?.tag_group_by_pk !== undefined && oldData?.tag_group_by_pk !== null) {
      setName(oldData.tag_group_by_pk.name)
    }
  }, [oldData?.tag_group_by_pk])

  const [saveTagGroup, {error: errorSave, data: saveData}] = useUpdateTagGroupByIdMutation({
    variables: {id: id, tagGroup: {name: name}}, refetchQueries: [GetTagGroupByIdDocument]
  })

  const [deleteTagGroup, {error: errorDelete, data: deleteData}] = useDeleteTagGroupByIdMutation({
    variables: {id: id},
  })

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={1}>
      <Typography>Update tag group</Typography>
      <TextField value={name} onChange={(event) => setName(event.target.value)}></TextField>
      <ApolloErrorMessage errors={[errorSave, errorDelete]}/>
      <EditButtonGroup
        saved={Boolean(saveData)}
        deleted={Boolean(deleteData)}
        onSave={() => saveTagGroup()}
        onDelete={() => deleteTagGroup()}
      />
    </Stack>
  )
}
