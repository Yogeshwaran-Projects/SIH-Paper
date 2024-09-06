"use client";
import { useUserContext } from "@/context/UserContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, User } from "lucide-react";
import { toast } from "sonner";

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
import { useState } from "react";
import { ModeToggle } from "@/app/components/themetoggle";

export function Profilecom() {
  const { userData } = useUserContext();
  const params = useParams(); // Access the params using useParams
  const userId = params.userId;
  const username = "SIH TEAM";
 const router = useRouter();
  return (
    <>
    <ModeToggle />
    <div className="relative min-h-screen min-w-full py-12 px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_300px_300px] gap-8">
      {/* Main Profile Section */}
      <div>
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <div className="flex-shrink-0 w-20 h-20 rounded-full bg-muted flex items-center justify-center text-7xl">
            🧑‍💻
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <p className="text-muted-foreground">{userData.profession}</p>
          </div>
          {/* Sheet Trigger Button near Profile Name */}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"ghost"}>Unique ID</Button>
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
                  <Input
                    id="name"
                    value={userData.name}
                    readOnly
                    className="col-span-3"
                  />
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
          <Link href="/search">
            <Button variant="ghost">
              <Search />
            </Button>
          </Link>

          <Link href="/Summary">
            <Button variant="ghost">
              <User />
            </Button>
          </Link>
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
                  This paper explores various algorithms designed to solve
                  NP-Complete problems more efficiently...
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link
                  href="https://ieeexplore.ieee.org/abstract/document/9104098/"
                  target="_blank"
                  passHref
                >
                  <Button variant="outline">View Paper</Button>
                </Link>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    onClick={() =>
                      toast("Paper has been saved", {
                        description: "You have successfully saved the paper.",
                        action: {
                          label: "Undo",
                          onClick: () => console.log("Undo"),
                        },
                        style: {
                          fontSize: "18px", // Adjust size here
                          padding: "16px", // Adjust padding here
                        },
                      })
                    }
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      toast("Paper has been added to Read Later", {
                        description:
                          "You can find this paper in your Read Later list.",
                        action: {
                          label: "Undo",
                          onClick: () => console.log("Undo"),
                        },
                        style: {
                          fontSize: "18px", // Adjust size here
                          padding: "16px", // Adjust padding here
                        },
                      })
                    }
                  >
                    Read Later
                  </Button>
                </div>
              </CardFooter>
            </Card>
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Deep Learning Approaches for Image Recognition
                  </Link>
                </CardTitle>
                <CardDescription>
                  Published in International Journal of Computer Vision, 2019
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This paper discusses recent advances in deep learning
                  techniques for improved image recognition...
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link
                  href="https://ieeexplore.ieee.org/abstract/document/9104098/"
                  target="blank"
                  passHref
                >
                  <Button variant="outline">View Paper</Button>
                </Link>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    onClick={() =>
                      toast("Paper has been saved", {
                        description: "You have successfully saved the paper.",
                        action: {
                          label: "Undo",
                          onClick: () => console.log("Undo"),
                        },
                        style: {
                          fontSize: "18px", // Adjust size here
                          padding: "16px", // Adjust padding here
                        },
                      })
                    }
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      toast("Paper has been added to Read Later", {
                        description:
                          "You can find this paper in your Read Later list.",
                        action: {
                          label: "Undo",
                          onClick: () => console.log("Undo"),
                        },
                        style: {
                          fontSize: "18px", // Adjust size here
                          padding: "16px", // Adjust padding here
                        },
                      })
                    }
                  >
                    Read Later
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Blockchain Technology for Secure Transactions
                  </Link>
                </CardTitle>
                <CardDescription>
                  Published in IEEE Transactions on Blockchain, 2020
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  An overview of how blockchain technology can enhance the
                  security of digital transactions...
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link
                  href="https://ieeexplore.ieee.org/abstract/document/9104098/"
                  target="blank"
                  passHref
                >
                  <Button variant="outline">View Paper</Button>
                </Link>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    onClick={() =>
                      toast("Paper has been saved", {
                        description: "You have successfully saved the paper.",
                        action: {
                          label: "Undo",
                          onClick: () => console.log("Undo"),
                        },
                        style: {
                          fontSize: "18px", // Adjust size here
                          padding: "16px", // Adjust padding here
                        },
                      })
                    }
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      toast("Paper has been added to Read Later", {
                        description:
                          "You can find this paper in your Read Later list.",
                        action: {
                          label: "Undo",
                          onClick: () => console.log("Undo"),
                        },
                        style: {
                          fontSize: "18px", // Adjust size here
                          padding: "16px", // Adjust padding here
                        },
                      })
                    }
                  >
                    Read Later
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Natural Language Processing in Healthcare
                  </Link>
                </CardTitle>
                <CardDescription>
                  Published in Journal of Biomedical Informatics, 2021
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This study reviews the application of NLP techniques in
                  healthcare data analysis...
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link
                  href="https://ieeexplore.ieee.org/abstract/document/9104098/"
                  target="blank"
                  passHref
                >
                  <Button variant="outline">View Paper</Button>
                </Link>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    onClick={() =>
                      toast("Paper has been saved", {
                        description: "You have successfully saved the paper.",
                        action: {
                          label: "Undo",
                          onClick: () => console.log("Undo"),
                        },
                        style: {
                          fontSize: "18px", // Adjust size here
                          padding: "16px", // Adjust padding here
                        },
                      })
                    }
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      toast("Paper has been added to Read Later", {
                        description:
                          "You can find this paper in your Read Later list.",
                        action: {
                          label: "Undo",
                          onClick: () => console.log("Undo"),
                        },
                        style: {
                          fontSize: "18px", // Adjust size here
                          padding: "16px", // Adjust padding here
                        },
                      })
                    }
                  >
                    Read Later
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Advances in Federated Learning
                  </Link>
                </CardTitle>
                <CardDescription>
                  Published in IEEE Transactions on Machine Learning, 2022
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A comprehensive analysis of the latest advancements in
                  federated learning methodologies...
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link
                  href="https://ieeexplore.ieee.org/abstract/document/9104098/"
                  target="blank"
                  passHref
                >
                  <Button variant="outline">View Paper</Button>
                </Link>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    onClick={() =>
                      toast("Paper has been saved", {
                        description: "You have successfully saved the paper.",
                        action: {
                          label: "Undo",
                          onClick: () => console.log("Undo"),
                        },
                        style: {
                          fontSize: "18px", // Adjust size here
                          padding: "16px", // Adjust padding here
                        },
                      })
                    }
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      toast("Paper has been added to Read Later", {
                        description:
                          "You can find this paper in your Read Later list.",
                        action: {
                          label: "Undo",
                          onClick: () => console.log("Undo"),
                        },
                        style: {
                          fontSize: "18px", // Adjust size here
                          padding: "16px", // Adjust padding here
                        },
                      })
                    }
                  >
                    Read Later
                  </Button>
                </div>
              </CardFooter>
            </Card>
            {/* Add more cards as needed */}
          </div>
        </div>
      </div>

      <div className="border border-border p-6 rounded-lg animate-fade-in-left shadow-lg">
        <div className="space-y-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => router.push("/readlater")}
          >
            <h2 className="text-lg font-semibold">Read Later</h2>
            <span className="text-muted-foreground">45</span>
          </div>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => router.push("/published")}
          >
            <h2 className="text-lg font-semibold">Publications</h2>
            <span className="text-muted-foreground">12</span>
          </div>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => router.push("/hindex")}
          >
            <h2 className="text-lg font-semibold">H-Index</h2>
            <span className="text-muted-foreground">27</span>
          </div>
          
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Citations</h2>
            <span className="text-muted-foreground">1,232</span>
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
    </>
  );
}
