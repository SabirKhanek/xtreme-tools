import { getAuthUser } from "@/app/shared/getAuthUser";
import prisma from "@/app/shared/prisma";
import { Prisma, $Enums } from "@prisma/client";
import { APIKeysContent } from "../components/api_keys_page";

export default async function API_KEYS_Page() {
  const auth_user = getAuthUser();
  const api_keys = await prisma.user_integrated_api_keys.findMany({
    where: { user_uid: auth_user?.uid },
  });

  const fields = Object.values($Enums.INTEGRATED_API_KEY_TYPE).map((v) => {
    return {
      k: v,
      label: v.charAt(0).toUpperCase() + v.substring(1),
      value: api_keys.find((val) => val.key_type === v)?.api_key || "",
    };
  });

  async function updateUserAPIs({
    api_value,
    api_type,
  }: {
    api_value: string;
    api_type: $Enums.INTEGRATED_API_KEY_TYPE;
  }) {
    "use server";

    let isValid = false;
    switch (api_type) {
      case "openai":
        isValid = await testOpenAIKeyValidity(api_value);
        break;
      case "claude":
        // TODO: add  claude validator
        isValid = true;
        break;
    }
    if (!api_value) {
      isValid = true;
      console.log("skippng valid test to delete the key");
    }
    if (!isValid) return { success: false, message: "API key is invalid" };
    try {
      await prisma.user_integrated_api_keys.upsert({
        where: {
          user_uid_key_type: {
            user_uid: auth_user!.uid!,
            key_type: api_type,
          },
        },
        update: {
          api_key: api_value,
          updatedAt: new Date(),
        },
        create: {
          user_uid: auth_user!.uid!,
          api_key: api_value,
          name: api_type.charAt(0).toUpperCase() + api_type.substring(1),
          key_type: api_type,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return { success: true, message: "updated" };
    } catch (err: any) {
      return { success: false, message: err.message || "unknown error" };
    }
  }

  return <APIKeysContent fields={fields} update={updateUserAPIs as any} />;
}

async function testOpenAIKeyValidity(apiKey: string): Promise<boolean> {
  const url = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  const body = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair.",
      },
      {
        role: "user",
        content:
          "Compose a poem that explains the concept of recursion in programming.",
      },
    ],
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    // Check if the response status is 200 (OK)
    if (response.status === 200) {
      return true;
    } else {
      // If the status is not 200, the key might be invalid
      console.error(`Error: Received status code ${response.status}`);
      return false;
    }
  } catch (error) {
    // If there's an error, log it and return false
    console.error("Error:", error);
    return false;
  }
}
