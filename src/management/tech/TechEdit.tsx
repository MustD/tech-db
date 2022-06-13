import {Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
  GetTechByIdDocument,
  useDeleteTech2TagByIdsMutation,
  useDeleteTechByIdMutation,
  useGetTechByIdQuery,
  useInsertTech2TagMutation,
  useUpdateTechByIdMutation
} from "../../generated/graphql/generated";
import {entity2relative, toggleRelation} from "../utils/many2many";
import {TechEditTags, TechEditType} from "./components";
import {ApolloErrorMessage, EditButtonGroup} from "../components";

export const TechEdit = () => {
  const {techId} = useParams<{ techId: string }>()
  const id = Number(techId) || 0

  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const [typeId, setTypeId] = useState("")
  const [selectedTags, setSelectedTags] = useState<entity2relative[]>([])

  const {data: oldData} = useGetTechByIdQuery(
    {variables: {id: id}}
  )
  useEffect(() => {
    if (oldData?.tech_by_pk) {
      setName(oldData.tech_by_pk.name)
      setLink(oldData.tech_by_pk.link)
      setTypeId(String(oldData.tech_by_pk.tech_type_id))
      setSelectedTags(oldData.tech_by_pk.tech2tags.map((tech2tag) => ({
        pairId: tech2tag.id,
        status: "selected",
        relativeId: tech2tag.tech_tag.id
      })))
    }
  }, [oldData])

  const toggleSelectedTags = (tagId: number) => toggleRelation(tagId, selectedTags, setSelectedTags)

  const [saveTech, {error: errorSaving, data: saveData}] = useUpdateTechByIdMutation({
    variables: {
      id: id,
      _set: {name: name, link: link, tech_type_id: Number(typeId)}
    }, refetchQueries: [GetTechByIdDocument]
  })

  const [deleteTech, {error: errorDeleting, data: deleteData}] = useDeleteTechByIdMutation({
    variables: {id: id},
  })

  const [insertTech2Tag, {error: errorInsertTag}] = useInsertTech2TagMutation({
    variables: {
      objects: selectedTags.filter(tag => "new" === tag.status).map(tag => ({
        tech_id: id,
        tag_id: tag.relativeId
      }))
    },
  })

  const [deleteTech2Tag, {error: errorDeleteTag}] = useDeleteTech2TagByIdsMutation({
    variables: {_in: selectedTags.filter(tag => "unselected" === tag.status).map(tag => tag.pairId)},
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
      <TechEditType typeId={typeId} setTypeId={(id) => setTypeId(id)}/>
      <TechEditTags selectedTags={selectedTags} toggleSelectedTag={toggleSelectedTags}/>
      <ApolloErrorMessage errors={[errorSaving, errorDeleting, errorInsertTag, errorDeleteTag]}/>
      <EditButtonGroup
        saved={Boolean(saveData)}
        deleted={Boolean(deleteData)}
        onSave={() => saveTech()}
        onDelete={() => deleteTech()}
      />
    </Stack>
  )
}
