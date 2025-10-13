import { useState } from "react";
import { Upload as UploadIcon, File, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Upload = () => {
  const [formData, setFormData] = useState({
    title: "",
    grade: "",
    subject: "",
    type: "",
    description: "",
    tags: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const grades = [
    { id: "see", name: "SEE (Grade 10)" },
    { id: "plus2-science", name: "+2 Science" },
    { id: "plus2-management", name: "+2 Management" },
    { id: "plus2-humanities", name: "+2 Humanities" },
  ];

  const subjects = [
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
    { id: "notes", name: "Notes" },
    { id: "ppt", name: "PowerPoint Presentation" },
    { id: "questions", name: "Old Questions" },
    { id: "solutions", name: "Solutions" },
    { id: "textbook", name: "Textbook" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", { formData, selectedFiles });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Upload Resources</h1>
          <p className="text-muted-foreground">Share your study materials with fellow students and help build our academic community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <Label htmlFor="title">Resource Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Physics Chapter 1 - Mechanics Notes"
                  required
                  className="mt-2"
                />
              </div>

              {/* Grade */}
              <div>
                <Label htmlFor="grade">Grade Level *</Label>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Grade</option>
                  {grades.map(grade => (
                    <option key={grade.id} value={grade.id}>{grade.name}</option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div>
                <Label htmlFor="type">Resource Type *</Label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Type</option>
                  {types.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., mechanics, motion, forces (comma separated)"
                  className="mt-2"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide a brief description of your resource..."
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Upload Files</h2>
            
            {/* Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragOver 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
              }`}
            >
              <UploadIcon className="mx-auto w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Drag and drop your files here
              </h3>
              <p className="text-muted-foreground mb-4">
                or click to browse files (PDF, DOC, DOCX, PPT, PPTX, ZIP)
              </p>
              <input
                type="file"
                onChange={handleFileSelect}
                multiple
                accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button type="button" variant="outline" className="cursor-pointer">
                  <Plus className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
              </label>
            </div>

            {/* Selected Files */}
            {selectedFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Selected Files</h3>
                <div className="space-y-3">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <File className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Guidelines */}
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Upload Guidelines</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Ensure your content is original or properly attributed</li>
              <li>• Files should be clear, readable, and well-organized</li>
              <li>• Maximum file size: 50MB per file</li>
              <li>• Supported formats: PDF, DOC, DOCX, PPT, PPTX, ZIP</li>
              <li>• Add relevant tags to help other students find your resources</li>
            </ul>
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" size="lg">
              Save as Draft
            </Button>
            <Button type="submit" variant="educational" size="lg">
              <UploadIcon className="w-5 h-5 mr-2" />
              Upload Resource
            </Button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Upload;