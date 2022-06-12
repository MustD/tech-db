export type tech2group = {
  relationId: number
  status: "selected" | "unselected" | "new"
  groupId: number
}

export const addNewGroup = (groups: tech2group[], groupId: number): tech2group[] =>
  [...groups, {groupId: groupId, status: "new", relationId: 0}]

export const toggleExistedGroup = (groups: tech2group[], existedIndex: number): tech2group[] => {
  let copy = [...groups]
  switch (groups[existedIndex].status) {
    case "new":
      copy = [...groups.slice(0, existedIndex), ...groups.slice(existedIndex + 1)]
      break;
    case "selected":
      copy[existedIndex].status = "unselected"
      break;
    default:
      copy[existedIndex].status = "selected"
  }
  return copy
}
