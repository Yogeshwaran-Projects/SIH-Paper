import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";

export function Rank() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Publication Metrics</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="font-medium">Main Author</div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="px-2 py-1 rounded-md text-sm font-medium bg-primary text-primary-foreground cursor-pointer">
                  Q1
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Top 20% Ranking</AlertDialogTitle>
                  <AlertDialogDescription>
                    This author is ranked in the top 20% of their field.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="text-muted-foreground text-sm">45 published papers</div>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="font-medium">Secondary Author</div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div
                  className={`px-2 py-1 rounded-md text-sm font-medium cursor-pointer ${
                    23 >= 20
                      ? "bg-primary text-primary-foreground"
                      : 23 >= 10
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {23 >= 20 ? "Q1" : 23 >= 10 ? "Q2" : "Q3"}
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Author Ranking</AlertDialogTitle>
                  <AlertDialogDescription>
                    This author is ranked in the top {23 >= 20 ? "20%" : 23 >= 10 ? "50%" : "bottom 50%"} of their field.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="text-muted-foreground text-sm">23 published papers</div>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="font-medium">Other Authors</div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div
                  className={`px-2 py-1 rounded-md text-sm font-medium cursor-pointer ${
                    12 >= 20
                      ? "bg-primary text-primary-foreground"
                      : 12 >= 10
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {12 >= 20 ? "Q1" : 12 >= 10 ? "Q2" : "Q3"}
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Author Ranking</AlertDialogTitle>
                  <AlertDialogDescription>
                    This author is ranked in the top {12 >= 20 ? "20%" : 12 >= 10 ? "50%" : "bottom 50%"} of their field.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="text-muted-foreground text-sm">12 published papers</div>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}