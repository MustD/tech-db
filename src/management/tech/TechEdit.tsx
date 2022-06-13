import {Button, Chip, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
  GetTechListDocument,
  useDeleteTech2TagByIdsMutation,
  useDeleteTechByIdMutation,
  useGetTechByIdQuery,
  useGetTechTagListQuery,
  useGetTechTypeListQuery,
  useInsertTech2TagMutation,
  useUpdateTechByIdMutation
} from "../../generated/graphql/generated";
import {addNewRelation, entity2relative, toggleRelationByIndex} from "../utils/many2many";

export const TechEdit = () => {
  const navigate = useNavigate()
  const {techId} = useParams<{ techId: string }>()
  const id = Number(techId) || 0

  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const [type, setType] = useState("")
  const [selectedTags, setSelectedTags] = useState<entity2relative[]>([])

  const {data: oldData} = useGetTechByIdQuery(
    {variables: {id: id}}
  )
  useEffect(() => {
    if (oldData?.tech_by_pk) {
      setName(oldData.tech_by_pk.name)
      setLink(oldData.tech_by_pk.link)
      setType(String(oldData.tech_by_pk.tech_type_id))
      setSelectedTags(oldData.tech_by_pk.tech2tags.map((tech2tag) => ({
        pairId: tech2tag.id,
        status: "selected",
        relativeId: tech2tag.tech_tag.id
      })))
    }
  }, [oldData])

  const {data: techTypes} = useGetTechTypeListQuery()
  const {data: tags} = useGetTechTagListQuery()
  const allTags = tags?.tech_tag.map((tag) => ({id: tag.id, name: tag.name})) || []

  const toggleSelectedTags = (tagId: number) => {
    const index = selectedTags.findIndex((item) => item.relativeId === tagId)
    if (index === -1) {
      setSelectedTags((currentTags) => addNewRelation(currentTags, tagId))
    } else {
      setSelectedTags((currentTags) => toggleRelationByIndex(currentTags, index))
    }
  }


  const [saveTech, {error: saveError, data: saveData}] = useUpdateTechByIdMutation({
    variables: {
      id: id,
      _set: {name: name, link: link, tech_type_id: Number(type)}
    },
    refetchQueries: [GetTechListDocument]
  })

  const [deleteTech, {error: deleteError, data: deleteData}] = useDeleteTechByIdMutation({
    variables: {id: id},
    refetchQueries: [GetTechListDocument]
  })

  const [insertTech2Tag, {error: errorInsertTag}] = useInsertTech2TagMutation({
    variables: {
      objects: selectedTags.filter(tag => "new" === tag.status).map(tag => ({
        tech_id: id,
        tag_id: tag.relativeId
      }))
    },
    refetchQueries: [GetTechListDocument]
  })

  const [deleteTech2Tag, {error: errorDeleteTag}] = useDeleteTech2TagByIdsMutation({
    variables: {_in: selectedTags.filter(tag => "unselected" === tag.status).map(tag => tag.pairId)},
    refetchQueries: [GetTechListDocument]
  })

  useEffect(() => {
    if (selectedTags.findIndex(tag => tag.status === "new") >= 0) {
      insertTech2Tag()
    }
    if (selectedTags.findIndex(tag => tag.status === "unselected") >= 0) {
      deleteTech2Tag()
    }
  }, [saveData?.update_tech_by_pk])

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={2}>
      <Typography>Edit existing tech</Typography>
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
      <Stack direction="row" alignItems="center" spacing={1}>
        {allTags.map(tag => (
          <Chip
            key={tag.id}
            label={tag.name}
            onClick={() => toggleSelectedTags(tag.id)}
            color={selectedTags.findIndex((item) =>
              item.relativeId === tag.id &&
              item.status !== "unselected"
            ) >= 0 ? "primary" : "default"
            }
          />
        ))}
      </Stack>
      {saveError ? <Typography variant={"caption"}> Saving error: {saveError.message} </Typography> : null}
      {deleteError ? <Typography variant={"caption"}> Deleting error: {deleteError.message} </Typography> : null}
      {errorInsertTag ? <Typography variant={"caption"}> Deleting error: {errorInsertTag.message} </Typography> : null}
      {errorDeleteTag ? <Typography variant={"caption"}> Deleting error: {errorDeleteTag.message} </Typography> : null}
      <Stack direction="row" alignItems="center" spacing={1}>
        {deleteData?.delete_tech_by_pk ?
          <Button onClick={() => navigate(-1)}>deleted, go back</Button> :
          <Button disabled={!!saveData?.update_tech_by_pk} color={"warning"} onClick={() => deleteTech()}>delete</Button>
        }
        {saveData?.update_tech_by_pk ?
          <Button onClick={() => navigate(-1)}>Saved, go back</Button> :
          <Button disabled={!!deleteData?.delete_tech_by_pk} onClick={() => saveTech()}>save</Button>
        }
      </Stack>
    </Stack>
  )
}
