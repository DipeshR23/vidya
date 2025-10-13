import { useState } from "react";
import { Search, Plus, MessageCircle, Heart, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Items" },
    { id: "books", name: "Textbooks" },
    { id: "notes", name: "Handwritten Notes" },
    { id: "equipment", name: "Lab Equipment" },
    { id: "stationery", name: "Stationery" },
    { id: "electronics", name: "Electronics" },
  ];

  // Mock marketplace data
  const items = [
    {
      id: 1,
      title: "Physics Textbook - Grade 12",
      description: "Complete physics textbook for +2 science students. Good condition, no missing pages.",
      price: 800,
      category: "books",
      condition: "Good",
      seller: "Rajesh Thapa",
      location: "Kathmandu",
      images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"],
      postedDate: "2024-01-15",
      isLiked: false,
    },
    {
      id: 2,
      title: "Complete Mathematics Notes - SEE",
      description: "Handwritten mathematics notes covering all chapters for SEE exam. Clear handwriting, solved examples included.",
      price: 350,
      category: "notes",
      condition: "Excellent",
      seller: "Sunita Sharma",
      location: "Pokhara",
      images: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173"],
      postedDate: "2024-01-12",
      isLiked: true,
    },
    {
      id: 3,
      title: "Scientific Calculator - Casio fx-991MS",
      description: "Scientific calculator in excellent working condition. Perfect for mathematics and science calculations.",
      price: 1200,
      category: "electronics",
      condition: "Excellent",
      seller: "Amit Gurung",
      location: "Lalitpur",
      images: ["https://images.unsplash.com/photo-1611224923853-80b023f02d71"],
      postedDate: "2024-01-10",
      isLiked: false,
    },
    {
      id: 4,
      title: "Economics Reference Books Set",
      description: "Complete set of economics reference books for +2 management students. Includes practice questions.",
      price: 1500,
      category: "books",
      condition: "Good",
      seller: "Priya Rai",
      location: "Bhaktapur",
      images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"],
      postedDate: "2024-01-08",
      isLiked: false,
    },
  ];

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Student Marketplace</h1>
              <p className="text-muted-foreground">Buy and sell second-hand academic materials</p>
            </div>
            <Button variant="accent" size="lg" className="mt-4 sm:mt-0">
              <Plus className="w-5 h-5 mr-2" />
              Sell Item
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search for books, notes, equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`filter-chip ${selectedCategory === category.id ? 'active' : ''}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            {filteredItems.length} items found
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Sort by: Newest
            </Button>
            <Button variant="outline" size="sm">
              Price Range
            </Button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="resource-card overflow-hidden">
              {/* Image */}
              <div className="relative h-48 bg-secondary rounded-lg mb-4 overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-3 right-3 p-2 bg-background/80 rounded-full hover:bg-background transition-colors">
                  <Heart className={`w-4 h-4 ${item.isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                </button>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full font-medium">
                    {item.condition}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    Rs. {item.price.toLocaleString()}
                  </span>
                  <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                    {categories.find(c => c.id === item.category)?.name}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Seller: {item.seller}</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(item.postedDate)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button variant="default" size="sm" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Items
          </Button>
        </div>

        {/* Selling Guidelines */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6 mt-16">
          <h3 className="text-lg font-semibold text-foreground mb-3">Want to sell your items?</h3>
          <p className="text-muted-foreground mb-4">
            Join thousands of students buying and selling academic materials safely and easily.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground mb-6">
            <li>• Take clear, well-lit photos of your items</li>
            <li>• Provide honest descriptions and mention any defects</li>
            <li>• Set fair prices based on condition and market value</li>
            <li>• Respond promptly to buyer inquiries</li>
          </ul>
          <Button variant="accent" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Start Selling Today
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Marketplace;