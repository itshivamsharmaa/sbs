"use server";
export const runtime = "nodejs";

import { getIO } from "@/lib/socket";

// type Booking = {
//   id: string;
//   name: string;
//   service: string;
//   date: string;
// };

// export async function createBooking(data: Booking) {
export async function createBooking() {
  // const booking = await db.booking.create({ data });
  let booking;

  try {
    const io = getIO();
    io.to("admin").emit("booking:created", booking);
  } catch (err) {
    console.error("Socket emit failed:", err);
  }

  // optional: telegram
  // await sendTelegram(`New booking from ${booking.name}`)

  return booking;
}
