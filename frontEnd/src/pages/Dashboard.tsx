import { useState } from "react";
import { 
  Upload, 
  Download, 
  Eye, 
  Star, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Award,
  Edit,
  Trash2,
  BarChart3,
  Calendar,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data
  const userStats = {
    totalUploads: 12,
    totalDownloads: 1847,
    totalViews: 3205,
    averageRating: 4.7,
    contributionRank: 23,
    pointsEarned: 2450
  };

  const recentUploads = [
    {
      id: 1,
      title: "Physics Chapter 5 - Heat and Temperature",
      subject: "Physics",
      grade: "+2 Science",
      uploadDate: "2024-01-15",
      downloads: 89,
      views: 156,
      rating: 4.8,
      status: "approved"
    },
    {
      id: 2,
      title: "Mathematics Model Questions 2024",
      subject: "Mathematics",
      grade: "SEE",
      uploadDate: "2024-01-12",
      downloads: 234,
      views: 401,
      rating: 4.9,
      status: "approved"
    },
    {
      id: 3,
      title: "English Grammar Notes",
      subject: "English",
      grade: "SEE",
      uploadDate: "2024-01-08",
      downloads: 45,
      views: 78,
      rating: 4.6,
      status: "pending"
    }
  ];

  const bookmarkedItems = [
    {
      id: 1,
      title: "Advanced Chemistry Formulas",
      author: "Sita Rai",
      subject: "Chemistry",
      bookmarkedDate: "2024-01-14"
    },
    {
      id: 2,
      title: "Economics Important Questions",
      author: "Hari Thapa",
      subject: "Economics",
      bookmarkedDate: "2024-01-10"
    }
  ];

  const achievements = [
    {
      title: "Top Contributor",
      description: "Uploaded 10+ high-quality resources",
      icon: Award,
      earned: true,
      date: "2024-01-01"
    },
    {
      title: "Community Favorite",
      description: "Received 100+ downloads",
      icon: Heart,
      earned: true,
      date: "2024-01-05"
    },
    {
      title: "Rising Star",
      description: "Earned 1000+ points in a month",
      icon: Star,
      earned: false,
      progress: 85
    }
  ];

  const tabs = [
    { id: "overview", name: "Overview", icon: BarChart3 },
    { id: "uploads", name: "My Uploads", icon: Upload },
    { id: "bookmarks", name: "Bookmarks", icon: BookOpen },
    { id: "achievements", name: "Achievements", icon: Award },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "text-green-600 bg-green-50 border-green-200";
      case "pending": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "rejected": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your academic contribution summary.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="card-academic p-4 text-center">
            <Upload className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{userStats.totalUploads}</div>
            <div className="text-sm text-muted-foreground">Uploads</div>
          </div>
          <div className="card-academic p-4 text-center">
            <Download className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{userStats.totalDownloads.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Downloads</div>
          </div>
          <div className="card-academic p-4 text-center">
            <Eye className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{userStats.totalViews.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Views</div>
          </div>
          <div className="card-academic p-4 text-center">
            <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{userStats.averageRating}</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </div>
          <div className="card-academic p-4 text-center">
            <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">#{userStats.contributionRank}</div>
            <div className="text-sm text-muted-foreground">Rank</div>
          </div>
          <div className="card-academic p-4 text-center">
            <Award className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{userStats.pointsEarned.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Points</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button variant="default" className="justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New Resource
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse Notes
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    View Leaderboard
                  </Button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card-academic p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-secondary/50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Download className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Your physics notes were downloaded 15 times</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-secondary/50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Received a 5-star rating on mathematics notes</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Uploads Tab */}
          {activeTab === "uploads" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-foreground">My Uploads</h3>
                <Button variant="default">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentUploads.map((upload) => (
                  <div key={upload.id} className="card-academic p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-foreground">{upload.title}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(upload.status)}`}>
                            {upload.status}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>{upload.subject} • {upload.grade}</p>
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1">
                              <Download className="w-3 h-3" />
                              <span>{upload.downloads} downloads</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{upload.views} views</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Star className="w-3 h-3" />
                              <span>{upload.rating} rating</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(upload.uploadDate).toLocaleDateString()}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bookmarks Tab */}
          {activeTab === "bookmarks" && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">Bookmarked Resources</h3>
              
              <div className="space-y-4">
                {bookmarkedItems.map((item) => (
                  <div key={item.id} className="card-academic p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-1">{item.title}</h4>
                        <div className="text-sm text-muted-foreground">
                          By {item.author} • {item.subject} • Bookmarked on {new Date(item.bookmarkedDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="default" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === "achievements" && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">Achievements</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div 
                      key={index} 
                      className={`card-academic p-6 ${achievement.earned ? 'border-primary/50 bg-primary/5' : 'opacity-60'}`}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.earned ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                          {achievement.earned && achievement.date && (
                            <p className="text-xs text-muted-foreground">
                              Earned on {new Date(achievement.date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                      
                      {!achievement.earned && achievement.progress && (
                        <div>
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${achievement.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;