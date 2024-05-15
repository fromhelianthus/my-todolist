import React, { useState } from "react";

import { useForm } from "react-hook-form";

// function ToDoList() {

//   // 아래 코드는 react.js에서 폼 데이터를 전송하는 '따분한' 코드임.
//   // react hook form을 이용하면 아래 코드를 획기적으로 줄일 수 있음.
//   const [toDo, setToDo] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(toDo);
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

interface IForm {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = (data: IForm) => {
    console.log("add to do", data.toDo);
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
        <button>Add</button>
      </form>
    </div>
  );
}

// interface IForm {
//   id: string;
//   password: string;
//   passwordCheck: string;
//   firstName: string;
//   lastName?: string;
//   email: string;
//   address?: string;
//   extraError?: String;
// }

// function ToDoList() {
//   const { register, handleSubmit, formState: { errors }, setError } = useForm<IForm>({
//     defaultValues: {
//       email: "example@gmail.com",
//     }
//   });

//   const onValid = (data: IForm) => {
//     if(data.password !== data.passwordCheck) {
//       setError("passwordCheck", { message: "Password are not the same" }, { shouldFocus: true } );
//     }
//     // custon error
//     // setError("extraError", { message: "Server offline" } )
//   };

//   console.log(errors);

//   return (
//     <div>
//       <form style={{ display: "flex", flexDirection: "column", width: 200, gap: 10 }} onSubmit={handleSubmit(onValid)}>
//         {/* <input {...register("id")} required placeholder="id" /> */}
//         <input {...register("id", { required: "ID is required", validate: {noKim: (value) => value.includes("kim") ? "no 'kim' allowed" : true, noLee: (value) => value.includes("lee") ? "no 'lee' allowed" : true }})} placeholder="id" />
//         <span>{errors?.id?.message}</span>
//         <input {...register("password", { required: "Password is required", minLength: { value: 4, message: "Password must be at least 4 characters" } })} placeholder="password" />
//         <span>{errors?.password?.message}</span>
//         <input {...register("passwordCheck", { required: "Password check is required", minLength: { value: 4, message: "Password check must be at least 4 characters" } })} placeholder="passwordCheck" />
//         <span>{errors?.passwordCheck?.message}</span>
//         <input {...register("firstName", { required: "First name is required" })} placeholder="firstName" />
//         <span>{errors?.firstName?.message}</span>
//         <input {...register("lastName")} placeholder="lastName" />
//         <input {...register("email", { required: "Email is required", pattern: { value: /^[A-Za-z0-9._%+-]+@gmail.com$/, message: "Only gmail.com emails allowed" } })} placeholder="email" />
//         <span>{errors?.email?.message}</span>
//         <input {...register("address")} placeholder="address" />
//         <button type="submit">Add</button>
//         <span>{errors?.extraError?.message}</span>
//       </form>
//     </div>
//   );
// }

export default ToDoList;