
import React, { useEffect, useRef } from 'react';
import { 
  Search, 
  Truck, 
  Calendar, 
  PiggyBank, 
  ShieldCheck, 
  MessagesSquare, 
  Clock,
  FileText
} from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-premium border border-gray-100 transition-all duration-500 opacity-0 translate-y-10"
    >
      <div className="mb-4 p-3 bg-pharma-50 text-pharma-600 rounded-lg inline-block">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Advanced Search",
      description: "Find medications by name, active ingredient, symptom, or category with smart filters.",
      delay: 100
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Same-Day Delivery",
      description: "Get your medications delivered to your doorstep within hours.",
      delay: 200
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Medication Reminders",
      description: "Never miss a dose with personalized medication reminders.",
      delay: 300
    },
    {
      icon: <PiggyBank className="w-6 h-6" />,
      title: "Loyalty Rewards",
      description: "Earn points with every purchase and unlock exclusive benefits.",
      delay: 400
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Secure Prescriptions",
      description: "Upload and manage your prescriptions securely within the platform.",
      delay: 500
    },
    {
      icon: <MessagesSquare className="w-6 h-6" />,
      title: "Pharmacist Chat",
      description: "Connect with a professional pharmacist for medication guidance.",
      delay: 600
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Refill Reminders",
      description: "Automatic reminders when it's time to refill your prescriptions.",
      delay: 700
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Digital Prescriptions",
      description: "Digitize and store your prescriptions for easy refills and tracking.",
      delay: 800
    }
  ];
  
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Features that <span className="text-pharma-600">Simplify</span> Healthcare
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed to make medication management easier, safer, and more accessible for everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
