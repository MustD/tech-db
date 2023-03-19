import React from "react";

export type entity2relative = {
  pairId: string
  status: "selected" | "unselected" | "new"
  relativeId: string
}

export const toggleRelation = (
  tagId: string,
  selectedTags: entity2relative[],
  setStateFn: React.Dispatch<React.SetStateAction<entity2relative[]>>
) => {
  const index = selectedTags.findIndex((item) => item.relativeId === tagId)
  if (index === -1) {
    setStateFn((currentRel) => addNewRelation(currentRel, tagId))
  } else {
    setStateFn((currentRel) => toggleRelationByIndex(currentRel, index))
  }
}

export const addNewRelation = (relations: entity2relative[], relativeId: string): entity2relative[] =>
  [...relations, {pairId: "", status: "new", relativeId: relativeId}]

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
