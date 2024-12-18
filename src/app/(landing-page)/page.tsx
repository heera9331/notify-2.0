// app/(landing-page)/page.tsx
import React from "react";
import "@/app/globals.css";
import { Hourglass, Pyramid, UsersRound } from "lucide-react";
import Navbar from "./_components/haeder";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="w-full">
      <Navbar />
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center main-bg">
        <div className="container mx-auto px-6 lg:px-10">
          <h1 className="text-5xl lg:text-7xl pb-6 font-bold text-white leading-snug sp">
            Notify brings <br />
            all your managers, <br />
            notes, and tasks <br />
            together
          </h1>
          <p className="text-xl lg:text-2xl text-gray-100 w-full lg:w-1/2 mb-8">
            Keep everything in the same place—even if your team isn’t.
          </p>
          <button className="bg-gray-900 text-white px-6 py-3 rounded-md text-lg hover:bg-gray-700 transition">
            <Link href={"/auth"}>Get Started for Free</Link>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" id="features">
        <div className="container mx-auto px-6 lg:px-10">
          <h2 className="text-4xl font-semibold text-gray-800 mb-10">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-medium mb-3 flex gap-2 items-center">
                <span>
                  <UsersRound />
                </span>
                Collaborate
              </h3>
              <p className="text-gray-600">
                Work seamlessly with team members to manage tasks and notes
                efficiently.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-medium mb-3 flex gap-2 items-center">
                <span>
                  <Pyramid />
                </span>
                Organize
              </h3>
              <p className="text-gray-600">
                Keep everything neatly organized in one place, accessible at any
                time.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-medium mb-3 flex items-center gap-2">
                <span>
                  <Hourglass />
                </span>
                Track
              </h3>
              <p className="text-gray-600">
                Monitor your team’s progress and track deadlines with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50" id="how-it-works">
        <div className="container mx-auto px-6 lg:px-10">
          <h2 className="text-4xl font-semibold text-gray-800 mb-10 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="text-5xl mb-4">1</div>
              <h3 className="text-xl font-medium mb-2">Sign Up</h3>
              <p>Create an account and set up your workspace.</p>
            </div>
            <div>
              <div className="text-5xl mb-4">2</div>
              <h3 className="text-xl font-medium mb-2">Add Tasks</h3>
              <p>Organize tasks, notes, and teams in one place.</p>
            </div>
            <div>
              <div className="text-5xl mb-4">3</div>
              <h3 className="text-xl font-medium mb-2">Collaborate</h3>
              <p>Start collaborating with your team seamlessly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white" id="testimonials">
        <div className="container mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-10">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-600 w-full lg:w-3/4 mx-auto mb-8">
            Our platform is designed to simplify your workflow and help you stay
            productive.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow-md w-64">
              <h3 className="text-xl font-medium mb-3">Fast</h3>
              <p>Lightning-fast performance.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md w-64">
              <h3 className="text-xl font-medium mb-3">Secure</h3>
              <p>Top-notch security for your data.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md w-64">
              <h3 className="text-xl font-medium mb-3">Reliable</h3>
              <p>Guaranteed uptime for your work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50" id="contact">
        <div className="container mx-auto px-6 lg:px-10">
          <h2 className="text-4xl font-semibold text-gray-800 mb-10 text-center">
            What Our Users Say
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
              <p className="italic mb-4">
                “This platform has completely revolutionized the way our team
                works. Highly recommended!”
              </p>
              <h4 className="font-medium text-gray-700">- Alex Johnson</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
              <p className="italic mb-4">
                “Incredible user experience and productivity tools. It’s a
                must-have for any team.”
              </p>
              <h4 className="font-medium text-gray-700">- Sarah Williams</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <h2 className="text-4xl font-semibold mb-6">Ready to Get Started?</h2>
        <p className="text-lg mb-8">
          Sign up today and transform how your team works.
        </p>
        <button className="bg-white text-gray-900 px-6 py-3 rounded-md text-lg hover:bg-gray-300 transition">
          Get Started Now
        </button>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-900 text-white text-center">
        <p>&copy; {new Date().getFullYear()} Notify. All rights reserved.</p>
      </footer>
    </div>
  );
}
