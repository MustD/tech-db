import {Link, Outlet, useMatch, useNavigate} from "react-router-dom";
import {Routes} from "../../StaticValues/Routes";
import {Box, Button, Stack} from "@mui/material";
import {Technologies} from "../technologies";

export const Landing = () => {
  const navigate = useNavigate()
  const tempNavigation = [
    {
      to: Routes.management.index,
      name: "management",
      match: false
    },
  ]
  return (
    <Box p={2}>
      <Stack direction="column" alignItems="flex-start" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          {tempNavigation.map(link =>
            <Button
              key={link.to}
              variant={link.match ? "contained" : "outlined"}
              onClick={() => navigate(link.to)}>{link.name}
            </Button>
          )}
        </Stack>
        <Technologies/>
      </Stack>
    </Box>
  )
}
