import {Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {GetTechListDocument, useGetTechTypeListQuery, useSaveTechMutation} from "../../generated/graphql/generated";

export const TechCreate = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const [type, setType] = useState("")

  const {data: techTypes} = useGetTechTypeListQuery()

  const [saveTechType, {error, data}] = useSaveTechMutation({
    variables: {tech: {name: name, link: link, tech_type_id: Number(type)}},
    refetchQueries: [GetTechListDocument]
  })

  return (
    <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} spacing={2}>
      <Typography>Create new tech</Typography>
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
      {error ? <Typography variant={"caption"}> {error.message} </Typography> : null}
      {data?.insert_tech_one ?
        <Button onClick={() => navigate(-1)}>Saved, go back</Button> :
        <Button onClick={() => saveTechType()}>save</Button>
      }
    </Stack>
  )
}
