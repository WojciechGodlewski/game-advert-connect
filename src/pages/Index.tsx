
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, GameController, LucideIcon, ShoppingBag, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const Feature = ({ icon: Icon, title, description, delay = 0 }: FeatureProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    className="flex flex-col items-center text-center p-6 rounded-xl border bg-card"
  >
    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </motion.div>
);

const Hero = () => (
  <section className="relative py-20 px-4 overflow-hidden">
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] z-0"></div>
    <div className="container relative z-10">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Introducing GameAdConnect
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
        >
          Connect Games with 
          <span className="bg-gradient-to-r from-primary to-blue-500 text-transparent bg-clip-text"> Brand Integrations</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-muted-foreground mb-8 max-w-2xl"
        >
          The marketplace where game developers and advertisers collaborate to create immersive in-game product placements.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button size="lg" asChild>
            <Link to="/auth">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/products">Explore Products</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-16 px-4 bg-secondary/30">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-sm font-medium text-primary mb-2 block">
          Features
        </span>
        <h2 className="text-3xl font-bold mb-4">
          Everything you need to connect games and brands
        </h2>
        <p className="text-muted-foreground">
          Our platform provides all the tools needed for seamless collaboration between
          game developers and advertisers.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Feature 
          icon={ShoppingBag}
          title="Product Showcase"
          description="Advertisers can list their products with detailed specifications for in-game integration."
          delay={0.1}
        />
        <Feature 
          icon={GameController}
          title="Game Profile"
          description="Game developers can showcase their games and track record to attract advertisers."
          delay={0.2}
        />
        <Feature 
          icon={Zap}
          title="Streamlined Proposals"
          description="Efficient process for submitting, reviewing, and accepting integration proposals."
          delay={0.3}
        />
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="py-16 px-4">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-sm font-medium text-primary mb-2 block">
          Process
        </span>
        <h2 className="text-3xl font-bold mb-4">
          How It Works
        </h2>
        <p className="text-muted-foreground">
          A simple three-step process to bring brands into games
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative px-6 py-8 text-center"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
            1
          </div>
          <h3 className="text-xl font-medium mt-8 mb-3">List Products & Games</h3>
          <p className="text-muted-foreground text-sm">
            Advertisers list products they want featured in games. Developers showcase their games.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative px-6 py-8 text-center"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
            2
          </div>
          <h3 className="text-xl font-medium mt-8 mb-3">Submit Proposals</h3>
          <p className="text-muted-foreground text-sm">
            Developers create detailed proposals for how they'll integrate products into their games.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative px-6 py-8 text-center"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
            3
          </div>
          <h3 className="text-xl font-medium mt-8 mb-3">Collaborate & Launch</h3>
          <p className="text-muted-foreground text-sm">
            Once approved, collaborate on the integration and launch the campaign in-game.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

const Testimonials = () => {
  const testimonials = [
    {
      quote: "GameAdConnect made it incredibly easy to get our energy drink featured in top racing games. The ROI has been fantastic.",
      author: "Sarah Johnson",
      title: "Marketing Director, PowerBoost",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "As an indie developer, this platform has opened up a new revenue stream while keeping our creative integrity intact.",
      author: "Alex Chen",
      title: "Lead Developer, Quantum Studios",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  return (
    <section className="py-16 px-4 bg-primary/5">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-sm font-medium text-primary mb-2 block">
            Testimonials
          </span>
          <h2 className="text-3xl font-bold mb-2">What Our Users Say</h2>
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: index === activeIndex ? 1 : 0,
                scale: index === activeIndex ? 1 : 0.9,
                display: index === activeIndex ? 'block' : 'none'
              }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-xl p-8 shadow-sm border"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                <h4 className="font-medium">{testimonial.author}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
          
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full ${
                  index === activeIndex ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="py-20 px-4">
    <div className="container">
      <div className="bg-primary/5 border rounded-xl p-8 md:p-12 max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-4"
        >
          Ready to connect your brand with games?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Join our growing marketplace of game developers and advertisers to create
          immersive in-game experiences.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button size="lg" asChild>
            <Link to="/auth">Create Account</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-secondary/50 border-t">
    <div className="container py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold mb-4">GameAdConnect</h3>
          <p className="text-muted-foreground mb-4 max-w-md">
            Connecting game developers and advertisers for innovative in-game product placements.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                Products
              </Link>
            </li>
            <li>
              <Link to="/auth" className="text-muted-foreground hover:text-foreground transition-colors">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} GameAdConnect. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Twitter
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            LinkedIn
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Instagram
          </a>
        </div>
      </div>
    </div>
  </footer>
);

const Index = () => {
  useEffect(() => {
    // Add a grid pattern to the root element for hero background
    document.documentElement.style.setProperty(
      '--grid-pattern',
      'radial-gradient(hsl(var(--primary)/10) 1px, transparent 0)'
    );
    document.documentElement.style.setProperty('--grid-pattern-size', '40px');
    
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(
      '.bg-grid-pattern { background-image: var(--grid-pattern); background-size: var(--grid-pattern-size) var(--grid-pattern-size); }',
      styleSheet.cssRules.length
    );
    
    return () => {
      // Cleanup
      document.documentElement.style.removeProperty('--grid-pattern');
      document.documentElement.style.removeProperty('--grid-pattern-size');
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
};

export default Index;
