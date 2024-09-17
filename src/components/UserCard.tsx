"use client";

import { useAuth } from "@/components/UserContext";
import { NewAdminUser, User } from "@/utils/customTypes";
import { patchAdminUser } from "@/utils/userApiCalls";
import { dateConverter } from "@/utils/dateConverter";
import StyledButton from "./StyledButton";
import { handleApiError } from "@/utils/apiErrors";

interface UserCardProps {
  user: User;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setApiErr: React.Dispatch<React.SetStateAction<string | null>>
}

const UserCard: React.FC<UserCardProps> =({user, setLoading, setApiErr}) => {
  const { setUser, setToken } = useAuth();
  const localToken = localStorage.getItem("token");


  const handleRemoveAdmin = async (email: string) => {
    try {
      const body = {
        email: email,
        role: "customer",
      };
      await patchAdminUser(localToken, body);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRoleChange = async (body: NewAdminUser) => {
    try {
      const data = await patchAdminUser(localToken, body);
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } catch (err) {
      handleApiError({
        err,
        setApiErr,
        setLoading,
        setUser,
        setToken,
      });
    }
  };


  return (
    <>
      
           <div
              className="flex flex-col gap-8 border-b-2 border-pink-200 cursor-pointer transition-all duration-500 hover:bg-pink-100 rounded py-8"
            >
              <div className="px-4 flex gap-8 items-center justify-between w-full flex-wrap">
                <div className="flex items-center w-full justify-between gap-8 flex-wrap">
                  <div>
                    <p className="text-xs uppercase text-gray-500 font-light">
                      Join date:
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                      {dateConverter(user.created_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-500 font-light">
                      User name:
                    </p>
                    <p className="font-bold">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-500 font-light">
                      User Email:
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                      {user.email}
                    </p>

                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-500 font-light">
                      User Role:
                    </p>
                    <p className="font-bold">{user.role}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-4 col-span-2 px-4">
                <p className="text-sm font-bold">Change role</p>
                {user.role === "admin" ? (
                  <button
                    onClick={() => {
                      const body = { email: user.email, role: "staff" };
                      handleRoleChange(body);
                    }}
                    className="border-solid border-4 border-red-500 text-red-500 py-3 px-6 inline-block rounded-xl proper font-semibold hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-500 ease-out text-xs"
                  >
                    Admin
                  </button>
                ):
                user.role === "staff" ? (
                  <button
                    onClick={() => {
                      const body = { email: user.email, role: "admin" };
                      handleRoleChange(body);
                    }}
                    className="border-solid border-4 border-red-500 text-red-500 py-3 px-6 inline-block rounded-xl proper font-semibold hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-500 ease-out text-xs"
                  >
                    Staff
                  </button>
                ): null
                }
                <div onClick={() => handleRemoveAdmin(user.email)}>
                  <StyledButton src="" linkText="Remove" />
                </div>
              </div>
            </div>
    </>
  );
}

export default UserCard
