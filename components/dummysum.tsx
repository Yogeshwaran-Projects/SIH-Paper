"use client";
import { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChartContainer } from "@/components/ui/chart";
import { AreaChart, CartesianGrid, XAxis, Area, YAxis, Tooltip } from "recharts";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Rank } from "./rank";
import { Usernamespaper } from "./usernamespaper";
import { SignOutButton } from "@clerk/nextjs";
import { ArrowRight, LogOut, Power } from 'lucide-react'; 
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { SVGProps } from 'react';
import { ModeToggle } from "@/app/components/themetoggle";

// GlobeIcon Component
function GlobeIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

// MailIcon Component
function MailIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M4 4h16v16H4z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

interface Publication {
  name: string;
  papers: number;
  topics: string[];
  title: string; // Added title property
}

export function Dummysum() {
  const { userData } = useUserContext();
  const [role, setRole] = useState<string>("");
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [confidenceLevel, setConfidenceLevel] = useState<number>(0);
  const [relevantPapers, setRelevantPapers] = useState<Publication[]>([]);

  const publications: Publication[] = [
    { name: "2018", papers: 25, topics: ["Cloud Computing", "AI"], title: "Advancements in Cloud Computing and AI" },
    { name: "2019", papers: 30, topics: ["AI", "Machine Learning"], title: "AI and Machine Learning Trends" },
    { name: "2020", papers: 40, topics: ["Image Recognition", "Deep Learning"], title: "Breakthroughs in Image Recognition and Deep Learning" },
    { name: "2021", papers: 35, topics: ["NLP", "AI"], title: "Natural Language Processing and AI Innovations" },
    { name: "2022", papers: 45, topics: ["Machine Learning", "AI"], title: "The Evolution of Machine Learning and AI" },
    { name: "2023", papers: 50, topics: ["AI", "Cloud Computing"], title: "AI and Cloud Computing Integration" },
    { name: "2024", papers: 42, topics: ["Machine Learning", "Deep Learning"], title: "Future Directions in Machine Learning and Deep Learning" },
  ];

  

  const handleAnalyze = () => {
    setLoading(true);
    setConfidenceLevel(Math.floor(Math.random() * 21) + 80); // Confidence level between 80% to 100%

    setTimeout(() => {
      const topicCount: { [key: string]: number } = {};
      let relevantPapersCount = 0;
      let matchedPapers: Publication[] = [];

      publications.forEach((year) => {
        year.topics.forEach((topic) => {
          if (!topicCount[topic]) {
            topicCount[topic] = 0;
          }
          topicCount[topic] += 1;

          if (topic.toLowerCase().includes(role.toLowerCase())) {
            relevantPapersCount += 1;
            if (matchedPapers.length < 4) { // Limit to 4 papers
              matchedPapers.push(year);
            }
          }
        });
      });

      const sortedTopics = Object.entries(topicCount).sort((a, b) => b[1] - a[1]);

      let recommendation = "";

      if (relevantPapersCount > 0) {
        recommendation = `Our AI, after thoroughly analyzing ${publications.length} publications, identifies that ${userData.name} has a considerable focus on ${role}. With ${relevantPapersCount} papers directly relating to this domain, her research not only aligns with but also significantly contributes to the current discourse in this field. This pattern suggests a deep and sustained engagement with topics central to ${role}.`;
      } else {
        recommendation = `The AI analysis reveals that ${userData.name} does not appear to have published papers explicitly related to ${role}. However, the AI identified a substantial focus on other areas such as `;
        sortedTopics.forEach(([topic], index) => {
          recommendation += `${topic}${index < sortedTopics.length - 1 ? ", " : "."}`;
        });
        recommendation += ` These areas reflect her wide-ranging expertise and indicate her contributions to broader academic discussions.`;
      }

      const closingStatement = `This conclusion is based on an algorithmically driven, cross-referenced analysis, carried out with a confidence level of ${confidenceLevel}%. The AI is continuously learning and adapting, ensuring that its insights are aligned with the most recent data trends.`;

      setAnalysis(`${recommendation} ${closingStatement}`);
      setRelevantPapers(matchedPapers); // Update state with matched papers
      setLoading(false);
    }, 3000);
  };

  return (
    <>
    <ModeToggle />
    <div className="w-full max-w-7xl mx-auto py-16 px-8 md:px-12">
       <div className="flex justify-end mb-4">
      <SignOutButton>
        <Button variant="outline">
          <ArrowRight  className="mr-2" /> {/* Add icon before the text */}
          Sign Out
        </Button>
      </SignOutButton>
    </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-6 mb-8">
            <div className="flex-shrink-0 w-40 h-40 rounded-full bg-muted flex items-center justify-center text-7xl">
              🧑‍💻
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold">{userData.name}</h1>
              <p className="text-muted-foreground text-lg mt-2">
                {userData.profession}
              </p>
              <div className="flex items-center gap-4 text-base text-muted-foreground mt-4">
                <MailIcon className="w-5 h-5" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center gap-4 text-base text-muted-foreground mt-2">
                <GlobeIcon className="w-5 h-5" />
                <span>{userData.website}</span>
              </div>
            </div>
          </div>
          <div className="space-y-12">
            <div className="relative">
              <h2 className="text-xl font-semibold mb-6">About</h2>
              <p className="text-muted-foreground text-lg">
                {userData.about}
                {/* Dr. Jane Doe is at the forefront of innovative research in artificial intelligence and machine learning. Her work delves into the transformative potential of these technologies across various domains, including natural language processing and image recognition. With a deep-rooted passion for exploring the capabilities of AI, Dr. Doe’s research not only addresses complex technical challenges but also paves the way for practical applications that could revolutionize multiple industries. Her recent projects have focused on integrating AI with cloud computing to enhance data processing and accessibility, reflecting her commitment to advancing the field and contributing to groundbreaking discoveries. */}
              </p>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-6">Published Papers</h2>
                <div className="grid gap-6">
                  {publications.slice(0, 4).map((paper, index) => (
                    <Card
                      key={index}
                      className="w-[43rem] hover:shadow-xl transition-shadow duration-300"
                    >
                      <CardHeader>
                        <CardTitle>
                          <Link
                            href="#"
                            className="hover:underline"
                            prefetch={false}
                          >
                            {paper.title}
                          </Link>
                        </CardTitle>
                        <CardDescription>
                          Published in {paper.name}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          This paper explores topics such as{" "}
                          {paper.topics.join(", ")}.
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline">View Paper</Button>
                        <Button variant="ghost">Save</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-6">
                  Publication Activity
                </h2>
                <div className="mt-8">
                  <ChartContainer
                    config={{
                      papers: { label: "Papers", color: "hsl(var(--chart-1))" },
                    }}
                    className="min-h-[400px]"
                  >
                    <AreaChart
                      width={700} // Adjust width as needed
                      height={500} // Adjust height as needed
                      data={publications.map(({ name, papers }) => ({
                        name,
                        papers,
                      }))}
                      margin={{ top: 10, right: 50, left: 30, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="papers"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/4 flex flex-col gap-8">
          <div className=" w-80 relative">
            <Rank />
          </div>
          <div className="w-80">
            <Usernamespaper />
          </div>
        </div>
      </div>

      <div className="mt-16 space-y-4">
        <h2 className="text-xl font-semibold">
          What role are you looking for?
        </h2>
        <Input
          type="text"
          placeholder="Enter the role name..."
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleAnalyze}
            variant="ghost"
            className="px-4 py-2 text-white rounded"
          >
            Analyze
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="px-4 py-2">
                Purpose of This?
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Purpose of This?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will analyze the data for the specified role. It
                  provides insights and relevant papers related to the role to
                  help you make informed decisions.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {loading && (
          <motion.div
            className="mt-4 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Analyzing data, please wait...
          </motion.div>
        )}

        {analysis && !loading && (
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Analysis Result</CardTitle>
              <CardDescription className="text-lg font-medium">
                {analysis}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {relevantPapers.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Sample Papers:</h3>
                  <ul className="list-disc ml-6 text-base">
                    {relevantPapers.slice(0, 4).map((paper, index) => (
                      <li key={index} className="text-lg text-gray-700 mb-2">
                        {paper.title} - {paper.papers} papers on topics:{" "}
                        {paper.topics.join(", ")}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">More Info</Button>
              <Button variant="ghost">Save Result</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
    </>
  );
}
