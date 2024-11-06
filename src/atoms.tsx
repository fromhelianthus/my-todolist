// atoms.tsx

import { atom, selector } from "recoil";

// 기본 카테고리
export const Categories = {
    TO_DO: "TO_DO",
    DOING: "DOING",
    DONE: "DONE",
};

// ToDo 인터페이스 정의
export interface IToDo {
    text: string;
    id: number;
    category: (typeof Categories)[keyof typeof Categories];
}

// 모든 카테고리 상태 (로컬 스토리지에서 사용자 정의 카테고리 불러오기)
export const categoryState = atom<string[]>({
    key: "categoryState",
    default: Object.values(Categories),
});

// 선택된 카테고리 상태
export const selectedCategoryState = atom<string>({
    key: "selectedCategoryState",
    default: Categories.TO_DO,
});

// ToDo 상태
export const toDoState = atom<IToDo[]>({
    key: "toDoState",
    default: [],
});

// 선택된 카테고리별 ToDo 목록 필터링 selector
export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const selectedCategory = get(selectedCategoryState);
        return toDos.filter((toDo) => toDo.category === selectedCategory);
    },
});
