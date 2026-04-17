/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app/api/discount/discount.json");

// 📥 Read file
function readData() {
  const json = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(json || "[]");
}

// 💾 Write file
function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ✅ GET (Read)
export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

// ✅ POST (Create)
export async function POST(req: Request) {
  const body = await req.json();
  const data = readData();

  const newDiscount = {
    id: Date.now().toString(),
    ...body,
  };

  data.unshift(newDiscount);
  writeData(data);

  return NextResponse.json(newDiscount);
}

// ❌ DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json();

  let data = readData();
  data = data.filter((d: any) => d.id !== id);

  writeData(data);

  return NextResponse.json({ success: true });
}
