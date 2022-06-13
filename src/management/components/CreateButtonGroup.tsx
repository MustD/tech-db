import {Button, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const CreateButtonGroup = (
  {
    saved, onSave,
  }: {
    saved: boolean
    onSave: () => void
  }
) => {
  const navigate = useNavigate()

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {!saved ?
        <>
          <Button variant={"outlined"} onClick={() => onSave()}>Save</Button>
          <Button color={"secondary"} variant={"outlined"} onClick={() => navigate(-1)}>Cancel</Button>
        </>
        :
        <Button variant={"outlined"} onClick={() => navigate(-1)}>Saved, go back</Button>
      }
    </Stack>
  )
}
