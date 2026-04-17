/* eslint-disable @typescript-eslint/no-explicit-any */
// import { DataTable } from "@/components/data-table"
// import inquery from "../inquery.json"
// import data from "../data.json"

// function page() {
//   return (
//     <div>
//       <h1>Inquery Page</h1>
//       <p>This is the inquery page.</p>

//       <div>
//         <div>
//           <h2>Inquery List</h2>
//          <DataTable TableName="Inquery Table" data={data} columns={inquery} />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default page

"use client";

import { useState, useMemo } from "react";
import { DataTable } from "@/components/data-table";
import inquery from "../inquery.json";
import data from "../data.json";

export default function Page() {
  const [search, setSearch] = useState("");
  const [service, setService] = useState("");

  // ✅ filtering logic
  const filteredData = useMemo(() => {
    return data.filter((item: any) => {
      const matchesSearch =
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.contact?.toLowerCase().includes(search.toLowerCase());

      const matchesService = service ? item.service === service : true;


      return matchesSearch && matchesService;
    });
  }, [search, service]);

  // ✅ unique services for dropdown
  const services = [...new Set(data.map((d: any) => d.service))];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Inquery Page</h1>

      {/* 🔍 Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or contact"
          className="border px-3 py-2 rounded w-60"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Service Filter */}
        <select
          className="border px-3 py-2 rounded"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">All Services</option>
          {services.map((s: string) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

       

        {/* Reset */}
        <button
          onClick={() => {
            setSearch("");
            setService("");
          }}
          className="bg-gray-200 px-3 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {/* 📊 Table */}
      <DataTable
        TableName="Inquery Table"
        data={filteredData}
        columns={inquery}
      />
    </div>
  );
}