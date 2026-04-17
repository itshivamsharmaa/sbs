/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */

// "use client";

// import { useEffect, useState } from "react";
// import { DataTable } from "@/components/D-table";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";

// const columns = [
//   { accessorKey: "name", header: "Name" },
//   { accessorKey: "price", header: "Price" },
//   { accessorKey: "duration", header: "Duration" },
//   { accessorKey: "category", header: "Category" },
//   { accessorKey: "subCategory", header: "Sub Category" },
// ];

// export default function ServicePage() {
//   const [services, setServices] = useState<any[]>([]);
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     duration: "",
//     category: "",
//     subCategory: "",
//   });

//   // ✅ Fetch
//   const fetchServices = async () => {
//     const res = await fetch("/api/service");
//     const data = await res.json();
//     setServices(data);
//   };

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   // ✅ Create
//   const handleCreate = async () => {
//     if (
//       !form.name ||
//       !form.price ||
//       !form.duration ||
//       !form.category ||
//       !form.subCategory
//     )
//       return;

//     await fetch("/api/service", {
//       method: "POST",
//       body: JSON.stringify({
//         ...form,
//         price: Number(form.price),
//         duration: Number(form.duration),
//       }),
//     });

//     setForm({
//       name: "",
//       price: "",
//       duration: "",
//       category: "",
//       subCategory: "",
//     });

//     fetchServices();
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-semibold">Services</h1>
//         <p className="text-sm text-muted-foreground">
//           Manage all salon services
//         </p>
//       </div>

//       {/* Create Form */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Add Service</CardTitle>
//         </CardHeader>

//         <CardContent className="grid md:grid-cols-3 gap-4">
//           <div className="space-y-2">
//             <Label>Name</Label>
//             <Input
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Price</Label>
//             <Input
//               type="number"
//               value={form.price}
//               onChange={(e) => setForm({ ...form, price: e.target.value })}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Duration (min)</Label>
//             <Input
//               type="number"
//               value={form.duration}
//               onChange={(e) => setForm({ ...form, duration: e.target.value })}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Category</Label>
//             <Input
//               value={form.category}
//               onChange={(e) => setForm({ ...form, category: e.target.value })}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Sub Category</Label>
//             <Input
//               value={form.subCategory}
//               onChange={(e) =>
//                 setForm({ ...form, subCategory: e.target.value })
//               }
//             />
//           </div>

//           <div className="flex items-end">
//             <Button onClick={handleCreate} className="w-full">
//               Add Service
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Data Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>All Services</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <DataTable
//             TableName="Service Table"
//             data={services}
//             columns={columns}
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/components/D-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// ✅ Columns
const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "price", header: "Price" },
  { accessorKey: "duration", header: "Duration" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "subCategory", header: "Sub Category" }
];

export default function ServicePage() {
  const [services, setServices] = useState<any[]>([]);

  // ✅ form
  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "",
    category: "",
    subCategory: "",
  });

  // ✅ filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  // ✅ fetch
  const fetchServices = async () => {
    const res = await fetch("/api/service");
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ✅ create
  const handleCreate = async () => {
    if (
      !form.name ||
      !form.price ||
      !form.duration ||
      !form.category ||
      !form.subCategory
    )
      return;

    await fetch("/api/service", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        duration: Number(form.duration),
      }),
    });

    setForm({
      name: "",
      price: "",
      duration: "",
      category: "",
      subCategory: "",
    });

    fetchServices();
  };

  // ✅ delete
  const handleDelete = async (id: string) => {
    await fetch("/api/service", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    fetchServices();
  };

  // ✅ filtering
  const filteredData = useMemo(() => {
    return services.filter((item: any) => {
      const matchesSearch = item.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = category ? item.category === category : true;

      const matchesSubCategory = subCategory
        ? item.subCategory === subCategory
        : true;

      return matchesSearch && matchesCategory && matchesSubCategory;
    });
  }, [services, search, category, subCategory]);

  // ✅ dropdown values
  const categories = [...new Set(services.map((s: any) => s.category))];

  const subCategories = [
    ...new Set(
      services
        .filter((s: any) => (category ? s.category === category : true))
        .map((s: any) => s.subCategory),
    ),
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Services</h1>
        <p className="text-sm text-muted-foreground">
          Manage all salon services
        </p>
      </div>

      {/* Create */}
      <Card>
        <CardHeader>
          <CardTitle>Add Service</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Duration (min)</Label>
            <Input
              type="number"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Sub Category</Label>
            <Input
              value={form.subCategory}
              onChange={(e) =>
                setForm({ ...form, subCategory: e.target.value })
              }
            />
          </div>

          <div className="flex items-end">
            <Button onClick={handleCreate} className="w-full">
              Add Service
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>

        <CardContent className="flex gap-3 flex-wrap">
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-60"
          />

          <select
            className="border rounded px-3 py-2"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubCategory(""); // reset child filter
            }}
          >
            <option value="">All Categories</option>
            {categories.map((c: string) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-3 py-2"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="">All Sub Categories</option>
            {subCategories.map((sc: string) => (
              <option key={sc} value={sc}>
                {sc}
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setCategory("");
              setSubCategory("");
            }}
          >
            Reset
          </Button>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Services</CardTitle>
        </CardHeader>

        <CardContent>
          <DataTable
            TableName="Service Table"
            data={filteredData}
            columns={columns}
          />
        </CardContent>
      </Card>
    </div>
  );
}