import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// navigation components
import { UserNav } from "@/components/user-nav";
import { MainNav } from "@/components/main-nav";
import { CalendarDateRangePicker } from "@/components/date-range-picker";

// basic components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// high level components
import { Search } from "@/components/search";
import { TeamSwitcher } from "@/components/team-switcher";
import { RecentSales } from "@/components/recent-sales";
import { Transactions } from "@/components/transactions";
import { Stats } from "@/components/stats";
import { Overview } from "@/components/overview";

// Skeleton loaders
import { StatsLoader } from "@/components/stats-loader";
import { SwapLayoutLoader } from "@/components/swap-layout-loader";
import { OverviewLoader } from "@/components/overview-loader";
import { RecentSalesLoader } from "@/components/recent-sales-loader";
import { TransactionsLoader } from "@/components/transactions-loader";

// swap layout is a client side component, since it uses local storage for this demo.
// In production you might want to save the layout order on server via api call
const SwapLayout = dynamic(() => import("@/components/swap-layout"), {
  ssr: false,
  loading: () => <SwapLayoutLoader />,
});

// This is the main page of the app.
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-y-4">
      <div className="flex-col flex max-w-7xl w-full mx-auto">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2 flex-wrap">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>
          <SwapLayout
            defaultEditing={false}
            sections={initialSwapSections}
            sectionSlotClassNames={sectionSlotClassNames}
            className="w-full grid grid-cols-2 grid-rows-5 gap-8"
          />
        </div>
      </div>
    </main>
  );
}

// this is the initial layout of the swap layout.
const initialSwapSections = {
  top: (
    <Card className="flex-grow h-full">
      <CardHeader>
        <CardTitle>Stats</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <Suspense key={"stats"} fallback={<StatsLoader />}>
          <Stats />
        </Suspense>
      </CardContent>
    </Card>
  ),
  center_left: (
    <Card className="flex-grow h-full">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <Suspense key={"overview"} fallback={<OverviewLoader />}>
          <Overview />
        </Suspense>
      </CardContent>
    </Card>
  ),
  center_right: (
    <Card className="flex-grow h-full">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense key={"recent-sales"} fallback={<RecentSalesLoader />}>
          <RecentSales />
        </Suspense>
      </CardContent>
    </Card>
  ),
  bottom: (
    <Card className="flex-grow h-full">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Recent transactions from your store.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense key={"transactions"} fallback={<TransactionsLoader />}>
          <Transactions />
        </Suspense>
      </CardContent>
    </Card>
  ),
};

// this is the class names for the sections of the swap layout.
const sectionSlotClassNames = {
  "1": "col-span-2 row-span-1 h-full w-full flex flex-col",
  "2": "col-span-1 row-span-2 h-full w-full flex flex-col",
  "3": "col-span-1 row-span-2 h-full w-full flex flex-col",
  "4": "col-span-2 row-span-2 h-full w-full flex flex-col",
};
