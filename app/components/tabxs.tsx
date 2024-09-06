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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircle } from 'lucide-react'; // Updated import
import { ModeToggle } from "./themetoggle";

export function TabsDemo() {
  const [activeTab, setActiveTab] = useState<string>("wos");
  const [wosEmail, setWosEmail] = useState<string>("");
  const [wosProfileLink, setWosProfileLink] = useState<string>("");
  const [googleScholarEmail, setGoogleScholarEmail] = useState<string>("");
  const [googleScholarProfileLink, setGoogleScholarProfileLink] = useState<string>("");
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const router = useRouter();

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle Save Changes for WOS tab (Switch to Scholar tab if valid)
  const handleSaveChanges = () => {
    if (wosEmail && wosProfileLink) {
      setActiveTab("scholar");
    } else {
      toast.error('Please fill in all fields in the WOS tab.');
    }
  };

  // Handle form submission for Scholar tab
  const handleSubmit = async () => {
    if (googleScholarEmail && googleScholarProfileLink) {
      if (!validateEmail(googleScholarEmail) || !validateEmail(wosEmail)) {
        toast.error('Please enter valid email addresses.');
        return;
      }

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
          toast.success('Submitted successfully! 🎉', {
            icon: <CheckCircle className="h-6 w-6 text-green-500" />,
            autoClose: 3000, // Duration in milliseconds
          });
          setIsRedirecting(true);
          setTimeout(() => {
            router.push(`/detail/${result.userId}`);
          }, 3000); // Redirect after 3 seconds to allow toast to be visible
        } else {
          toast.error('Failed to save user data');
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error('An error occurred while submitting the form');
      }
    } else {
      toast.error('Please fill in all fields in the Scholar tab.');
    }
  };

  return (
    <>

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
                Enter your WOS email and ID. Click save when you&apos;re done.
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
                you&apos;re done.
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
      <ToastContainer />
    </div>
    </>
  );
}
