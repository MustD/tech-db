import {
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom";
import {Routes} from "../../StaticValues/Routes";
import {useGetTechListQuery} from "../../generated/graphql/generated";

export const TechList = () => {
  const {data} = useGetTechListQuery({fetchPolicy: "no-cache"})

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Link</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.tech_db_tech.map((tech) =>
            <TableRow key={tech.id}>
              <TableCell> {tech.id} </TableCell>
              <TableCell>{tech.name}</TableCell>
              <TableCell>{tech.tech_type.name}</TableCell>
              <TableCell><Button variant="outlined" href={tech.link} target={"_blank"}>{tech.link}</Button></TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  {tech.tech2tags.map((tag) =>
                    <Chip key={tag.tech_tag.id} label={tag.tech_tag.name}/>
                  )}
                </Stack>
              </TableCell>
              <TableCell>
                <Link to={`${Routes.management.techEdit}/${tech.id}`}><IconButton><EditIcon/> </IconButton></Link>
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell>
              <Link to={`${Routes.management.techEdit}`}><IconButton><AddIcon/> </IconButton></Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
