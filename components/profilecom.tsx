"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";


export function Profilecom() {
  const params = useParams(); // Access the params using useParams
  const userId = params.userId;
  const username = "SIH TEAM"; // Replace with actual username

  const router = useRouter ();
  function handleSearch(){
    router.push(`/search`);
  }

  return (
    <div className="relative min-h-screen min-w-full py-12 px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_300px_300px] gap-8">
      {/* Main Profile Section */}
      <div>
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{username}</h1>
            <p className="text-muted-foreground">
              Professor of Computer Science, Acme University
            </p>
          </div>
          {/* Sheet Trigger Button near Profile Name */}
         
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="primary">Unique ID</Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>User Profile</SheetTitle>
                <SheetDescription>
                  View and edit your profile information here.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" value={username} readOnly className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="userId" className="text-right">
                    User ID
                  </Label>
                  <Input
                    id="userId"
                    value={userId as string} // Convert userId to a string
                    readOnly
                    className="col-span-3"
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="ghost">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <Button>
            <Search onClick={handleSearch}/>
          </Button>
        </div>
        
        <div className="space-y-6">
          <div className="grid gap-4 animate-fade-in-up">
            {/* Paper Cards */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Efficient Algorithms for Solving NP-Complete Problems
                  </Link>
                </CardTitle>
                <CardDescription>
                  Published in Journal of Algorithms, 2018
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This paper explores various algorithms designed to solve NP-Complete problems more efficiently...
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View Paper</Button>
                <Button variant="ghost">Save</Button>
              </CardFooter>
            </Card>
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Efficient Algorithms for Solving NP-Complete Problems
                  </Link>
                </CardTitle>
                <CardDescription>
                  Published in Journal of Algorithms, 2018
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This paper explores various algorithms designed to solve NP-Complete problems more efficiently...
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View Paper</Button>
                <Button variant="ghost">Save</Button>
              </CardFooter>
            </Card>
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Efficient Algorithms for Solving NP-Complete Problems
                  </Link>
                </CardTitle>
                <CardDescription>
                  Published in Journal of Algorithms, 2018
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This paper explores various algorithms designed to solve NP-Complete problems more efficiently...
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View Paper</Button>
                <Button variant="ghost">Save</Button>
              </CardFooter>
            </Card>
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Efficient Algorithms for Solving NP-Complete Problems
                  </Link>
                </CardTitle>
                <CardDescription>
                  Published in Journal of Algorithms, 2018
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This paper explores various algorithms designed to solve NP-Complete problems more efficiently...
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View Paper</Button>
                <Button variant="ghost">Save</Button>
              </CardFooter>
            </Card>
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Efficient Algorithms for Solving NP-Complete Problems
                  </Link>
                </CardTitle>
                <CardDescription>
                  Published in Journal of Algorithms, 2018
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This paper explores various algorithms designed to solve NP-Complete problems more efficiently...
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View Paper</Button>
                <Button variant="ghost">Save</Button>
              </CardFooter>
            </Card>
            {/* Add more cards as needed */}
          </div>
        </div>
      </div>

      {/* Publications Box */}
      <div className="border border-border p-6 rounded-lg animate-fade-in-left shadow-lg">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Publications</h2>
            <span className="text-muted-foreground">45</span>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Citations</h2>
            <span className="text-muted-foreground">2,345</span>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">H-Index</h2>
            <span className="text-muted-foreground">27</span>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Read Later</h2>
            <span className="text-muted-foreground">12</span>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Suggestions</h2>
            <span className="text-muted-foreground">8</span>
          </div>
        </div>
      </div>

      {/* Related Topics Box */}
      <div className="border border-border p-6 rounded-lg animate-fade-in-left shadow-lg">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Related Topics</h2>
          </div>
          <div className="grid gap-2">
            <Link
              href="#"
              className="border border-border px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              prefetch={false}
            >
              Algorithms
            </Link>
            <Link
              href="#"
              className="border border-border px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              prefetch={false}
            >
              Natural Language Processing
            </Link>
            <Link
              href="#"
              className="border border-border px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              prefetch={false}
            >
              Federated Learning
            </Link>
            <Link
              href="#"
              className="border border-border px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              prefetch={false}
            >
              Autonomous Driving
            </Link>
            <Link
              href="#"
              className="border border-border px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              prefetch={false}
            >
              Medical Imaging
            </Link>
            <Link
              href="#"
              className="border border-border px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              prefetch={false}
            >
              Blockchain
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}