import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
    toDo: string;
    category: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const categories = useRecoilValue(categoryState);
    const { register, handleSubmit, setValue } = useForm<IForm>();

    const handleValid = ({ toDo, category }: IForm) => {
        setToDos((oldToDos) => [
            ...oldToDos,
            { text: toDo, id: Date.now(), category },
        ]);
        setValue("toDo", "");
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handleValid)}>
                <input
                    {...register("toDo", { required: "Please write a To Do" })}
                    placeholder="Write a to do"
                />
                <select {...register("category", { required: true })}>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default CreateToDo;
