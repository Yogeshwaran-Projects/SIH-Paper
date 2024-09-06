"use client";

import { JSX, SVGProps, useEffect,useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/UserContext";
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { DatePickerWithRange } from "./ui/date-picker-with-range"
import ExcelWos from '../Export/ExcelWos';
import WordWos from '../Export/WordWos';
import { Globe, BookOpen } from "lucide-react";
import { ModeToggle } from "@/app/components/themetoggle";

export function PaperFin() {
  const { userData } = useUserContext();
  const [gsdata, setgsData] = useState([]);
  const [wosdata, setwosData] = useState([]);
  const [scopusdata, scopussetData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortBy, setSortBy] = useState("date")
  const [selectedSource, setselectedSource] = useState("wos")
  const [startYear, setStartYear] = useState<number | undefined>(undefined)
  const [endYear, setEndYear] = useState<number | undefined>(undefined)
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    fetch('http://localhost:5003/api/v1/webofscience')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setwosData(data);
            // setFilteredData(data);
        })
        .catch(error=>console.log(error));
    fetch('http://localhost:5003/api/v1/googlescholaruser')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setgsData(data);
            // setFilteredData(data);
        })
        .catch(error=>console.log(error));
    fetch('http://localhost:5003/api/v1/scopus')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            scopussetData(data);
            // setFilteredData(data);
        })
        .catch(error=>console.log(error));
}, []);

const normalizeWOSData = (item) => ({
  title: item.title,
  publicationYear: item.source.publishYear,
  publicationMonth: item.source.publishMonth,
  authors: item.names.authors.map(author => author.displayName),
  sourceTitle: item.source.sourceTitle,
  volume: item.source.volume,
  pages: item.source.pages.range,
  doi: item.identifiers.doi,
  recordLink: item.links.record,
});

const normalizeGoogleScholarData = (item) => {
  const dateParts = item.publication_date.split('/');
  return {
    title: item.title,
    publicationYear: parseInt(dateParts[0], 10),
    publicationMonth: parseInt(dateParts[1], 10) || 1, // default to January if month is not available
    authors: item.authors.split(', '),
    sourceTitle: item.journal,
    volume: item.volume,
    pages: item.pages,
    doi: null, // Google Scholar doesn't provide DOI
    recordLink: item.link,
  };
};

const normalizeScopusData = (item) => {
  const dateParts = item['prism:coverDate'].split('-');
  return {
    title: item['dc:title'],
    publicationYear: parseInt(dateParts[0], 10),
    publicationMonth: parseInt(dateParts[1], 10) || 1, // default to January if month is not available
    authors: [item['dc:creator']],
    sourceTitle: item['prism:publicationName'],
    volume: null, // Scopus data might not have volume info
    pages: item['prism:pageRange'],
    doi: item['prism:doi'],
    recordLink: item['prism:url'],
  };
};

  // Generate a list of years for the dropdown
  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => 2000 + i)

  const handleFilterWOS = () => {
    setselectedSource("wos");
    applyFilterAndSort("latest", startYear, endYear, "wos");
  };
  
  const handleFilterGoogleScholar = () => {
    setselectedSource("googlescholar");
    applyFilterAndSort("latest", startYear, endYear, "googlescholar");
  };
  
  const handleFilterScopus = () => {
    setselectedSource("scopus");
    applyFilterAndSort("latest", startYear, endYear, "scopus");
  };

  const handleYearRangeDone = () => {
    setYearDropdownOpen(false)
    applyFilterAndSort("latest", startYear, endYear, selectedSource);
    // console.log(Sorting from ${startYear} to ${endYear})
  }

  const applyFilterAndSort = (sortOrder: "latest" | "oldest", startYear: number | undefined, endYear: number | undefined, dataSource: "wos" | "googlescholar" | "scopus") => {
    let dataToFilter = [];
    
    if (dataSource === "wos") {
      dataToFilter = wosdata.map(normalizeWOSData);
    } else if (dataSource === "googlescholar") {
      dataToFilter = gsdata.map(normalizeGoogleScholarData);
    } else if (dataSource === "scopus") {
        console.log(scopusdata);
        dataToFilter = scopusdata['search-results']['entry'].map(normalizeScopusData);
    }
  
    const filtered = dataToFilter.filter(item => {
      const start = startYear ? parseInt(startYear.toString(), 10) : -Infinity;
      const end = endYear ? parseInt(endYear.toString(), 10) : Infinity;
      return item.publicationYear >= start && item.publicationYear <= end;
    });
  
    const sorted = filtered.sort((a, b) => {
      const dateA = new Date(`${a.publicationYear}-${a.publicationMonth}-01`);
      const dateB = new Date(`${b.publicationYear}-${b.publicationMonth}-01`);
      return sortOrder === "latest" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });
  
    setFilteredData(sorted);
    console.log(sorted);
  };
  
  const renderData = () => {
        return filteredData.map((item, index) => (
          <Card key={index} className="p-6 shadow-lg">
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>
              <p className="text-muted-foreground text-lg">
                Published in {item.sourceTitle}, {item.publicationYear}
              </p>
              <p className="text-muted-foreground text-lg">
                Volume: {item.volume}, Pages: {item.pages}
              </p>
              <div className="text-sm text-muted-foreground mt-4">
                Authors: {item.authors.join(', ')}
              </div>
              <div className="text-sm text-muted-foreground mt-4">
                DOI: <a href={`https://doi.org/${item.doi}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {item.doi}
                </a>
              </div>
              <div className="text-sm text-muted-foreground mt-4">
                <a href={item.recordLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  View Full Record
                </a>
              </div>
            </CardContent>
          </Card>
        ));
  };

  return (
    <>

    <ModeToggle />
    <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="fixed top-1/2 left-0 transform -translate-y-1/2 p-4 flex flex-col items-center md:items-start gap-4">
          <div className="flex-shrink-0 w-20 h-20 rounded-full bg-muted flex items-center justify-center text-7xl">
            🧑‍💻
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{userData.name}</h1>
              <p className="text-muted-foreground text-lg">User ID: {userData.id}</p>
            </div>
          </div>

          <div className="flex-1 w-full">
          
      
    
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Published Papers</h2>
              <div className="flex items-center gap-4">
                {/* Filter by WOS */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            WOS
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={8}>
          <DropdownMenuLabel >Filter by WOS:</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem onClick={() => handleFilterWOS()}>Journal Articles</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Conference Papers</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Book Chapters</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Scopus
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={8}>
          <DropdownMenuLabel >Filter by Scopus:</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem onClick={() => handleFilterScopus()}>Journal Articles</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Conference Papers</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Book Chapters</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Filter by Google Scholar */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Google Scholar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={8}>
          <DropdownMenuLabel >Filter by Google Scholar:</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem onClick={() => handleFilterGoogleScholar()}>Articles</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Citations</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Patents</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
                        setSortBy(value);
                      } }
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
                        <ExcelWos data={filteredData} filename={selectedSource+"_excelfile"} />
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href="#"
                        className="flex items-center gap-3 text-lg"
                        prefetch={false}
                      >
                        <FileIcon className="h-6 w-6" />
                        <WordWos publications={filteredData} filename={selectedSource+"_wordfile"}/>
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
              {renderData()}
              {/* Repeat for other cards */}
            </div>
          </div>
        </div>
      </div></>
  )
}

function ArrowUpDownIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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

function DownloadIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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

function FileIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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

function FileSpreadsheetIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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