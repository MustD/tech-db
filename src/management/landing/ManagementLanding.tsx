import {Link} from "react-router-dom";
import {Routes} from "../../StaticValues/Routes";
import {Button, Stack} from "@mui/material";

export const ManagementLanding = () => {
  return (
    <div>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Link to={Routes.management.techType}><Button>tech-type</Button></Link>
        <Link to={Routes.management.techTag}><Button>tech-tag</Button></Link>
        <Link to={Routes.management.tagGroup}><Button>tag-group</Button></Link>
      </Stack>
    </div>

  )
}
