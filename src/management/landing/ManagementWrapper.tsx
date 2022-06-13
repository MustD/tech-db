import {Outlet, useLocation, useMatch, useNavigate, useResolvedPath} from "react-router-dom";
import {Routes} from "../../StaticValues/Routes";
import {Box, Button, Stack} from "@mui/material";

export const ManagementWrapper = () => {
  const navigate = useNavigate()
  const managementNavigation = [
    {
      to: "/",
      name: "home",
      match: false
    },
    {
      to: Routes.management.tech,
      name: "Technologies",
      match: useMatch({path: `${Routes.management.index}/${Routes.management.tech}`, end: false})
    },
    {
      to: Routes.management.techType,
      name: "Technology types",
      match: useMatch({path: `${Routes.management.index}/${Routes.management.techType}`, end: false})
    },
    {
      to: Routes.management.techTag,
      name: "Technology tags",
      match: useMatch({path: `${Routes.management.index}/${Routes.management.techTag}`, end: false})
    },
    {
      to: Routes.management.tagGroup,
      name: "Tags groups",
      match: useMatch({path: `${Routes.management.index}/${Routes.management.tagGroup}`, end: false})
    },
  ]
  return (
    <Box p={2}>
      <Stack direction="column" alignItems="flex-start" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          {managementNavigation.map(link =>
            <Button
              key={link.to}
              variant={link.match ? "contained" : "outlined"}
              onClick={() => navigate(link.to)}>{link.name}
            </Button>
          )}
        </Stack>
        <Outlet/>
      </Stack>
    </Box>
  )
}
