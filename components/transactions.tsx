import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

export async function Transactions() {
  // simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead className="hidden xl:table-column">Type</TableHead>
          <TableHead className="hidden xl:table-column">Status</TableHead>
          <TableHead className="hidden xl:table-column">Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <div className="font-medium">Liam Johnson</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              liam@example.com
            </div>
          </TableCell>
          <TableCell className="hidden xl:table-column">Sale</TableCell>
          <TableCell className="hidden xl:table-column">
            <Badge className="text-xs" variant="outline">
              Approved
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
            2023-06-23
          </TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Olivia Smith</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              olivia@example.com
            </div>
          </TableCell>
          <TableCell className="hidden xl:table-column">Refund</TableCell>
          <TableCell className="hidden xl:table-column">
            <Badge className="text-xs" variant="outline">
              Declined
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
            2023-06-24
          </TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Noah Williams</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              noah@example.com
            </div>
          </TableCell>
          <TableCell className="hidden xl:table-column">Subscription</TableCell>
          <TableCell className="hidden xl:table-column">
            <Badge className="text-xs" variant="outline">
              Approved
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
            2023-06-25
          </TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Emma Brown</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              emma@example.com
            </div>
          </TableCell>
          <TableCell className="hidden xl:table-column">Sale</TableCell>
          <TableCell className="hidden xl:table-column">
            <Badge className="text-xs" variant="outline">
              Approved
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
            2023-06-26
          </TableCell>
          <TableCell className="text-right">$450.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
