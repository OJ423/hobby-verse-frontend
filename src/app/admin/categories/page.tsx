"use client";

import CategoriesAddForm from "@/components/CategoriesAddForm";
import CategoryCard from "@/components/CategoriesCard";
import Layout from "@/components/Layout";
import { useAuth } from "@/components/UserContext";
import { Category } from "@/utils/customTypes";
import { getCategories } from "@/utils/eventApiCalls";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [adminCheck, setAdminCheck] = useState<boolean>(false);
  const [apiErr, setApiErr] = useState<string | null>(null);
  const { token, setToken, setUser } = useAuth();


  

  useEffect(() => {
    // Admin Check
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const user = JSON.parse(localUser);
      if (user.role === "admin" || user.role === "staff") setAdminCheck(true);
    }
    // Get Categories
    const fetchData = async () => {
      try {
        const { categories } = await getCategories();
        setCategories(categories);
      } catch (err) {
        console.log("Something went wrong", err);
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setApiErr(
              "Your login token has expired. Please login to refresh your token to complete this action."
            );
            setUser(null);
            localStorage.removeItem("user");
            setToken(null);
            localStorage.removeItem("token");
          }
        } else {
          setApiErr("An unexpected error occurred. Please try again.");
        }
      }
    };
    fetchData();
  }, [token, setToken, setUser]);

  return (
    <Layout>
      {adminCheck ? (
        <section className="my-20 flex flex-col gap-4">
          <div className="flex items-center gap-4 justify-between items-center border-b-2 border-pink-200 pb-4 mb-4">
            <h1 className="font-bold text-3xl">Categories</h1>
          </div>
          {apiErr ? <p className="font-bold text-red-500">{apiErr}</p> : null}
          <p>
            Here are the event categories. Add new ones, or edit and delete
            existing categories.
          </p>
          <section className="grid gap-8 md:gap-16 grid-cols-1 md:grid-cols-3 mt-8">
            <div className="flex flex-wrap gap-4 md:col-span-2">
              {categories?.map((category) => (
                <CategoryCard key={category.id} category={category} setApiErr={setApiErr}/>
              ))}
            </div>
            <div>
              <CategoriesAddForm setApiErr={setApiErr} />
            </div>
          </section>
        </section>
      ) : (
        <p className="my-20">{`This page is for staff and admin. You shouldn't be here :)`}</p>
      )}
    </Layout>
  );
}
