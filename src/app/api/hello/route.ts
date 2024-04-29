import { NextRequest, NextResponse } from "next/server";

export function GET(
  request: NextRequest,
  context: { params: { accessKey: string } }
) {
  return NextResponse.json({ msg: "Hello World" });
}
