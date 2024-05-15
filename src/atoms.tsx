import { atom, selector } from "recoil";

export const Categories = {
    TO_DO: "TO_DO",
    DOING: "DOING",
    DONE: "DONE",
};

export interface IToDo {
    text: string;
    id: number;
    category: (typeof Categories)[keyof typeof Categories];
}

export const categoryState = atom<string[]>({
    key: "category",
    default: [Categories.TO_DO],
});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === (category as any));
    },
});
