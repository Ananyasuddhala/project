import React, { useState } from "react";
import { Mail, Lock, X, Loader2 } from "lucide-react";

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

const Auth: React.FC<AuthProps> = ({ isOpen, onClose, initialMode = "login" }) => {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Basic validation
      if (!email || !password) {
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        setError("Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      if (!validatePassword(password)) {
        setError("Password must be at least 6 characters long");
        setIsLoading(false);
        return;
      }

      if (mode === "signup" && !name) {
        setError("Please enter your name");
        setIsLoading(false);
        return;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Here you would typically make an API call to your backend
      console.log("Form submitted:", { email, password, name, mode });
      
      // Simulate successful authentication
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      
      // Close the auth modal
      onClose();
      
      // Refresh the page to update the authentication state
      window.location.reload();
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Auth error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md relative">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
          aria-label="Close"
          disabled={isLoading}
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6">{mode === "login" ? "Welcome Back" : "Create Account"}</h2>
        <p className="text-gray-400 text-sm mb-4">Please enter your details below</p>

        {error && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-4" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-purple-500"
              placeholder="Email"
              aria-label="Email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-purple-500"
              placeholder="Password"
              aria-label="Password"
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>

          {mode === "signup" && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
              placeholder="Full Name"
              aria-label="Full Name"
              required
              disabled={isLoading}
            />
          )}

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded-lg font-medium transition-colors relative"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mx-auto" />
                <span className="sr-only">Loading...</span>
              </>
            ) : (
              mode === "login" ? "Sign In" : "Create Account"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-purple-500 hover:text-purple-400"
            disabled={isLoading}
          >
            {mode === "login" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;