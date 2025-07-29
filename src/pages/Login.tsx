import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, BookOpen, User, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    grade: "",
    school: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { isLogin, formData });
    // Handle authentication
  };

  const roles = [
    { id: "student", name: "Student", icon: GraduationCap, description: "Access and share study materials" },
    { id: "teacher", name: "Teacher", icon: User, description: "Upload resources and help students" },
    { id: "admin", name: "Admin", icon: Users, description: "Manage platform and content" },
  ];

  const grades = [
    { id: "grade-9", name: "Grade 9" },
    { id: "grade-10", name: "Grade 10 (SEE)" },
    { id: "plus2-science", name: "+2 Science" },
    { id: "plus2-management", name: "+2 Management" },
    { id: "plus2-humanities", name: "+2 Humanities" },
    { id: "bachelors", name: "Bachelor's Degree" },
    { id: "masters", name: "Master's Degree" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">VidyaSetu</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {isLogin ? "Welcome Back!" : "Join VidyaSetu"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? "Sign in to access your account and continue learning"
              : "Create your account and start sharing knowledge"
            }
          </p>
        </div>

        {/* Auth Toggle */}
        <div className="flex bg-secondary rounded-lg p-1 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              isLogin 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              !isLogin 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection (Register only) */}
          {!isLogin && (
            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Choose your role
              </Label>
              <div className="grid grid-cols-1 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <label
                      key={role.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        formData.role === role.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.id}
                        checked={formData.role === role.id}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        formData.role === role.id ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{role.name}</div>
                        <div className="text-sm text-muted-foreground">{role.description}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Name (Register only) */}
          {!isLogin && (
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                className="mt-2"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              className="mt-2"
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password *</Label>
            <div className="relative mt-2">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Register only) */}
          {!isLogin && (
            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
                className="mt-2"
              />
            </div>
          )}

          {/* Additional Fields for Students (Register only) */}
          {!isLogin && formData.role === "student" && (
            <>
              <div>
                <Label htmlFor="grade">Current Grade/Level</Label>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="mt-2 w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select your grade</option>
                  {grades.map(grade => (
                    <option key={grade.id} value={grade.id}>{grade.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="school">School/College</Label>
                <Input
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleInputChange}
                  placeholder="Enter your school or college name"
                  className="mt-2"
                />
              </div>
            </>
          )}

          {/* Remember Me / Forgot Password (Login only) */}
          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" variant="educational" size="lg" className="w-full">
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        {/* Social Login (Optional) */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-3">
            <Button variant="outline" size="lg" className="w-full">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign {isLogin ? 'in' : 'up'} with Google
            </Button>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Sign up for free
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Sign in here
              </button>
            </>
          )}
        </div>

        {/* Terms (Register only) */}
        {!isLogin && (
          <div className="mt-6 text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:text-primary/80 transition-colors">
              Privacy Policy
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Login;