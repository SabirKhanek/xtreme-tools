// import { useFormik } from "formik";
// import { useState } from "react";
import { useAuth } from "../shared/contexts/auth";
import { toast } from "react-toastify";
import { useModal } from "../shared/contexts/modals";

export interface UpdateProfileProps {
  className?: string;
}
export function UpdateProfile({ className }: UpdateProfileProps) {
  const auth = useAuth();
  const modals = useModal();
  if (!auth.authDetails.isLoggedIn || !auth.authDetails.user) {
    toast.error("User not logged in");
    modals.handleCloseModal({ success: false, message: "not logged in" });
  }
//   const [isLoading, setIsLoading] = useState(false);
//   const formik = useFormik({
//     initialValues: {
//       first_name: auth.authDetails.user?.first_name || "",
//       last_name: auth.authDetails.user?.last_name || "",
//       new_password: "",
//       confirm_password: "",
//     },
//     onSubmit: (v) => {},
//   });
  return (
    <div
      className={`flex flex-col justify-center items-center gap-2 max-w-[450px] w-[100vw] px-5 ${className}`}
    >
      <h2 className="text-primary font-semib">Edit Profile</h2>
    </div>
  );
}
