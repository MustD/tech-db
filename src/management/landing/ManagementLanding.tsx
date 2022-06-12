import {Link} from "react-router-dom";
import {Routes} from "../../StaticValues/Routes";

export const ManagementLanding = () => {
  return (
    <div>
      <nav>
        <Link to={Routes.management.techType}>tech-type</Link>
        <Link to={Routes.management.techTag}>tech-tag</Link>
      </nav>
    </div>

  )
}
