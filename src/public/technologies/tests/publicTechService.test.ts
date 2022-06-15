import {extractTechInfo} from '../service';
import {GetTechWithSubListQuery} from "../../../generated/graphql/generated";

const mock = JSON.parse(`
{"tech":[{"id":1,"link":"https://spring.io/projects/spring-framework","name":"Spring","tech_type":{"id":3,"name":"framework","__typename":"tech_type"},"tech2tags":[{"tech_tag":{"id":1,"name":"java","tag2groups":[{"tag_group":{"id":2,"name":"back-end","__typename":"tag_group"},"__typename":"group2tag"}],"__typename":"tech_tag"},"__typename":"tech2tag"}],"__typename":"tech"}, {"id":5,"link":"https://ru.reactjs.org/","name":"React","tech_type":{"id":1,"name":"library","__typename":"tech_type"},"tech2tags":[{"tech_tag":{"id":4,"name":"Type Script","tag2groups":[{"tag_group":{"id":1,"name":"web","__typename":"tag_group"},"__typename":"group2tag"}, {"tag_group":{"id":3,"name":"front-end","__typename":"tag_group"},"__typename":"group2tag"}],"__typename":"tech_tag"},"__typename":"tech2tag"}, {"tech_tag":{"id":7,"name":"Java Script","tag2groups":[{"tag_group":{"id":1,"name":"web","__typename":"tag_group"},"__typename":"group2tag"}, {"tag_group":{"id":3,"name":"front-end","__typename":"tag_group"},"__typename":"group2tag"}],"__typename":"tech_tag"},"__typename":"tech2tag"}],"__typename":"tech"}, {"id":10,"link":"https://akka.io/","name":"Akka","tech_type":{"id":3,"name":"framework","__typename":"tech_type"},"tech2tags":[{"tech_tag":{"id":10,"name":"Scala","tag2groups":[{"tag_group":{"id":1,"name":"web","__typename":"tag_group"},"__typename":"group2tag"}, {"tag_group":{"id":2,"name":"back-end","__typename":"tag_group"},"__typename":"group2tag"}],"__typename":"tech_tag"},"__typename":"tech2tag"}],"__typename":"tech"}, {"id":15,"link":"https://expressjs.com/ru/","name":"Express","tech_type":{"id":3,"name":"framework","__typename":"tech_type"},"tech2tags":[{"tech_tag":{"id":4,"name":"Type Script","tag2groups":[{"tag_group":{"id":1,"name":"web","__typename":"tag_group"},"__typename":"group2tag"}, {"tag_group":{"id":3,"name":"front-end","__typename":"tag_group"},"__typename":"group2tag"}],"__typename":"tech_tag"},"__typename":"tech2tag"}, {"tech_tag":{"id":7,"name":"Java Script","tag2groups":[{"tag_group":{"id":1,"name":"web","__typename":"tag_group"},"__typename":"group2tag"}, {"tag_group":{"id":3,"name":"front-end","__typename":"tag_group"},"__typename":"group2tag"}],"__typename":"tech_tag"},"__typename":"tech2tag"}],"__typename":"tech"}]}
`) as GetTechWithSubListQuery

const result = JSON.parse(`
{"tech":{"1":{"techId":1,"techName":"Spring","techType":"framework","techLink":"https://spring.io/projects/spring-framework"},"5":{"techId":5,"techName":"React","techType":"library","techLink":"https://ru.reactjs.org/"},"10":{"techId":10,"techName":"Akka","techType":"framework","techLink":"https://akka.io/"},"15":{"techId":15,"techName":"Express","techType":"framework","techLink":"https://expressjs.com/ru/"}},"groups":{"1":{"groupId":1,"groupName":"web"},"2":{"groupId":2,"groupName":"back-end"},"3":{"groupId":3,"groupName":"front-end"}},"tags":{"1":{"tagId":1,"tagName":"java"},"4":{"tagId":4,"tagName":"Type Script"},"7":{"tagId":7,"tagName":"Java Script"},"10":{"tagId":10,"tagName":"Scala"}},"structure":{"1":{"2":[1]},"5":{"1":[4,7],"3":[4,7]},"10":{"1":[10],"2":[10]},"15":{"1":[4,7],"3":[4,7]}}}
`)

describe("src/public/technologies/service.ts", () => {

  test("extractTechInfo", () => {
    const {tech, groups, tags, structure} = extractTechInfo(mock)
    const actual = {tech: tech.toJS(), groups: groups.toJS(), tags: tags.toJS(), structure: structure.toJS()}
    expect(actual).toStrictEqual(result)
  })
})
