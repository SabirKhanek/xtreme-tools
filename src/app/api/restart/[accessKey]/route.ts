import { NextRequest, NextResponse } from "next/server";

export function GET(
  request: NextRequest,
  context: { params: { accessKey: string } }
) {
  if (context.params.accessKey === process.env.ACCESS_KEY) {
    process.exit(1);
  } else {
    return NextResponse.json({ msg: "Access key is not correct" });
  }
}
