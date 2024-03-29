import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom";
import {Routes} from "../../StaticValues/Routes";
import {useGetTechTypeListQuery} from "../../generated/graphql/generated";

export const TechTypeList = () => {
  const {data} = useGetTechTypeListQuery({fetchPolicy: "no-cache"})

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
          {data && data.tech_db_tech_type.map((item) =>
            <TableRow key={item.id}>
              <TableCell> {item.id} </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Link to={`${Routes.management.techTypeEdit}/${item.id}`}><IconButton><EditIcon/> </IconButton></Link>
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell/>
            <TableCell/>
            <TableCell>
              <Link to={`${Routes.management.techTypeEdit}`}><IconButton><AddIcon/> </IconButton></Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
