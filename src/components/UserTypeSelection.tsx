
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Gamepad, ShoppingBag } from "lucide-react";

interface UserTypeOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface UserTypeSelectionProps {
  onSelect: (type: string) => void;
}

export const UserTypeSelection = ({ onSelect }: UserTypeSelectionProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  
  const options: UserTypeOption[] = [
    {
      id: "advertiser",
      title: "Advertiser",
      description: "Showcase your products to game developers for in-game integration.",
      icon: <ShoppingBag className="h-10 w-10" />,
    },
    {
      id: "developer",
      title: "Game Developer",
      description: "Find products to integrate into your games and monetize them.",
      icon: <Gamepad className="h-10 w-10" />,
    },
  ];
  
  const handleSelect = (id: string) => {
    setSelected(id);
    onSelect(id);
  };
  
  return (
    <div className="w-full space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">I am a...</h3>
        <p className="text-sm text-muted-foreground">
          Select your account type to continue
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <div
            key={option.id}
            className={`
              relative rounded-xl border-2 p-6 cursor-pointer transition-all
              ${selected === option.id 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/20 hover:bg-accent/50"
              }
            `}
            onClick={() => handleSelect(option.id)}
          >
            {selected === option.id && (
              <div className="absolute top-3 right-3 text-primary">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-primary h-6 w-6 rounded-full flex items-center justify-center"
                >
                  <Check className="h-4 w-4 text-white" />
                </motion.div>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center text-primary">
                {option.icon}
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-lg">{option.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
