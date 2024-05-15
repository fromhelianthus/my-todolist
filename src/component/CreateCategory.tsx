import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Categories, categoryState } from "../atoms";

function CreateCategory() {
    const [newCategory, setNewCategory] = useState("");
    const [categories, setCategories] = useRecoilState<string[]>(categoryState);

    const handleAddCategory = () => {
        if (newCategory && !Object.values(Categories).includes(newCategory)) {
            setCategories((prevCategories) => [...prevCategories, newCategory]);
            setNewCategory("");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={newCategory}
                onChange={handleChange}
                placeholder="New category"
            />
            <button onClick={handleAddCategory}>Add Category</button>
        </div>
    );
}

export default CreateCategory;
