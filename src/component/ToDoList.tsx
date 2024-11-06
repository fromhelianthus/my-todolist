import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    Categories,
    categoryState,
    selectedCategoryState,
    toDoSelector,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [categories, setCategories] = useRecoilState(categoryState);
    const [selectedCategory, setSelectedCategory] = useRecoilState(
        selectedCategoryState
    );
    const [newCategory, setNewCategory] = useState("");

    // 컴포넌트가 처음 로드될 때 localStorage에서 사용자 카테고리를 불러오기
    useEffect(() => {
        const savedCategories = localStorage.getItem("userCategories");
        if (savedCategories) {
            setCategories((prev) => [...prev, ...JSON.parse(savedCategories)]);
        }
    }, [setCategories]);

    // 카테고리 선택 변경
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.currentTarget.value);
    };

    // 새로운 카테고리 추가 및 localStorage에 저장
    const handleNewCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            const updatedCategories = [...categories, newCategory];
            setCategories(updatedCategories);
            localStorage.setItem(
                "userCategories",
                JSON.stringify(updatedCategories)
            );
            setNewCategory("");
        }
    };

    return (
        <div>
            <h1>To Do List</h1>
            <hr />
            <select value={selectedCategory} onInput={onInput}>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <br />
            <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter a new category"
            />
            <button onClick={handleNewCategory}>Add Category</button>
            <CreateToDo />
            {toDos?.map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
            ))}
        </div>
    );
}

export default ToDoList;
