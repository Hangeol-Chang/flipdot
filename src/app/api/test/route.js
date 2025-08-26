import { NextResponse } from "next/server";

export function GET(request) {
  return NextResponse.json([
    { id: 1, name: "a" },
    { id: 2, name: "b" },
  ]);
}
// 실행 됨.