import {Outlet, useNavigate} from "react-router-dom";
import {Routes} from "../../StaticValues/Routes";
import {Box, Button, Stack} from "@mui/material";

export const ManagementWrapper = () => {
  const navigate = useNavigate()
  const managementNavigation = [
    {to: Routes.management.tech, name: "Technologies"},
    {to: Routes.management.techType, name: "Technology types"},
    {to: Routes.management.techTag, name: "Technology tags"},
    {to: Routes.management.tagGroup, name: "Tags groups"},
  ]
  return (
    <Box p={2}>
      <Stack direction="column" alignItems="flex-start" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          {managementNavigation.map(link =>
            <Button variant={"outlined"} key={link.to} onClick={() => navigate(link.to)}>{link.name}</Button>
          )}
        </Stack>
        <Outlet/>
      </Stack>
    </Box>
  )
}
