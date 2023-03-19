import {
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
import {useGetTechTagListQuery} from "../../generated/graphql/generated";

export const TechTagList = () => {
  const {data} = useGetTechTagListQuery({fetchPolicy: "no-cache"})

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Groups</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.tech_db_tech_tag.map((tag) =>
            <TableRow key={tag.id}>
              <TableCell> {tag.id} </TableCell>
              <TableCell>{tag.name}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  {tag.group2tags.map((group) =>
                    <Chip key={group.tag_group.id} label={group.tag_group.name}/>
                  )}
                </Stack>
              </TableCell>
              <TableCell>
                <Link to={`${Routes.management.techTagEdit}/${tag.id}`}><IconButton><EditIcon/> </IconButton></Link>
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell>
              <Link to={`${Routes.management.techTagEdit}`}><IconButton><AddIcon/> </IconButton></Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
