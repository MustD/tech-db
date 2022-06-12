import {
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom";
import {Routes} from "../../StaticValues/Routes";
import {useGetTechTypeListQuery} from "../../generated/graphql/generated";

export const TechTypeList = () => {
  const {data} = useGetTechTypeListQuery()

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.tech_type.map((item) =>
            <TableRow key={item.id}>
              <TableCell> {item.id} </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton> <DeleteIcon/> </IconButton>
                  <Link to={`${Routes.management.techTypeEdit}/${item.id}`}><IconButton><EditIcon/> </IconButton></Link>
                </Stack>
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell/>
            <TableCell/>
            <TableCell>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Link to={`${Routes.management.techTypeEdit}`}><IconButton><AddIcon/> </IconButton></Link>
              </Stack>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
