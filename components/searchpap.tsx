"use client"
import Link from "next/link"
import { JSX, SVGProps, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Exceluploadb from "@/components/Exceluploadb"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination"
import { Globe } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ModeToggle } from "@/app/components/themetoggle"

export function Searchpap() {
  const [data, setData] = useState([]);
  const [topic, setTopic] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Set the number of items per page

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };
  
  useEffect(() => {
    const smpl = 'AI'
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5003/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: smpl }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  const handlesearch = async () => {
    console.log(topic);
    if (topic === "087004") {
      setData([{
        uid: "087004",
        profile: {
          name: "Yogeshwaran",
          title: "Software Engineer at Acme Inc.",
          description: "Yogeshwaran is a skilled software engineer with a passion for building innovative products.",
          image: "/path/to/avatar.jpg" // Add a path to the avatar image if you have one
        }
      }]);
    } else {
      fetch('http://localhost:5003/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: topic }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setData(data);
          console.log(data);
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <ModeToggle />
    <div className="flex flex-col min-h-[100dvh]">
      <header className="py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="#" className="text-2xl font-bold" prefetch={false}>
            SIH Papers
          </Link>
          <form className="relative w-full max-w-3xl">
            <div>
              <Input
                type="search"
                placeholder="Search papers..."
                className="w-full rounded-md bg-primary-foreground/10 px-4 py-2 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
                value={topic}
                onChange={handleTopicChange}
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-white hover:bg-primary-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
                onClick={handlesearch}
              >
                <div className="flex items-center gap-10">
                  <SearchIcon className="h-5 w-5 text-white" />
                </div>
              </Button>
            </div>
          </form>
          <Exceluploadb />
        </div>
      </header>
      <main className="flex-1 bg-background">
        <div className="container mx-auto py-8 px-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <FilterIcon className="h-5 w-5" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" sideOffset={8}>
                  <DropdownMenuLabel>Filter by:</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>Title</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Author</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Publication Date</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Keywords</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ListOrderedIcon className="h-5 w-5" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" sideOffset={8}>
                  <DropdownMenuLabel>Sort by:</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value="relevance">
                    <DropdownMenuRadioItem value="relevance">Relevance</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="date">Date (Newest)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="date-asc">Date (Oldest)</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    WOS
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" sideOffset={8}>
                  <DropdownMenuLabel>Filter by WOS:</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem>Journal Articles</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Conference Papers</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Book Chapters</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Google Scholar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" sideOffset={8}>
                  <DropdownMenuLabel>Filter by Google Scholar:</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem>Articles</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Citations</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Patents</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Results:</span>
              <span className="font-medium">{data.length}</span>
            </div>
          </div>
          <div className="grid gap-6">
            {currentItems.length > 0 ? (
              currentItems.map(paper => (
                paper.uid === "087004" ? (
                  <Card key={paper.uid} className="flex max-w-[600px] overflow-hidden">
                    <div className="flex-1 p-6 text-center">
                      <Avatar className="mx-auto mb-4 h-24 w-24">
                        <AvatarImage src={paper.profile.image} alt="Profile Image" />
                        <AvatarFallback>{paper.profile.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{paper.profile.name}</h3>
                        <p className="text-muted-foreground">{paper.profile.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {paper.profile.description}
                        </p>
                      </div>
                      <Link href="/dummy">
  <Button className="mt-4">
    View Profile
  </Button>
</Link>


                    </div>
                  </Card>
                ) : (
                  <Card key={paper.uid}>
                    <CardHeader>
                      <CardTitle>{paper.title}</CardTitle>
                      <CardDescription>{paper.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-4">
                        <p>{paper.abstract}</p>
                        <span className="text-xs text-muted-foreground">{new Date(paper.publicationDate).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={paper.links.record} target="_blank" className="text-sm font-medium text-primary-foreground hover:underline" prefetch={false}>
                        Read more
                      </Link>
                    </CardFooter>
                  </Card>
                )
              ))
            ) : (
              <div className="text-muted-foreground">
                <p>No results found.</p>
              </div>
            )}
          </div>
          <Pagination className="mt-8 flex justify-center">
            <PaginationPrevious
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </PaginationPrevious>
            <PaginationContent>
              {[...Array(Math.ceil(data.length / itemsPerPage))].map((_, i) => (
                <PaginationItem key={i} active={i + 1 === currentPage}>
                  <PaginationLink onClick={() => paginate(i + 1)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
            <PaginationNext
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </PaginationNext>
          </Pagination>
        </div>
      </main>
    </div>
    </>
  );
}

function FilterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function ListOrderedIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  )
}


function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function TagIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  )
}