"use client";

import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";
import { $Enums } from "@prisma/client";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
interface Field {
  k: string;
  label: string;
  value: string;
}

interface APIKeysContentProps {
  fields: Field[];
  update: (params: {
    api_value: string;
    api_type: string;
  }) => Promise<{ success: boolean; message: string }>;
}

export function APIKeysContent({ fields, update }: APIKeysContentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [syncedState, setSyncedState] = useState<Record<string, string>>({});

  useEffect(() => {
    // Initialize synced state when fields change
    const initialSyncState = fields.reduce((acc, field) => {
      acc[field.k] = field.value;
      return acc;
    }, {} as Record<string, string>);
    setSyncedState(initialSyncState);
  }, [fields]);

  const initialValues = useMemo(() => {
    return fields.reduce((acc, field) => {
      acc[field.k] = field.value;
      return acc;
    }, {} as Record<string, string>);
  }, [fields]);

  const validationSchema = useMemo(() => {
    return Yup.object().shape(
      fields.reduce((acc, field) => {
        acc[field.k] = Yup.string();
        return acc;
      }, {} as Record<string, Yup.StringSchema>)
    );
  }, [fields]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const promises: Promise<any>[] = [];

      for (const field of fields) {
        if (values[field.k] !== syncedState[field.k]) {
          // Check if field value has changed from synced state
          promises.push(
            update({
              api_value: values[field.k],
              api_type: field.k,
            })
              .then((result) => {
                if (result.success) {
                  // Update synced state if update was successful
                  setSyncedState((prevState) => ({
                    ...prevState,
                    [field.k]: values[field.k],
                  }));
                  toast.success(`${field.label} was updated!`);
                } else {
                  console.error(result.message);
                  toast.error(
                    `Failed to update: ${field.label}, ${result.message}`
                  );
                }
              })
              .catch((error) => {
                console.error(error);
              })
          );
        }
      }

      try {
        await Promise.all(promises);
      } catch (error) {
        console.error("Error updating fields:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });
  return (
    <div className="py-6">
      <h2 className="text-black/70 text-3xl mb-5 font-bold">
        User <span className="text-primary">Integrated Keys</span>
      </h2>
      <form onSubmit={formik.handleSubmit}>
        {fields.map((field) => (
          <div key={field.k} style={{ marginBottom: "1rem" }}>
            <Input
              id={field.k}
              name={field.k}
              label={field.label}
              type="text"
              onChange={formik.handleChange}
              formikTouched={formik.handleBlur}
              isTouched={formik.touched[field.k]}
              error={formik.errors[field.k]}
              onBlur={formik.handleBlur}
              value={formik.values[field.k]}
            />
          </div>
        ))}
        <Button
          className="bg-primary"
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </form>
    </div>
  );
}
