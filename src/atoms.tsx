import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

// bubble
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});