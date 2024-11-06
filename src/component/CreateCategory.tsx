// CreateCategory.tsx

import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Categories, categoryState } from "../atoms";

function CreateCategory() {
    const [newCategory, setNewCategory] = useState("");
    const [categories, setCategories] = useRecoilState<string[]>(categoryState);

    // 컴포넌트가 마운트될 때 로컬 스토리지에서 카테고리 불러오기
    useEffect(() => {
        const storedCategories = JSON.parse(
            localStorage.getItem("categories") || "[]"
        );

        // 기본 카테고리와 저장된 카테고리의 중복을 제거하고 상태 업데이트
        setCategories((prev) =>
            Array.from(new Set([...prev, ...storedCategories]))
        );
    }, [setCategories]);

    // 카테고리 추가 시 로컬 스토리지에 저장
    const handleAddCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            const updatedCategories = [...categories, newCategory];
            setCategories(updatedCategories);

            // 로컬 스토리지에 새로운 카테고리 목록 저장
            localStorage.setItem(
                "categories",
                JSON.stringify(updatedCategories)
            );
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
