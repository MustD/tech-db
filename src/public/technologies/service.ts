import {GetTechWithSubListQuery} from "../../generated/graphql/generated";
import {List, Seq} from "immutable";

export const extractTechInfo = (data: GetTechWithSubListQuery) => {
  const incoming = List(data.tech)
  const flatData = incoming
    .map(tech => tech.tech2tags.map(tag => tag.tech_tag.tag2groups.map(group => ({
      techId: tech.id,
      techName: tech.name,
      techType: tech.tech_type.name,
      techLink: tech.link,
      groupId: group.tag_group.id,
      groupName: group.tag_group.name,
      tagId: tag.tech_tag.id,
      tagName: tag.tech_tag.name,
    })))).flatMap(lvl => lvl).flatMap(lvl => lvl)

  const techs = flatData.map(fullObject => ({
    techId: fullObject.techId,
    techName: fullObject.techName,
    techType: fullObject.techType,
    techLink: fullObject.techLink,
  })).groupBy(item => item.techId).map((item, key) => item.first()!)

  const groups = flatData.map(fullObject => ({
    groupId: fullObject.groupId,
    groupName: fullObject.groupName,
  })).groupBy(item => item.groupId).map((item, key) => item.first()!)

  const tags = flatData.map(fullObject => ({
    tagId: fullObject.tagId,
    tagName: fullObject.tagName,
  })).groupBy(item => item.tagId).map((item, key) => item.first()!)

  const structure = flatData
    .groupBy(tech => tech.techId)
    .map((tech) => tech.groupBy(group => group.groupId))
    .map((tech) => tech.map((group) => group.map(data => data.tagId)))

  return {tech: techs, groups: groups, tags: tags, structure: structure}
}

type GqlFilter = {
  tech2tags?: {
    tech_tag: {
      id: { _in: string[] }
    }
  }
}

export const getFilter = (tags: string[]): GqlFilter => {
  if (tags.length <= 1 && tags[0] === "") {
    return {}
  }
  return {tech2tags: {tech_tag: {id: {_in: tags}}}}

}
