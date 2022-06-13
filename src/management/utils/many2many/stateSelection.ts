export type entity2relative = {
  pairId: number
  status: "selected" | "unselected" | "new"
  relativeId: number
}

export const addNewRelation = (relations: entity2relative[], relativeId: number): entity2relative[] =>
  [...relations, {pairId: 0, status: "new", relativeId: relativeId}]

export const toggleRelationByIndex = (relations: entity2relative[], relationIndex: number): entity2relative[] => {
  let copy = [...relations]
  switch (relations[relationIndex].status) {
    case "new":
      copy = [...relations.slice(0, relationIndex), ...relations.slice(relationIndex + 1)]
      break;
    case "selected":
      copy[relationIndex].status = "unselected"
      break;
    default:
      copy[relationIndex].status = "selected"
  }
  return copy
}
