"use client"
import { useState } from "react";
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

  const handleSaveChanges = () => {
    setActiveTab("scholar");
  };

  const handleSubmit = () => {
    alert("Submitted!");
    // Add your submit logic here
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[500px] md:w-[600px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="wos">WOS</TabsTrigger>
          <TabsTrigger value="scholar">Google Scholar</TabsTrigger>
        </TabsList>
        <TabsContent value="wos">
          <Card style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
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
                  style={{ backgroundColor: 'var(--input-bg-color)', color: 'var(--text-color)' }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wos-id">Profile Link</Label>
                <Input
                  id="wos-id"
                  style={{ backgroundColor: 'var(--input-bg-color)', color: 'var(--text-color)' }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveChanges} style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-color)' }}>
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="scholar">
          <Card style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
            <CardHeader>
              <CardTitle>Google Scholar Account</CardTitle>
              <CardDescription>
                Enter your Google Scholar email and ID. Click submit when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scholar-email">Email</Label>
                <Input
                  id="scholar-email"
                  type="email"
                  style={{ backgroundColor: 'var(--input-bg-color)', color: 'var(--text-color)' }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scholar-id">Profile Link</Label>
                <Input
                  id="scholar-id"
                  style={{ backgroundColor: 'var(--input-bg-color)', color: 'var(--text-color)' }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-color)' }}>
                Submit
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}