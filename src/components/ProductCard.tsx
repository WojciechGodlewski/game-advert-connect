
import { Eye, Heart, MessageSquare, Clock } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface ProductProps {
  id: string;
  title: string;
  description: string;
  image: string;
  budget: string;
  duration: string;
  category: string;
  advertiser: {
    name: string;
    avatar: string;
  };
  proposals: number;
  views: number;
  saved?: boolean;
}

interface ProductCardProps {
  product: ProductProps;
  onSave?: (id: string) => void;
}

export const ProductCard = ({ product, onSave }: ProductCardProps) => {
  const { 
    id, 
    title, 
    description, 
    image, 
    budget, 
    duration, 
    category, 
    advertiser, 
    proposals, 
    views, 
    saved 
  } = product;
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video relative overflow-hidden bg-secondary/30">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
        <Badge 
          className="absolute top-3 left-3" 
          variant="secondary"
        >
          {category}
        </Badge>
        
        {onSave && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSave(id);
            }}
          >
            <Heart 
              className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`} 
            />
          </Button>
        )}
      </div>
      
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <img 
                src={advertiser.avatar} 
                alt={advertiser.name} 
                className="w-5 h-5 rounded-full mr-1"
              />
              <span className="text-xs">{advertiser.name}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-1">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="bg-accent/50 rounded-md p-2">
            <p className="text-xs text-muted-foreground">Budget</p>
            <p className="font-medium">{budget}</p>
          </div>
          <div className="bg-accent/50 rounded-md p-2">
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="font-medium flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {duration}
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex space-x-3 text-sm text-muted-foreground">
          <span className="flex items-center">
            <MessageSquare className="h-3.5 w-3.5 mr-1" />
            {proposals}
          </span>
          <span className="flex items-center">
            <Eye className="h-3.5 w-3.5 mr-1" />
            {views}
          </span>
        </div>
        
        <Button size="sm" asChild>
          <Link to={`/products/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
