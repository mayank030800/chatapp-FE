import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/background.jpg')", // Replace with your background image URL
      }}
    >
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-lg shadow-xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Chat App</h1>
        <p className="text-lg text-gray-600 mb-8">
          Connect and chat in real-time with ease.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <div className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 text-center">
              Login
            </div>
          </Link>
          <Link href="/register">
            <div className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 text-center">
              Register
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
