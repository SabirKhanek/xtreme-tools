"use client";
import profile_avatar from "./avatar.svg";

import { AuthTokenPayload } from "@/app/shared/utils/jwt";
import { UserUpdateType } from "./userUpdate.type";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Select } from "@/app/components/input";
import { FaGlobe } from "react-icons/fa6";
import { Button } from "@/app/components/button";
import { useState } from "react";
import { toast } from "react-toastify";
import { countries } from "@/app/shared/utils/countries";
export function UpdateAccountDetailsPage({
  userDetails,
  uid,
  updateFunction,
  email,
}: {
  userDetails: UserUpdateType;
  updateFunction: (
    obj: UserUpdateType,
    uid: any,
    email: string
  ) => Promise<{ success: boolean; message: string }>;
  email: string;
  uid: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [cachedUserDetails, setCachedUserDetails] = useState(userDetails);
  const formik = useFormik({
    initialValues: { ...userDetails },
    onSubmit: async (v) => {
      if (isLoading) return;
      setIsLoading(true);
      try {
        const res = await updateFunction(v, uid, email);
        if (res.success === false) {
          toast.error(`Request failed: ${res.message}`);
        } else {
          setCachedUserDetails({
            firstName: v.firstName,
            lastName: v.lastName,
            phone: v.phone,
            website: v.website,
            country: v.country,
          });
          toast.success("Details updated!");
        }
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required().label("First Name").min(3),
      lastName: Yup.string().required().label("Last Name").min(3),
      phone: Yup.string().trim().label("Phone Number"),
      country: Yup.string().max(2).label("Country"),
      website: Yup.string().label("Website"),
    }),
  });
  console.log(profile_avatar);
  return (
    <div className="py-6">
      <h2 className="text-black/70 text-3xl font-bold">
        User <span className="text-primary">Profile</span>
      </h2>
      <div className="grid items-start mt-5  grid-cols-1 sm:grid-cols-[4fr_6fr] gap-10">
        <div className="p-7 rounded-lg shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] flex flex-col gap-3 justify-center items-center">
          <div>
            <div className="rounded-full flex justify-center items-center">
              <img
                className="object-cover rounded-full w-20 h-20"
                src={profile_avatar.src}
                alt=""
              />
            </div>
            <h3 className="text-black/70 font-semibold">
              {cachedUserDetails.firstName}{" "}
              <span className="text-primary">{cachedUserDetails.lastName}</span>
            </h3>
          </div>

          <div className=" flex-col flex gap-1 justif-center items-center">
            <span className="text-black/70 font-semibold text-sm">
              Mobile{" "}
              <span className="font-light">
                {cachedUserDetails.phone || "NA"}
              </span>
            </span>
            <span className="text-black/70 font-semibold text-sm">
              Email <span className="font-light">{email}</span>
            </span>
            <span className="text-black/70 font-semibold text-sm">
              Location{" "}
              <span className="font-light">
                {cachedUserDetails.country || "NA"}
              </span>
            </span>
          </div>
        </div>

        <form
          className="py-4 px-3 rounded-lg shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
          onSubmit={formik.handleSubmit}
        >
          <div className="w-full p-3 bg-[#E6B0D92E] mb-8 flex rounded-lg gap-2">
            <img src={profile_avatar.src} className="w-7 h-7" alt="" />
            <h3 className="uppercase font-semibold text-lg text-black/70">
              Personal <span className="text-primary">Info</span>
            </h3>
          </div>
          {/* Personal Details Fields */}
          <div className="my-3">
            <div className="flex my-3 items-start gap-4">
              <Input
                name="firstName"
                containerClass="flex-1"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                formikTouched={formik.setFieldTouched}
                isTouched={formik.touched.firstName}
                error={formik.errors.firstName}
              />
              <Input
                name="lastName"
                containerClass="flex-1"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                formikTouched={formik.setFieldTouched}
                isTouched={formik.touched.lastName}
                error={formik.errors.lastName}
              />
            </div>
            <div className="flex my-3 items-start gap-4">
              <Input
                name="phone"
                containerClass="flex-1"
                label="Mobile Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                formikTouched={formik.setFieldTouched}
                isTouched={formik.touched.phone}
                error={formik.errors.phone}
              />
              <Select
                options={countries.map((ck) => ({
                  label: `${ck.name}`,
                  value: ck.code,
                }))}
                name="country"
                containerClass="flex-1"
                label="Country"
                value={formik.values.country}
                onChange={formik.handleChange}
                formikTouched={formik.setFieldTouched}
                isTouched={formik.touched.country}
                error={formik.errors.country}
              />
            </div>
          </div>

          {/* Website Details */}
          <div className="w-full p-3 bg-[#E6B0D92E] my-8 flex items-center rounded-lg gap-2">
            <FaGlobe className=" text-black/70" />
            <h3 className="uppercase font-semibold text-lg text-black/70">
              Business <span className="text-primary">Info</span>
            </h3>
          </div>
          <div className="my-3">
            <Input
              name="website"
              placeholder="Enter website URL"
              containerClass="flex-1"
              label="Website"
              value={formik.values.website}
              onChange={formik.handleChange}
              formikTouched={formik.setFieldTouched}
              isTouched={formik.touched.website}
              error={formik.errors.website}
            />
          </div>

          <Button
            isLoading={isLoading}
            type="submit"
            disabled={isLoading}
            className="w-fit bg-primary mt-4"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
