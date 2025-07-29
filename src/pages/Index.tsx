import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Upload, Users, Star, Download, TrendingUp, Search, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  // Mock data for featured content
  const featuredNotes = [
    {
      id: 1,
      title: "Complete Physics Notes - Mechanics",
      subject: "Physics",
      grade: "+2 Science",
      author: "Ramesh Sharma",
      downloads: 234,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    {
      id: 2,
      title: "SEE Mathematics - Algebra Complete",
      subject: "Mathematics", 
      grade: "SEE",
      author: "Sita Rai",
      downloads: 456,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb"
    },
    {
      id: 3,
      title: "Economics Model Questions 2024",
      subject: "Economics",
      grade: "+2 Management",
      author: "Hari Thapa",
      downloads: 189,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f"
    }
  ];

  const subjects = [
    { name: "Physics", icon: "🔬", count: 1250 },
    { name: "Mathematics", icon: "📊", count: 1890 },
    { name: "Chemistry", icon: "⚗️", count: 980 },
    { name: "English", icon: "📚", count: 1450 },
    { name: "Nepali", icon: "🇳🇵", count: 1120 },
    { name: "Economics", icon: "📈", count: 650 },
  ];

  const stats = [
    { number: "15,000+", label: "Study Materials", icon: BookOpen },
    { number: "5,000+", label: "Active Students", icon: Users },
    { number: "500+", label: "Schools & Colleges", icon: TrendingUp },
    { number: "50,000+", label: "Downloads", icon: Download },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="gradient-hero py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Nepal's Largest
              <br />
              <span className="text-yellow-300">Student Community</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Share knowledge, access free study materials, and excel together. 
              From SEE to +2, we've got you covered.
            </p>
            
            {/* Hero Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search for notes, subjects, or topics..."
                  className="pl-12 pr-32 h-14 text-lg bg-white/95 backdrop-blur border-white/20"
                />
                <Button 
                  variant="default" 
                  size="lg" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/notes">
                <Button variant="hero" size="xl">
                  <BookOpen className="w-6 h-6 mr-2" />
                  Explore Notes
                </Button>
              </Link>
              <Link to="/upload">
                <Button 
                  variant="outline" 
                  size="xl" 
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Upload className="w-6 h-6 mr-2" />
                  Upload Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Notes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Study Materials
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              High-quality notes and resources handpicked by our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredNotes.map((note) => (
              <div key={note.id} className="resource-card overflow-hidden">
                <div className="h-48 bg-secondary rounded-lg mb-4 overflow-hidden">
                  <img
                    src={note.image}
                    alt={note.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1 leading-tight">
                      {note.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {note.subject} • {note.grade}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">By {note.author}</span>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>{note.downloads}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{note.rating}</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="default" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/notes">
              <Button variant="outline" size="lg">
                View All Resources
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore by Subject
            </h2>
            <p className="text-lg text-muted-foreground">
              Find resources for your specific subjects and grade levels
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {subjects.map((subject, index) => (
              <Link key={index} to={`/notes?subject=${subject.name.toLowerCase()}`}>
                <div className="card-academic p-6 text-center hover:scale-105 transition-transform duration-200 cursor-pointer">
                  <div className="text-4xl mb-3">{subject.icon}</div>
                  <h3 className="font-semibold text-foreground mb-1">{subject.name}</h3>
                  <p className="text-sm text-muted-foreground">{subject.count} resources</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose VidyaSetu?
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need for academic success in one platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-academic p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Free Resources
              </h3>
              <p className="text-muted-foreground">
                Access thousands of study materials completely free. No hidden costs or subscriptions.
              </p>
            </div>

            <div className="card-academic p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Community Driven
              </h3>
              <p className="text-muted-foreground">
                Learn from and contribute to a community of students across Nepal.
              </p>
            </div>

            <div className="card-academic p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Store className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Marketplace
              </h3>
              <p className="text-muted-foreground">
                Buy and sell second-hand academic materials safely and easily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of Nepali students who are already sharing knowledge and excelling together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button variant="educational" size="xl">
                Get Started Free
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="xl">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;