import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const [newCategory, setNewCategory] = useState("");

    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };

    const handleNewCategory = () => {
        if (newCategory && !Object.values(Categories).includes(newCategory)) {
            setCategory(newCategory as any);
            setNewCategory("");
        }
    };

    return (
        <div>
            <h1>To Do List</h1>
            <hr />
            <select value={category} onInput={onInput}>
                <option value={Categories.TO_DO}>To Do</option>
                <option value={Categories.DOING}>Doing</option>
                <option value={Categories.DONE}>Done</option>
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
