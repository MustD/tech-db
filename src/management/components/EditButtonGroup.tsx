import {Button, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const EditButtonGroup = (
  {
    saved, deleted, onSave, onDelete
  }: {
    saved: boolean
    deleted: boolean
    onSave: () => void
    onDelete: () => void
  }
) => {
  const navigate = useNavigate()

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {!saved && !deleted ?
        <>
          <Button variant={"outlined"} onClick={() => onSave()}>Save</Button>
          <Button color={"secondary"} variant={"outlined"} onClick={() => navigate(-1)}>Cancel</Button>
          <Button variant={"outlined"} color={"warning"} onClick={() => onDelete()}>Delete</Button>
        </>
        :
        <>
          {saved ?
            <Button variant={"outlined"} onClick={() => navigate(-1)}>Saved, go back</Button>
            :
            <Button variant={"outlined"} color={"warning"} onClick={() => navigate(-1)}>Deleted, go back</Button>
          }
        </>
      }
    </Stack>
  )
}
