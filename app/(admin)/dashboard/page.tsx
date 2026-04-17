
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"

import data from "./data.json"
import inquery from "./inquery.json"
import bookingData from "./booking-data.json"
import booking from "./booking.json"






// ✅ safest way (no timezone bugs)
function getTodayDate() {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
}

// ✅ get today's bookings
function getTodayBookings() {
  const today = getTodayDate();

  return bookingData.filter((item) => item.date === today);
}











export default function Page() {


 const todayBookings = getTodayBookings();

 console.log("Today:", getTodayDate());
 console.log("Today's Bookings:", todayBookings);


  return (
    
   
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable
                TableName="Today's Booking Table"
                data={todayBookings}
                columns={booking}
              />
              <DataTable
                TableName="Inquery Table"
                data={data}
                columns={inquery}
              />
            </div>
          </div>
        </div>
  );
}
