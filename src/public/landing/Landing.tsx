import {Link} from "react-router-dom";
import {Routes} from "../../StaticValues/Routes";

export const Landing = () => {
  return (
    <nav>
      <Link to={Routes.management.index}>Management</Link>
    </nav>
  )
}
