import {Stack} from "@mui/material";
import {useGetTechWithSubListQuery} from "../../generated/graphql/generated";

export const Technologies = () => {
  const {data} = useGetTechWithSubListQuery()
  return (
    <Stack>
      {data && data.tech.map(tech =>
        <div key={tech.id}>
          <span>{tech.name}</span>
          <span>{tech.link}</span>
          <span>{tech.tech_type.name}</span>
          <div>
            <div>{tech.tech2tags.map(tag =>
              <div key={tag.tech_tag.id}>
                <span>{tag.tech_tag.name}</span>
                <div>
                  {tag.tech_tag.tag2groups.map(group =>
                    <div key={group.tag_group.id}>
                      <span>{group.tag_group.name}</span>
                    </div>
                  )}
                </div>
              </div>
            )}</div>
          </div>
        </div>
      )}
    </Stack>
  )
}
