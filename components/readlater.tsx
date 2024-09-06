"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ModeToggle } from "@/app/components/themetoggle"

export function Readlater() {
  const [papers, setPapers] = useState([
    {
      id: 1,
      title: "The Impact of Climate Change on Biodiversity",
      author: "Dr. Emily Wilkins",
      date: "2022-06-15",
      summary:
        "This study examines the effects of global warming on the habitats and populations of various species around the world. The findings suggest that urgent action is needed to mitigate the devastating consequences of climate change on the natural world.",
      read: false,
    },
    {
      id: 2,
      title: "Advancements in Renewable Energy Technologies",
      author: "Prof. Michael Chen",
      date: "2021-09-20",
      summary:
        "The paper explores the latest developments in solar, wind, and hydroelectric power generation. It discusses the economic and environmental benefits of transitioning to a more sustainable energy infrastructure, as well as the technological challenges that still need to be addressed.",
      read: false,
    },
    {
      id: 3,
      title: "The Rise of Artificial Intelligence in Healthcare",
      author: "Dr. Samantha Lee",
      date: "2023-01-05",
      summary:
        "This comprehensive review analyzes the growing applications of AI and machine learning in the medical field, from disease diagnosis and drug discovery to personalized treatment plans and remote patient monitoring. The paper highlights the potential of these technologies to revolutionize healthcare delivery and improve patient outcomes.",
      read: true,
    },
    {
      id: 4,
      title: "The Future of Urban Mobility: Trends and Innovations",
      author: "Prof. Liam Nguyen",
      date: "2022-11-30",
      summary:
        "The study explores the emerging trends and innovative solutions shaping the future of urban transportation, including electric vehicles, autonomous driving, and integrated mobility platforms. It discusses the challenges and opportunities faced by city planners and policymakers in creating more sustainable and efficient transportation systems.",
      read: false,
    },
    {
      id: 5,
      title: "Quantum Computing: Unlocking the Future of Computation",
      author: "Dr. Olivia Patel",
      date: "2023-03-01",
      summary:
        "This paper delves into the revolutionary potential of quantum computing, exploring its fundamental principles, current advancements, and the transformative impact it could have on fields such as cryptography, materials science, and drug discovery. The authors discuss the challenges and milestones in the race to build a practical, large-scale quantum computer.",
      read: false,
    },
    {
      id: 6,
      title: "The Ethics of Artificial Intelligence",
      author: "Prof. Ethan Nguyen",
      date: "2022-09-10",
      summary:
        "The paper examines the ethical considerations surrounding the development and deployment of artificial intelligence systems. It explores topics such as algorithmic bias, privacy, transparency, and the societal implications of AI, highlighting the need for robust governance frameworks and interdisciplinary collaboration to ensure the responsible and beneficial use of these transformative technologies.",
      read: true,
    },
    {
      id: 7,
      title: "The Future of Remote Work: Trends and Challenges",
      author: "Dr. Sophia Gonzalez",
      date: "2021-11-20",
      summary:
        "This comprehensive study analyzes the rise of remote work in the wake of the COVID-19 pandemic, exploring the technological, organizational, and cultural shifts that have enabled this transition. The paper discusses the benefits and challenges of remote work, as well as the implications for the future of the workforce and the workplace.",
      read: false,
    },
  ])

  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("date")

  const filteredPapers = useMemo(() => {
    return papers
      .filter((paper) => {
        if (filter === "all") return true
        if (filter === "read" && paper.read) return true
        if (filter === "unread" && !paper.read) return true
        return false
      })
      .sort((a, b) => {
        if (sort === "date") {
          return new Date(b.date) - new Date(a.date)
        } else if (sort === "title") {
          return a.title.localeCompare(b.title)
        } else if (sort === "author") {
          return a.author.localeCompare(b.author)
        }
        return 0
      })
  }, [papers, filter, sort])

  const handleMarkRead = (id) => {
    setPapers((prevPapers) => prevPapers.map((paper) => (paper.id === id ? { ...paper, read: true } : paper)))
  }

  const handleMarkUnread = (id) => {
    setPapers((prevPapers) => prevPapers.map((paper) => (paper.id === id ? { ...paper, read: false } : paper)))
  }

  const handleDelete = (id) => {
    setPapers((prevPapers) => prevPapers.filter((paper) => paper.id !== id))
  }

  const handleAddPaper = () => {
    const newPaper = {
      id: papers.length + 1,
      title: "New Paper",
      author: "Unknown",
      date: new Date().toISOString().slice(0, 10),
      summary: "This is a new paper summary.",
      read: false,
    }
    setPapers((prevPapers) => [...prevPapers, newPaper])
  }

  const handleExport = () => {
    const csvData = [
      ["ID", "Title", "Author", "Date", "Summary", "Read"],
      ...filteredPapers.map((paper) => [paper.id, paper.title, paper.author, paper.date, paper.summary, paper.read]),
    ]
    const csvContent = "data:text/csv;charset=utf-8," + csvData.map((row) => row.join(",")).join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "papers.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
    <ModeToggle />
    <div className="flex h-full w-full">
      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Read Later</h1>
          <div className="flex gap-4">
            <Button size="lg" variant="outline" onClick={handleAddPaper}>
              Add Paper
            </Button>
            <Button size="lg" variant="outline" onClick={handleExport}>
              Export to CSV
            </Button>
          </div>
        </div>
        <div className="grid gap-6">
          {filteredPapers.map((paper) => (
            <div key={paper.id} className="rounded-lg border bg-background p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-medium">{paper.title}</h2>
                <div className="flex items-center gap-4">
                  <span className="text-md text-muted-foreground">{paper.date}</span>
                  <span className="text-md text-muted-foreground">{paper.author}</span>
                </div>
              </div>
              <p className="text-md text-muted-foreground">{paper.summary}</p>
              <div className="mt-6 flex justify-end gap-4">
                {paper.read ? (
                  <Button size="lg" variant="outline" onClick={() => handleMarkUnread(paper.id)}>
                    Mark as Unread
                  </Button>
                ) : (
                  <Button size="lg" variant="outline" onClick={() => handleMarkRead(paper.id)}>
                    Mark as Read
                  </Button>
                )}
                <Button size="lg" variant="outline" onClick={() => handleDelete(paper.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <aside className="w-80  p-8">
        <h2 className="mb-6 text-xl font-bold">Filter and Sort</h2>
        <div className="space-y-6">
          <div>
            <Label htmlFor="filter">Filter by:</Label>
            <Select id="filter" value={filter} onValueChange={setFilter} className="mt-2 w-full">
              <SelectTrigger>
                <SelectValue placeholder="Select filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sort">Sort by:</Label>
            <Select id="sort" value={sort} onValueChange={setSort} className="mt-2 w-full">
              <SelectTrigger>
                <SelectValue placeholder="Select sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="author">Author</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </aside>
    </div>
    </>
  )
}
