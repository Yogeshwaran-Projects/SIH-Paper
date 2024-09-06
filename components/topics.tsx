"use client";

import { ModeToggle } from "@/app/components/themetoggle";
import { useState } from "react";

export function Topics() {
  const categories = [
    {
      id: 1,
      title: "Machine Learning",
      description:
        "Explore the latest advancements in machine learning algorithms and techniques.",
    },
    {
      id: 2,
      title: "Natural Language Processing",
      description:
        "Dive into the world of natural language understanding and generation.",
    },
    {
      id: 3,
      title: "Computer Vision",
      description: "Discover the cutting-edge research in image and video analysis.",
    },
    {
      id: 4,
      title: "Robotics",
      description: "Learn about the latest innovations in robotic systems and control.",
    },
    {
      id: 5,
      title: "Quantum Computing",
      description: "Explore the fascinating field of quantum computing and its applications.",
    },
    {
      id: 6,
      title: "Bioinformatics",
      description: "Discover the intersection of biology and computer science.",
    },
    {
      id: 7,
      title: "Cybersecurity",
      description: "Dive into the latest research on protecting digital systems and data.",
    },
    {
      id: 8,
      title: "Blockchain",
      description: "Explore the potential of blockchain technology and its applications.",
    },
    {
      id: 9,
      title: "Artificial Intelligence",
      description:
        "Discover the latest advancements in artificial intelligence and its applications.",
    },
    {
      id: 10,
      title: "Data Science",
      description: "Explore the field of data science and its impact on various industries.",
    },
    {
      id: 11,
      title: "Internet of Things",
      description: "Dive into the world of connected devices and the Internet of Things.",
    },
    {
      id: 12,
      title: "Renewable Energy",
      description:
        "Discover the latest research in renewable energy technologies and sustainability.",
    },
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategorySelect = (categoryId) => {
    if (selectedCategories.length < 5 && !selectedCategories.includes(categoryId)) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    }
  };

  return (
    <>

    <ModeToggle />

    <section className="bg-background py-12 md:py-16 lg:py-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 md:mb-12 lg:mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Explore the Latest Research Findings
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            Select up to 5 research areas that interest you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`relative rounded-xl border bg-card p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                selectedCategories.includes(category.id)
                  ? "border-primary shadow-2xl"
                  : "border-input"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {category.description}
              </p>
              <button
                className={`absolute top-4 right-4 rounded-full p-2 transition-colors hover:bg-muted ${
                  selectedCategories.includes(category.id)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                {selectedCategories.includes(category.id) ? (
                  <CheckIcon className="h-6 w-6" />
                ) : (
                  <PlusIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}

function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
