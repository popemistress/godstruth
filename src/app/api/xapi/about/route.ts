import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    version: ["1.0.3"],
    extensions: {
      "https://godstruth.net/xapi/extensions/platform": "GodsTruth Learning Platform",
    },
  });
}
