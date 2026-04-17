"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Bookings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            100
          </CardTitle>
          {/* <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon
              />
              +12.5%
            </Badge>
          </CardAction> */}
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total bookings this month
          </div>
          <div className="text-muted-foreground">Compared to last month</div>
          {/* <div className="line-clamp-1 flex gap-2 font-medium">
            12% more bookings this month
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Compared to last month</div> */}
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>New Bookings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            34
          </CardTitle>
          {/* <CardAction>
            <Badge variant="outline">
              <TrendingDownIcon
              />
              -20%
            </Badge>
          </CardAction> */}
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            New clients 
          </div>
          <div className="text-muted-foreground">
            Consider running offers or ads
          </div>
          {/* <div className="line-clamp-1 flex gap-2 font-medium">
            Slight drop in new clients <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Consider running offers or ads
          </div> */}
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Earning</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
          {/* <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon
              />
              +12.5%
            </Badge>
          </CardAction> */}
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Revenue growing steadily
          </div>
          <div className="text-muted-foreground">
            Driven by repeat customers
          </div>
          {/* <div className="line-clamp-1 flex gap-2 font-medium">
            Revenue growing steadily <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Driven by repeat customers
          </div> */}
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>New Inquery</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            10
          </CardTitle>
          {/* <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon
              />
              +4.5%
            </Badge>
          </CardAction> */}
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm bg-amber-100">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Leads coming in consistently 
          </div>
          <div className="text-muted-foreground">
            {" "}
            Follow up quickly to convert
          </div>
          {/* <div className="line-clamp-1 flex gap-2 font-medium">
            Leads coming in consistently <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {" "}
            Follow up quickly to convert
          </div> */}
        </CardFooter>
      </Card>
    </div>
  );
}
