"use client"
import Link from "next/link"
import { ChartContainer } from "@/components/ui/chart"
import { AreaChart, CartesianGrid, XAxis, Area, YAxis, Tooltip } from "recharts"

export function Summaarryy() {
  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-8 md:px-12">
      <div className="grid md:grid-cols-[300px_1fr] gap-12">
        <div className="flex flex-col items-center gap-6">
          <div className="rounded-full bg-muted w-40 h-40 flex items-center justify-center text-7xl">🧑‍🏫</div>
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Dr. Jane Doe</h1>
            <p className="text-muted-foreground text-lg">Computer Science Professor</p>
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
          <div>
            <h2 className="text-xl font-semibold">About</h2>
            <p className="text-muted-foreground text-lg">
              Dr. Jane Doe is a renowned computer science professor with over 15 years of experience in the field. Her
              research focuses on machine learning, natural language processing, and the application of AI in various
              domains. She has published numerous papers in prestigious journals and conferences, and her work has been
              widely cited.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Published Papers</h2>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <div className="font-medium text-lg">
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Efficient Algorithms for Solving the Traveling Salesman Problem
                  </Link>
                </div>
                <div className="text-base text-muted-foreground">Journal of Algorithms, 2021</div>
              </div>
              <div className="grid gap-2">
                <div className="font-medium text-lg">
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Deep Learning for Image Recognition: A Comparative Study
                  </Link>
                </div>
                <div className="text-base text-muted-foreground">
                  IEEE Transactions on Pattern Analysis and Machine Intelligence, 2020
                </div>
              </div>
              <div className="grid gap-2">
                <div className="font-medium text-lg">
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Sentiment Analysis of Social Media Data Using Transformer Models
                  </Link>
                </div>
                <div className="text-base text-muted-foreground">Proceedings of the ACL Conference, 2019</div>
              </div>
              <div className="grid gap-2">
                <div className="font-medium text-lg">
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Optimizing Resource Allocation in Cloud Computing Environments
                  </Link>
                </div>
                <div className="text-base text-muted-foreground">
                  IEEE Transactions on Parallel and Distributed Systems, 2018
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Publication Activity</h2>
            <ChartContainer
              config={{ papers: { label: "Papers", color: "hsl(var(--chart-1))" } }}
              className="min-h-[400px]"
            >
              <AreaChart
                width={700}
                height={500}
                data={[
                  { name: '2018', papers: 25 },
                  { name: '2019', papers: 30 },
                  { name: '2020', papers: 40 },
                  { name: '2021', papers: 35 },
                  { name: '2022', papers: 45 },
                  { name: '2023', papers: 50 },
                  { name: '2024', papers: 42 },
                ]}
                margin={{ top: 10, right: 50, left: 30, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="papers" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>
      </div>
    </div>
  )
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
  )
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
