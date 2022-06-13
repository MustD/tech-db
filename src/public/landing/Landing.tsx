import {Link} from "react-router-dom";
import {Routes} from "../../StaticValues/Routes";
import {Stack} from "@mui/material";
import {Technologies} from "../technologies";

export const Landing = () => {
  return (
    <Stack direction={"column"} spacing={1}>
      <Link to={Routes.management.index}>Management</Link>
      <Technologies/>
    </Stack>

  )
}
