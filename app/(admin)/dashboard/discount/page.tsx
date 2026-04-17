/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";

// type Discount = {
//   id: string;
//   code: string;
//   percentage: number;
//   expiry: string;
// };

// export default function DiscountPage() {
//   const [discounts, setDiscounts] = useState<Discount[]>([]);
//   const [form, setForm] = useState({
//     code: "",
//     percentage: "",
//     expiry: "",
//   });

//   // ✅ Create
//   const handleCreate = () => {
//     if (!form.code || !form.percentage || !form.expiry) return;

//     const newDiscount: Discount = {
//       id: uuidv4(),
//       code: form.code,
//       percentage: Number(form.percentage),
//       expiry: form.expiry,
//     };

//     setDiscounts((prev) => [newDiscount, ...prev]);

//     // reset form
//     setForm({ code: "", percentage: "", expiry: "" });
//   };

//   // ✅ Delete
//   const handleDelete = (id: string) => {
//     setDiscounts((prev) => prev.filter((d) => d.id !== id));
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">Discount Management</h1>

//       {/* 🧾 Create Form */}
//       <div className="border p-4 rounded space-y-3">
//         <h2 className="font-semibold">Create Discount</h2>

//         <input
//           type="text"
//           placeholder="Code (e.g. SAVE20)"
//           className="border p-2 w-full rounded"
//           value={form.code}
//           onChange={(e) => setForm({ ...form, code: e.target.value })}
//         />

//         <input
//           type="number"
//           placeholder="Percentage"
//           className="border p-2 w-full rounded"
//           value={form.percentage}
//           onChange={(e) => setForm({ ...form, percentage: e.target.value })}
//         />

//         <input
//           type="date"
//           className="border p-2 w-full rounded"
//           value={form.expiry}
//           onChange={(e) => setForm({ ...form, expiry: e.target.value })}
//         />

//         <button
//           onClick={handleCreate}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Create Discount
//         </button>
//       </div>

//       {/* 📋 List */}
//       <div className="border rounded">
//         <h2 className="p-3 font-semibold border-b">All Discounts</h2>

//         {discounts.length === 0 ? (
//           <div className="p-4 text-gray-500 text-sm text-center">
//             No discounts created yet
//           </div>
//         ) : (
//           discounts.map((d) => (
//             <div
//               key={d.id}
//               className="p-3 border-b flex justify-between items-center"
//             >
//               <div>
//                 <div className="font-medium">
//                   {d.code} - {d.percentage}%
//                 </div>
//                 <div className="text-xs text-gray-500">Expires: {d.expiry}</div>
//               </div>

//               <button
//                 onClick={() => handleDelete(d.id)}
//                 className="text-red-500 text-sm hover:underline"
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function DiscountPage() {
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [form, setForm] = useState({
    code: "",
    percentage: "",
    expiry: "",
  });

  // ✅ Fetch
  const fetchDiscounts = async () => {
    const res = await fetch("/api/discount");
    const data = await res.json();
    setDiscounts(data);
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  // ✅ Create
  const handleCreate = async () => {
    if (!form.code || !form.percentage || !form.expiry) return;

    await fetch("/api/discount", {
      method: "POST",
      body: JSON.stringify({
        code: form.code,
        percentage: Number(form.percentage),
        expiry: form.expiry,
      }),
    });

    setForm({ code: "", percentage: "", expiry: "" });
    fetchDiscounts();
  };

  // ✅ Delete
  const handleDelete = async (id: string) => {
    await fetch("/api/discount", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    fetchDiscounts();
  };

  return (
    // <div className="p-6 max-w-3xl mx-auto space-y-6">
    //   <h1 className="text-2xl font-bold">Discount Management</h1>

    //   {/* Create */}
    //   <div className="border p-4 rounded space-y-3">
    //     <input
    //       type="text"
    //       placeholder="Code"
    //       className="border p-2 w-full"
    //       value={form.code}
    //       onChange={(e) => setForm({ ...form, code: e.target.value })}
    //     />

    //     <input
    //       type="number"
    //       placeholder="Percentage"
    //       className="border p-2 w-full"
    //       value={form.percentage}
    //       onChange={(e) => setForm({ ...form, percentage: e.target.value })}
    //     />

    //     <input
    //       type="date"
    //       className="border p-2 w-full"
    //       value={form.expiry}
    //       onChange={(e) => setForm({ ...form, expiry: e.target.value })}
    //     />

    //     <button
    //       onClick={handleCreate}
    //       className="bg-blue-500 text-white px-4 py-2"
    //     >
    //       Create
    //     </button>
    //   </div>

    //   {/* List */}
    //   <div className="border rounded">
    //     {discounts.length === 0 ? (
    //       <div className="p-4 text-center text-gray-500">No discounts yet</div>
    //     ) : (
    //       discounts.map((d) => (
    //         <div key={d.id} className="p-3 border-b flex justify-between">
    //           <div>
    //             {d.code} - {d.percentage}%
    //             <div className="text-xs text-gray-500">{d.expiry}</div>
    //           </div>

    //           <button
    //             onClick={() => handleDelete(d.id)}
    //             className="text-red-500"
    //           >
    //             Delete
    //           </button>
    //         </div>
    //       ))
    //     )}
    //   </div>
    // </div>
    <>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Discount Management</h1>
          <p className="text-sm text-muted-foreground">
            Create and manage discount codes for bookings
          </p>
        </div>

        {/* Create Discount */}
        <Card>
          <CardHeader>
            <CardTitle>Create Discount</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {/* Code */}
              <div className="space-y-2">
                <Label>Code</Label>
                <Input
                  placeholder="SAVE20"
                  value={form.code}
                  onChange={(e) =>
                    setForm({ ...form, code: e.target.value.toUpperCase() })
                  }
                />
              </div>

              {/* Percentage */}
              <div className="space-y-2">
                <Label>Percentage</Label>
                <Input
                  type="number"
                  placeholder="20"
                  value={form.percentage}
                  onChange={(e) =>
                    setForm({ ...form, percentage: e.target.value })
                  }
                />
              </div>

              {/* Expiry */}
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input
                  type="date"
                  value={form.expiry}
                  onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                />
              </div>
            </div>

            <Button onClick={handleCreate} className="w-full md:w-auto">
              Create Discount
            </Button>
          </CardContent>
        </Card>

        {/* Discount List */}
        <Card>
          <CardHeader>
            <CardTitle>All Discounts</CardTitle>
          </CardHeader>

          <CardContent>
            {discounts.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground py-6">
                No discounts created yet
              </div>
            ) : (
              <div className="divide-y">
                {discounts.map((d: any) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between py-3"
                  >
                    {/* Left */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{d.code}</span>
                        <Badge variant="secondary">{d.percentage}%</Badge>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Expires: {d.expiry}
                      </div>
                    </div>

                    {/* Right */}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(d.id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}