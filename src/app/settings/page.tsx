import { user } from "@prisma/client";
import { getAuthUser } from "../shared/getAuthUser";
import prisma from "../shared/prisma";
import { UpdateAccountDetailsPage } from "./components/updateAccountDetails";
import { UserUpdateType } from "./components/userUpdate.type";
export default async function SettingsPage() {
  const payload = getAuthUser()!;
  async function updateUser(obj: UserUpdateType, uid: any, email: string) {
    "use server";
    try {
      await prisma.user.update({
        where: { uid, email },
        data: {
          first_name: obj.firstName,
          last_name: obj.lastName,
          website: obj.website,
          phoneNo: obj.phone,
          countryCode: obj.country,
        },
      });
      return { success: true, message: "success" };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  }

  const user = await prisma.user.findFirst({ where: { uid: payload.uid } });

  const userObj: UserUpdateType = {
    firstName: user?.first_name || payload.first_name,
    lastName: user?.last_name || payload.last_name,
    country: user?.countryCode || "",
    phone: user?.phoneNo || "",
    website: user?.website || "",
  };
  return (
    <UpdateAccountDetailsPage
      email={user?.email || payload.email}
      uid={user?.uid || payload.uid}
      userDetails={userObj}
      updateFunction={updateUser}
    ></UpdateAccountDetailsPage>
  );
}
