import Button from "../ui/Button";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">

      <div className="max-w-7xl mx-auto px-6 py-5">

        <div className="glass rounded-2xl px-8 py-4 flex items-center justify-between">

          <h1 className="text-2xl font-bold text-primary">
            CortxAI
          </h1>

          <nav className="hidden md:flex gap-8 text-gray-300">

              <a href="#features">Features</a>

              <a href="#solutions">Solutions</a>

              <a href="#pricing">Pricing</a>

              <a href="#about">About</a>

          </nav>

          <Button to="/login">
           Get Started  
          </Button>

        </div>

      </div>

    </header>
  );
}