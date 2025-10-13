import { useState } from "react";
import { Search, Filter, Download, Bookmark, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Notes = () => {
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const grades = [
    { id: "all", name: "All Grades" },
    { id: "see", name: "SEE (Grade 10)" },
    { id: "plus2-science", name: "+2 Science" },
    { id: "plus2-management", name: "+2 Management" },
    { id: "plus2-humanities", name: "+2 Humanities" },
  ];

  const subjects = [
    { id: "all", name: "All Subjects" },
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "mathematics", name: "Mathematics" },
    { id: "english", name: "English" },
    { id: "nepali", name: "Nepali" },
    { id: "economics", name: "Economics" },
    { id: "accountancy", name: "Accountancy" },
    { id: "computer", name: "Computer Science" },
  ];

  const types = [
    { id: "all", name: "All Types" },
    { id: "notes", name: "Notes" },
    { id: "ppt", name: "PowerPoint" },
    { id: "questions", name: "Old Questions" },
    { id: "solutions", name: "Solutions" },
  ];

  // Mock data
  const notes = [
    {
      id: 1,
      title: "Complete Physics Notes - Mechanics",
      grade: "plus2-science",
      subject: "Physics",
      type: "Notes",
      author: "Ramesh Sharma",
      downloads: 234,
      rating: 4.8,
      tags: ["mechanics", "motion", "forces"],
      uploadDate: "2024-01-15",
    },
    {
      id: 2,
      title: "SEE Mathematics - Algebra Chapter",
      grade: "see",
      subject: "Mathematics",
      type: "Notes",
      author: "Sita Rai",
      downloads: 456,
      rating: 4.9,
      tags: ["algebra", "equations", "see"],
      uploadDate: "2024-01-12",
    },
    {
      id: 3,
      title: "Economics Model Questions 2024",
      grade: "plus2-management",
      subject: "Economics",
      type: "Old Questions",
      author: "Hari Thapa",
      downloads: 189,
      rating: 4.7,
      tags: ["economics", "model-questions", "2024"],
      uploadDate: "2024-01-10",
    },
    {
      id: 4,
      title: "English Grammar PowerPoint",
      grade: "see",
      subject: "English",
      type: "PowerPoint",
      author: "Maya Gurung",
      downloads: 312,
      rating: 4.6,
      tags: ["grammar", "english", "ppt"],
      uploadDate: "2024-01-08",
    },
  ];

  const filteredNotes = notes.filter((note) => {
    const matchesGrade = selectedGrade === "all" || note.grade === selectedGrade;
    const matchesSubject = selectedSubject === "all" || note.subject.toLowerCase() === selectedSubject;
    const matchesType = selectedType === "all" || note.type.toLowerCase() === selectedType.toLowerCase();
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesGrade && matchesSubject && matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Academic Resources</h1>
          <p className="text-muted-foreground">Discover and download study materials shared by fellow students</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search notes, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Grade Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Grade Level</label>
              <div className="flex flex-wrap gap-2">
                {grades.map((grade) => (
                  <button
                    key={grade.id}
                    onClick={() => setSelectedGrade(grade.id)}
                    className={`filter-chip ${selectedGrade === grade.id ? 'active' : ''}`}
                  >
                    {grade.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
              <div className="flex flex-wrap gap-2">
                {subjects.slice(0, 6).map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject.id)}
                    className={`filter-chip ${selectedSubject === subject.id ? 'active' : ''}`}
                  >
                    {subject.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Resource Type</label>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`filter-chip ${selectedType === type.id ? 'active' : ''}`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Found {filteredNotes.length} resources
          </p>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div key={note.id} className="resource-card">
              <div className="flex justify-between items-start mb-3">
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                  {note.type}
                </span>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{note.rating}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">
                {note.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subject:</span>
                  <span className="font-medium text-foreground">{note.subject}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Author:</span>
                  <span className="font-medium text-foreground">{note.author}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Downloads:</span>
                  <span className="font-medium text-foreground">{note.downloads}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex space-x-2">
                <Button variant="default" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Resources
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Notes;