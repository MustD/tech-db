import {Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useInsertTech2TagMutation, useInsertTechMutation} from "../../generated/graphql/generated";
import {entity2relative, toggleRelation} from "../utils/many2many";
import {TechEditTags, TechEditType} from "./components";
import {ApolloErrorMessage, CreateButtonGroup} from "../components";

export const TechCreate = () => {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const [typeId, setTypeId] = useState("")
  const [selectedTags, setSelectedTags] = useState<entity2relative[]>([])

  const toggleSelectedTags = (tagId: string) => toggleRelation(tagId, selectedTags, setSelectedTags)

  const [saveTechType, {error: errorSaving, data}] = useInsertTechMutation({
    variables: {tech: {name: name, link: link, tech_type_id: typeId}},
  })

  const [insertTech2Tag, {error: errorInsertTag}] = useInsertTech2TagMutation({
    variables: {
      objects: selectedTags.filter(tag => "new" === tag.status).map(tag => ({
        tech_id: id,
        tag_id: tag.relativeId
      }))
    },
  })

  useEffect(() => {
    if (data?.insert_tech_db_tech_one?.id) {
      setId(data.insert_tech_db_tech_one.id)
    }
  }, [data?.insert_tech_db_tech_one])

  useEffect(() => {
    if (id !== "") {
      insertTech2Tag()
    }
  }, [id])

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={2}>
      <Typography>Create new tech</Typography>
      <TextField size={"small"} label={"Name"} value={name}
                 onChange={(event) => setName(event.target.value)}/>
      <TextField size={"small"} label={"Tech link"} value={link}
                 onChange={(event) => setLink(event.target.value)}/>
      <TechEditType typeId={typeId} setTypeId={(id) => setTypeId(id)}/>
      <TechEditTags selectedTags={selectedTags} toggleSelectedTag={toggleSelectedTags}/>
      <ApolloErrorMessage errors={[errorSaving, errorInsertTag]}/>
      <CreateButtonGroup saved={Boolean(data)} onSave={() => saveTechType()}/>
    </Stack>
  )
}
