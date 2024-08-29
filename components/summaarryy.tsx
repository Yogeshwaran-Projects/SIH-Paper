"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChartContainer } from "@/components/ui/chart";
import { AreaChart, CartesianGrid, XAxis, Area, YAxis, Tooltip } from "recharts";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TagIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Rank } from "./rank";

export function Summaarryy() {
  const [role, setRole] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [confidenceLevel, setConfidenceLevel] = useState(0);

  const publications = [
    { name: "2018", papers: 25, topics: ["Cloud Computing", "AI"] },
    { name: "2019", papers: 30, topics: ["AI", "Machine Learning"] },
    { name: "2020", papers: 40, topics: ["Image Recognition", "Deep Learning"] },
    { name: "2021", papers: 35, topics: ["NLP", "AI"] },
    { name: "2022", papers: 45, topics: ["Machine Learning", "AI"] },
    { name: "2023", papers: 50, topics: ["AI", "Cloud Computing"] },
    { name: "2024", papers: 42, topics: ["Machine Learning", "Deep Learning"] },
  ];

  const handleAnalyze = () => {
    setLoading(true);
    setConfidenceLevel(Math.floor(Math.random() * 21) + 80); // Confidence level between 80% to 100%
    
    setTimeout(() => {
      const topicCount: { [key: string]: number } = {}; 
      let relevantPapers = 0;

      publications.forEach((year) => {
        year.topics.forEach((topic) => {
          if (!topicCount[topic]) {
            topicCount[topic] = 0;
          }
          topicCount[topic] += 1;

          if (topic.toLowerCase().includes(role.toLowerCase())) {
            relevantPapers += 1;
          }
        });
      });

      const sortedTopics = Object.entries(topicCount).sort((a, b) => b[1] - a[1]);

      let recommendation = "";

      if (relevantPapers > 0) {
        recommendation = `Our AI analysis suggests that Dr. Jane Doe has published papers related to ${role}.`;
      } else {
        recommendation = `Dr. Jane Doe has not published any papers specifically related to ${role}. However, she has significant expertise in `;
        sortedTopics.forEach(([topic], index) => {
          recommendation += `${topic}${index < sortedTopics.length - 1 ? ", " : "."}`;
        });
      }

      setAnalysis(`${recommendation} (Confidence Level: ${confidenceLevel}%)`);
      setLoading(false);
    }, 3000); 
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-8 md:px-12">
      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        <div className="flex flex-col items-start gap-6">
          <div className="rounded-full bg-muted w-40 h-40 flex items-center justify-center text-7xl">
            🧑‍🏫
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Dr. Jane Doe</h1>
            <p className="text-muted-foreground text-lg">
              Computer Science Professor
            </p>
            <div className="flex items-center gap-2 text-base text-muted-foreground">
              <MailIcon className="w-5 h-5" />
              jane.doe@university.edu
            </div>
            <div className="flex items-center gap-2 text-base text-muted-foreground">
              <GlobeIcon className="w-5 h-5" />
              www.janedoe.com
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="relative flex justify-between items-start">
            <div className="w-3/4">
              <h2 className="text-xl font-semibold">About</h2>
              <p className="text-muted-foreground text-lg">
                Dr. Jane Doe is a renowned computer science professor with over
                15 years of experience in the field. Her research focuses on
                machine learning, natural language processing, and the
                application of AI in various domains. She has published numerous
                papers in prestigious journals and conferences, and her work has
                been widely cited.
              </p>
            </div>
          </div>
          <div
            className="absolute right-0 top-0 ml-auto w-1/4"
            style={{ right: '-20px' }} 
          >
            <Rank />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Published Papers</h2>
            <div className="grid gap-6">
              {/* {Papers ah enga join pani vidu} */}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Publication Activity</h2>
            <ChartContainer
              config={{
                papers: { label: "Papers", color: "hsl(var(--chart-1))" },
              }}
              className="min-h-[400px]"
            >
              <AreaChart
                width={700}
                height={500}
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
        <Button
          onClick={handleAnalyze}
          variant="ghost"
          className="px-4 py-2 text-white rounded"
        >
          Analyze
        </Button>

        {loading && (
          <motion.div
            className="mt-4 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Analyzing your data with our AI model...
            <div className="mt-2">
              <svg
                className="animate-spin h-5 w-5 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12a10 10 0 0010 10v-4a6 6 0 01-6-6H2z"
                ></path>
              </svg>
            </div>
          </motion.div>
        )}

        {analysis && !loading && (
          <motion.div
            className="mt-4 text-lg p-4 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-lg">
              <span className="text-green-500 font-bold">Analysis Result:</span>
              {analysis}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}




function GlobeIcon(props) {
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

function MailIcon(props) {
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
