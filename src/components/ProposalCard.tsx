
import { CalendarClock, CheckCircle, Clock, X } from "lucide-react";
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

export interface ProposalProps {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  developer: {
    id: string;
    name: string;
    avatar: string;
    game: string;
    gameImage: string;
  };
  description: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  integrationPlan: string;
  budget: string;
}

interface ProposalCardProps {
  proposal: ProposalProps;
  isAdvertiser?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export const ProposalCard = ({ 
  proposal, 
  isAdvertiser = false,
  onApprove,
  onReject
}: ProposalCardProps) => {
  const { 
    id, 
    productId, 
    productTitle, 
    productImage,
    developer, 
    description, 
    submittedAt, 
    status,
    budget
  } = proposal;
  
  const getStatusColor = () => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-700 border-green-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-700 border-red-500/30";
      default:
        return "bg-amber-500/20 text-amber-700 border-amber-500/30";
    }
  };
  
  const getStatusText = () => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      default:
        return "Pending";
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/3 lg:w-1/4">
          <div className="h-full relative bg-secondary/30">
            <img 
              src={productImage} 
              alt={productTitle} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
              <Badge variant="outline" className="self-start mb-1 bg-black/20 backdrop-blur-sm text-white border-white/20">
                Product
              </Badge>
              <h3 className="text-white font-medium text-sm line-clamp-1">{productTitle}</h3>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
            <div>
              <CardTitle className="text-lg flex items-center">
                <img 
                  src={developer.avatar} 
                  alt={developer.name} 
                  className="w-6 h-6 rounded-full mr-2"
                />
                {developer.name}
              </CardTitle>
              <CardDescription>
                {developer.game}
              </CardDescription>
            </div>
            
            <Badge className={`${getStatusColor()} ml-2`}>
              {getStatusText()}
            </Badge>
          </CardHeader>
          
          <CardContent className="p-4 pt-2">
            <p className="text-sm text-muted-foreground mb-3">
              {description}
            </p>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md p-2 bg-accent/50">
                <p className="text-xs text-muted-foreground">Proposed Budget</p>
                <p className="font-medium">{budget}</p>
              </div>
              <div className="rounded-md p-2 bg-accent/50">
                <p className="text-xs text-muted-foreground">Submitted</p>
                <p className="font-medium flex items-center">
                  <CalendarClock className="h-3 w-3 mr-1" />
                  {submittedAt}
                </p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              asChild
            >
              <Link to={`/proposals/${id}`}>View Details</Link>
            </Button>
            
            {isAdvertiser && status === "pending" && (
              <div className="flex space-x-2">
                {onReject && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-destructive border-destructive hover:bg-destructive/10"
                    onClick={() => onReject(id)}
                  >
                    <X className="h-3.5 w-3.5 mr-1" />
                    Reject
                  </Button>
                )}
                
                {onApprove && (
                  <Button 
                    size="sm"
                    onClick={() => onApprove(id)}
                  >
                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                    Approve
                  </Button>
                )}
              </div>
            )}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};
