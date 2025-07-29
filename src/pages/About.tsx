import { Users, Target, Heart, BookOpen, Share2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Free Academic Resources",
      description: "Access thousands of study materials including notes, presentations, and practice questions shared by students across Nepal."
    },
    {
      icon: Share2,
      title: "Knowledge Sharing",
      description: "Upload and share your own study materials to help fellow students while building your academic reputation."
    },
    {
      icon: Users,
      title: "Student Community",
      description: "Connect with students from different schools and colleges, exchange ideas, and learn together."
    },
    {
      icon: Award,
      title: "Quality Content",
      description: "All materials are reviewed and rated by the community to ensure high-quality, accurate, and helpful content."
    }
  ];

  const stats = [
    { number: "5,000+", label: "Active Students" },
    { number: "15,000+", label: "Study Materials" },
    { number: "500+", label: "Schools & Colleges" },
    { number: "50,000+", label: "Downloads" },
  ];

  const team = [
    {
      name: "Rajesh Kumar Sharma",
      role: "Founder & CEO",
      description: "Computer Science graduate passionate about education technology and empowering Nepali students.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    {
      name: "Sita Devi Thapa",
      role: "Head of Content",
      description: "Former teacher with 10+ years of experience in Nepali education system and curriculum development.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786"
    },
    {
      name: "Aman Gurung",
      role: "Lead Developer",
      description: "Full-stack developer dedicated to creating accessible and user-friendly educational platforms.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Empowering Nepali Students Through Education
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            VidyaSetu is a community-powered platform where students share knowledge, 
            resources, and support each other's academic journey across Nepal.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            To democratize education in Nepal by providing free access to quality academic resources 
            and creating a collaborative learning environment where every student can succeed, 
            regardless of their economic background or geographical location.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            What Makes VidyaSetu Special
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card-academic p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-secondary/50 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Our Story</h2>
          <div className="prose max-w-4xl mx-auto text-muted-foreground">
            <p className="text-lg leading-relaxed mb-6">
              VidyaSetu was born from a simple observation: many brilliant students in Nepal 
              struggle not because they lack capability, but because they lack access to quality 
              study materials and resources. Founded in 2023 by a group of passionate educators 
              and technologists, our platform started as a small initiative to digitize and 
              share handwritten notes.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Today, we've grown into Nepal's largest student-driven educational platform, 
              connecting thousands of students across the country. From the bustling streets 
              of Kathmandu to remote villages in the mountains, students are sharing knowledge 
              and lifting each other up.
            </p>
            <p className="text-lg leading-relaxed">
              Our name "VidyaSetu" means "Bridge of Knowledge" in Sanskrit - representing our 
              mission to bridge the gap between students who have resources and those who need them, 
              creating a more equitable educational landscape for all.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card-academic p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Community First</h3>
              <p className="text-muted-foreground">
                We believe in the power of community and collaboration to solve educational challenges.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Quality Education</h3>
              <p className="text-muted-foreground">
                Every student deserves access to high-quality educational resources and support.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Share2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Open Knowledge</h3>
              <p className="text-muted-foreground">
                Knowledge should be free, accessible, and shared for the benefit of all students.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Join Our Mission
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of the movement to transform education in Nepal. Upload your notes, 
            help fellow students, and build a stronger academic community together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Start Contributing
            </Button>
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;