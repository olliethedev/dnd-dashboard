import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function SwapLayoutLoader() {
  return (
    <div className="w-full grid grid-cols-2 grid-rows-5 gap-8">
      <Card className="col-span-2 row-span-1 h-full w-full flex flex-col">
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent className="flex-grow">
          <Skeleton className="h-full w-full" />
        </CardContent>
      </Card>
      <Card className="col-span-1 row-span-2 h-full w-full flex flex-col">
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
        </CardHeader>
        <CardContent className="flex-grow">
          <Skeleton className="h-full w-full" />
        </CardContent>
      </Card>
      <Card className="col-span-1 row-span-2 h-full w-full flex flex-col">
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-2/3 mt-2" />
        </CardHeader>
        <CardContent className="flex-grow">
          <Skeleton className="h-full w-full" />
        </CardContent>
      </Card>
      <Card className="col-span-2 row-span-2 h-full w-full flex flex-col">
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="flex-grow">
          <Skeleton className="h-full w-full" />
        </CardContent>
      </Card>
    </div>
  );
}