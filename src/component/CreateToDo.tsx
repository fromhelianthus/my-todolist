import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();

    const handleValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => [
            ...oldToDos,
            { text: toDo, id: Date.now(), category: "TO_DO" }, // 기본 카테고리를 TO_DO로 설정
        ]);
        setValue("toDo", "");
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handleValid)}>
                <input
                    {...register("toDo", {
                        required: "Please write a To Do",
                    })}
                    placeholder="Write a to do"
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default CreateToDo;
