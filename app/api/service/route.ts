/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app/api/service/service.json");

function readData() {
  return JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  return NextResponse.json(readData());
}

export async function POST(req: Request) {
  const body = await req.json();
  const data = readData();

  const newService = {
    id: Date.now().toString(),
    ...body,
  };

  data.unshift(newService);
  writeData(data);

  return NextResponse.json(newService);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  let data = readData();

  data = data.filter((s: any) => s.id !== id);
  writeData(data);

  return NextResponse.json({ success: true });
}
