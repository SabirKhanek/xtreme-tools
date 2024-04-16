"use client";
import { DummyModal } from "../../modals/dummy";
import { UpdateProfile } from "../../modals/updateProfile";

export const modalRoutes = [
  { title: "Dummy modal", route: "dummy", modal: <DummyModal /> },
  {
    title: "Update Profile",
    route: "update_profile",
    modal: <UpdateProfile />,
  },
] as const;

type ModalRoute = (typeof modalRoutes)[number];
export type PossibleModal = ModalRoute["route"];
