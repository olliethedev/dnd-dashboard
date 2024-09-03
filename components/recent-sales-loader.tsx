import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentSalesLoader() {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <Skeleton className="h-6 w-[150px] mb-2" />
        <Skeleton className="h-4 w-[200px]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="ml-4 space-y-1">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-3 w-[120px]" />
              </div>
              <Skeleton className="h-4 w-[80px] ml-auto" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}