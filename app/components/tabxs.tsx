"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function TabsDemo() {
  const [activeTab, setActiveTab] = useState("wos");
  const [wosEmail, setWosEmail] = useState("");
  const [wosProfileLink, setWosProfileLink] = useState("");
  const [googleScholarEmail, setGoogleScholarEmail] = useState("");
  const [googleScholarProfileLink, setGoogleScholarProfileLink] = useState("");
  const router = useRouter();

  // Handle Save Changes for WOS tab (Switch to Scholar tab if valid)
  const handleSaveChanges = () => {
    if (wosEmail && wosProfileLink) {
      setActiveTab("scholar");
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Handle form submission for Scholar tab
  const handleSubmit = async () => {
    if (googleScholarEmail && googleScholarProfileLink) {
      try {
        const response = await fetch("http://localhost:5003/api/saveUserData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wosEmail,
            wosProfileLink,
            googleScholarEmail,
            googleScholarProfileLink
          }),
        });

        const result = await response.json();
        if (result.success) {
          alert("Submitted!");
          // Redirect to user page displaying userId
          router.push(`/detail`); // Redirect to the new user ID page
        } else {
          alert("Failed to save user data");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-[500px] md:w-[600px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="wos">WOS</TabsTrigger>
          <TabsTrigger value="scholar">Google Scholar</TabsTrigger>
        </TabsList>

        {/* WOS Tab Content */}
        <TabsContent value="wos">
          <Card>
            <CardHeader>
              <CardTitle>WOS Account</CardTitle>
              <CardDescription>
                Enter your WOS email and ID. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wos-email">Email</Label>
                <Input
                  id="wos-email"
                  type="email"
                  value={wosEmail}
                  onChange={(e) => setWosEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wos-id">Profile Link</Label>
                <Input
                  id="wos-id"
                  value={wosProfileLink}
                  onChange={(e) => setWosProfileLink(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveChanges}>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Scholar Tab Content */}
        <TabsContent value="scholar">
          <Card>
            <CardHeader>
              <CardTitle>Google Scholar Account</CardTitle>
              <CardDescription>
                Enter your Google Scholar email and ID. Click submit when
                you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scholar-email">Email</Label>
                <Input
                  id="scholar-email"
                  type="email"
                  value={googleScholarEmail}
                  onChange={(e) => setGoogleScholarEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scholar-id">Profile Link</Label>
                <Input
                  id="scholar-id"
                  value={googleScholarProfileLink}
                  onChange={(e) => setGoogleScholarProfileLink(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit}>Submit</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}