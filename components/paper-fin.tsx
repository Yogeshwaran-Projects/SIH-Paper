"use client"

import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { DatePickerWithRange } from "./ui/date-picker-with-range"

export function PaperFin() {
  const [sortBy, setSortBy] = useState("date")
  const [startYear, setStartYear] = useState<number | undefined>(undefined)
  const [endYear, setEndYear] = useState<number | undefined>(undefined)
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false)
  const currentYear = new Date().getFullYear()

  // Generate a list of years for the dropdown
  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => 2000 + i)

  const handleYearRangeDone = () => {
    setYearDropdownOpen(false)
    console.log(`Sorting from ${startYear} to ${endYear}`)
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="fixed top-1/2 left-0 transform -translate-y-1/2 p-4 flex flex-col items-center md:items-start gap-4">
          <Avatar className="w-32 h-32">
            <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p className="text-muted-foreground text-lg">User ID: 12345</p>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Published Papers</h2>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-4">
                    <ArrowUpDownIcon className="h-5 w-5 mr-2" />
                    Sort by
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[320px]" align="end">
                  <DropdownMenuRadioGroup
                    value={sortBy}
                    onValueChange={(value) => {
                      setSortBy(value)
                      if (value === "date") {
                        setYearDropdownOpen(false)
                      }
                    }}
                  >
                    <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="year">Year</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                  {sortBy === "date" && (
                    <DatePickerWithRange className="mt-4" />
                  )}
                  {sortBy === "year" && (
                    <div className="flex flex-col gap-2 mt-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full">
                            {startYear ? `Start Year: ${startYear}` : "Select Start Year"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                          {years.map((year) => (
                            <DropdownMenuItem
                              key={year}
                              onClick={() => setStartYear(year)}
                            >
                              {year}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full">
                            {endYear ? `End Year: ${endYear}` : "Select End Year"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                          {years.map((year) => (
                            <DropdownMenuItem
                              key={year}
                              onClick={() => setEndYear(year)}
                            >
                              {year}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button
                        className="mt-4"
                        onClick={handleYearRangeDone}
                      >
                        Done
                      </Button>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="ml-auto p-2">
                    <DownloadIcon className="h-6 w-6" />
                    <span className="sr-only">Export papers</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <Link
                      href="#"
                      className="flex items-center gap-3 text-lg"
                      prefetch={false}
                    >
                      <FileSpreadsheetIcon className="h-6 w-6" />
                      <span>Export as Excel</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="#"
                      className="flex items-center gap-3 text-lg"
                      prefetch={false}
                    >
                      <FileIcon className="h-6 w-6" />
                      <span>Export as Word</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="#"
                      className="flex items-center gap-3 text-lg"
                      prefetch={false}
                    >
                      <FileIcon className="h-6 w-6" />
                      <span>Export as PDF</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid gap-8">
            <Card className="p-6">
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">
                    Optimizing React Performance
                  </h3>
                </div>
                <p className="text-muted-foreground text-lg">
                  This paper explores various techniques for optimizing the
                  performance of React applications, including code splitting,
                  memoization, and lazy loading.
                </p>
                <div className="text-sm text-muted-foreground mt-4">
                  Published in 2021
                </div>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">
                    Optimizing React Performance
                  </h3>
                </div>
                <p className="text-muted-foreground text-lg">
                  This paper explores various techniques for optimizing the
                  performance of React applications, including code splitting,
                  memoization, and lazy loading.
                </p>
                <div className="text-sm text-muted-foreground mt-4">
                  Published in 2021
                </div>
              </CardContent>
            </Card><Card className="p-6">
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">
                    Optimizing React Performance
                  </h3>
                </div>
                <p className="text-muted-foreground text-lg">
                  This paper explores various techniques for optimizing the
                  performance of React applications, including code splitting,
                  memoization, and lazy loading.
                </p>
                <div className="text-sm text-muted-foreground mt-4">
                  Published in 2021
                </div>
              </CardContent>
            </Card><Card className="p-6">
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">
                    Optimizing React Performance
                  </h3>
                </div>
                <p className="text-muted-foreground text-lg">
                  This paper explores various techniques for optimizing the
                  performance of React applications, including code splitting,
                  memoization, and lazy loading.
                </p>
                <div className="text-sm text-muted-foreground mt-4">
                  Published in 2021
                </div>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">
                    Serverless Architecture with AWS
                  </h3>
                </div>
                <p className="text-muted-foreground text-lg">
                  This paper discusses the benefits and challenges of
                  implementing a serverless architecture using AWS services such
                  as Lambda, API Gateway, and DynamoDB.
                </p>
                <div className="text-sm text-muted-foreground mt-4">
                  Published in 2020
                </div>
              </CardContent>
            </Card>
            {/* Repeat for other cards */}
          </div>
        </div>
      </div>
    </div>
  )
}

function ArrowUpDownIcon(props) {
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
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  )
}

function DownloadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}

function FileIcon(props) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}

function FileSpreadsheetIcon(props) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M8 13h2" />
      <path d="M14 13h2" />
      <path d="M8 17h2" />
      <path d="M14 17h2" />
    </svg>
  )
}
