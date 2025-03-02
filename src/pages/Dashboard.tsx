import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Eye, 
  FileText, 
  MessageSquare, 
  Plus, 
  Search, 
  ShoppingBag,
  TrendingUp,
  Zap
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ProductCard, ProductProps } from "@/components/ProductCard";
import { ProposalCard, ProposalProps } from "@/components/ProposalCard";

const mockRecentProducts: ProductProps[] = [
  {
    id: "1",
    title: "Sports Energy Drink",
    description: "Looking for integration of our new energy drink as consumable items in sports or action games.",
    image: "https://images.unsplash.com/photo-1581262177000-8139a463e531?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    budget: "$5,000 - $10,000",
    duration: "3 months",
    category: "Beverages",
    advertiser: {
      name: "PowerBoost",
      avatar: "https://ui-avatars.com/api/?name=PB&background=random",
    },
    proposals: 12,
    views: 245,
  },
  {
    id: "2",
    title: "Premium Sneakers",
    description: "Our latest sneaker line would be perfect for character customization in open world games.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    budget: "$8,000 - $15,000",
    duration: "6 months",
    category: "Apparel",
    advertiser: {
      name: "StrideFashion",
      avatar: "https://ui-avatars.com/api/?name=SF&background=random",
    },
    proposals: 8,
    views: 189,
  },
];

const mockRecentProposals: ProposalProps[] = [
  {
    id: "1",
    productId: "1",
    productTitle: "Sports Energy Drink",
    productImage: "https://images.unsplash.com/photo-1581262177000-8139a463e531?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    developer: {
      id: "dev1",
      name: "GameMaster Studios",
      avatar: "https://ui-avatars.com/api/?name=GMS&background=random",
      game: "RaceTurbo 3000",
      gameImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    description: "We'd like to integrate the energy drink as power-ups in our racing game, providing speed boosts to players.",
    submittedAt: "2 days ago",
    status: "pending",
    integrationPlan: "The energy drink will be placed as collectible items on the race track, giving players a temporary speed boost.",
    budget: "$7,500",
  },
  {
    id: "2",
    productId: "2",
    productTitle: "Premium Sneakers",
    productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    developer: {
      id: "dev2",
      name: "OpenWorld Creations",
      avatar: "https://ui-avatars.com/api/?name=OWC&background=random",
      game: "City Explorer",
      gameImage: "https://images.unsplash.com/photo-1611499374703-ff246ede0d05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    description: "We'll add your sneakers as special collectible items that give players enhanced parkour abilities.",
    submittedAt: "5 days ago",
    status: "approved",
    integrationPlan: "The sneakers will be available in our in-game stores and as rewards for completing certain missions.",
    budget: "$12,000",
  },
];

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, icon, trend }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <p className={`text-xs flex items-center mt-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend.isPositive ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : (
            <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
          )}
          {trend.value} from last month
        </p>
      )}
    </CardContent>
  </Card>
);

const AdvertiserDashboard = () => {
  const [savedProducts, setSavedProducts] = useState<string[]>([]);
  
  const toggleSaveProduct = (id: string) => {
    setSavedProducts((current) => 
      current.includes(id) 
        ? current.filter((productId) => productId !== id)
        : [...current, id]
    );
  };
  
  const handleApproveProposal = (id: string) => {
    console.log(`Approving proposal ${id}`);
  };
  
  const handleRejectProposal = (id: string) => {
    console.log(`Rejecting proposal ${id}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Campaigns"
          value="3"
          icon={<Zap className="h-4 w-4 text-primary" />}
          trend={{ value: "20%", isPositive: true }}
        />
        <StatCard 
          title="Total Products"
          value="8"
          icon={<ShoppingBag className="h-4 w-4 text-primary" />}
        />
        <StatCard 
          title="New Proposals"
          value="12"
          icon={<FileText className="h-4 w-4 text-primary" />}
          trend={{ value: "5%", isPositive: true }}
        />
        <StatCard 
          title="Total Impressions"
          value="24.5K"
          icon={<Eye className="h-4 w-4 text-primary" />}
          trend={{ value: "12%", isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Proposals</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/proposals">
                View All <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            {mockRecentProposals.map(proposal => (
              <ProposalCard 
                key={proposal.id} 
                proposal={proposal} 
                isAdvertiser={true}
                onApprove={handleApproveProposal}
                onReject={handleRejectProposal}
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you might want to perform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" asChild>
                <Link to="/products/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Product
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/proposals">
                  <FileText className="mr-2 h-4 w-4" />
                  Review Proposals
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/messages">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Campaign dates to keep in mind</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-amber-500/20 text-amber-700 p-2 rounded-md">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Sports Drink Campaign</p>
                    <p className="text-sm text-muted-foreground">Ends in 12 days</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500/20 text-green-700 p-2 rounded-md">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Sneakers Integration</p>
                    <p className="text-sm text-muted-foreground">Starts in 5 days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const DeveloperDashboard = () => {
  const [savedProducts, setSavedProducts] = useState<string[]>([]);
  
  const toggleSaveProduct = (id: string) => {
    setSavedProducts((current) => 
      current.includes(id) 
        ? current.filter((productId) => productId !== id)
        : [...current, id]
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Integrations"
          value="2"
          icon={<Zap className="h-4 w-4 text-primary" />}
        />
        <StatCard 
          title="Submitted Proposals"
          value="5"
          icon={<FileText className="h-4 w-4 text-primary" />}
          trend={{ value: "30%", isPositive: true }}
        />
        <StatCard 
          title="Available Products"
          value="24"
          icon={<ShoppingBag className="h-4 w-4 text-primary" />}
          trend={{ value: "8%", isPositive: true }}
        />
        <StatCard 
          title="Total Revenue"
          value="$18,500"
          icon={<TrendingUp className="h-4 w-4 text-primary" />}
          trend={{ value: "15%", isPositive: true }}
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Products You Might Be Interested In</h2>
          <Button variant="outline" size="sm" asChild>
            <Link to="/products">
              View All <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockRecentProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={{
                ...product,
                saved: savedProducts.includes(product.id)
              }}
              onSave={toggleSaveProduct}
            />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Proposals</CardTitle>
              <CardDescription>Status of your submitted proposals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentProposals.map(proposal => (
                  <div 
                    key={proposal.id} 
                    className="p-4 rounded-lg border flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <img 
                        src={proposal.productImage} 
                        alt={proposal.productTitle} 
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{proposal.productTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          Submitted {proposal.submittedAt}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={`
                        ${proposal.status === 'approved' 
                          ? 'bg-green-500/20 text-green-700 border-green-500/30' 
                          : proposal.status === 'rejected'
                          ? 'bg-red-500/20 text-red-700 border-red-500/30'
                          : 'bg-amber-500/20 text-amber-700 border-amber-500/30'
                        }
                      `}
                    >
                      {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you might want to perform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" asChild>
                <Link to="/products">
                  <Search className="mr-2 h-4 w-4" />
                  Find Products
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/proposals/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Proposal
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/profile">
                  <FileText className="mr-2 h-4 w-4" />
                  Update Game Profile
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Your earnings from product placements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Month</span>
                  <span className="font-medium">$4,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Month</span>
                  <span className="font-medium">$3,800</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total YTD</span>
                  <span className="font-medium">$18,500</span>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/finance">View Full Report</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [userType, setUserType] = useState<string | null>(null);
  
  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType || "advertiser");
  }, []);
  
  return (
    <>
      <Navbar />
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-64 pl-8"
              />
            </div>
            <Button asChild>
              <Link to={userType === "advertiser" ? "/products/new" : "/proposals/new"}>
                <Plus className="mr-2 h-4 w-4" />
                {userType === "advertiser" ? "New Product" : "New Proposal"}
              </Link>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            {userType === "advertiser" ? (
              <AdvertiserDashboard />
            ) : (
              <DeveloperDashboard />
            )}
          </TabsContent>
          
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  {userType === "advertiser" 
                    ? "Manage your products available for integration." 
                    : "Browse products available for integration in your games."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Products content will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="proposals">
            <Card>
              <CardHeader>
                <CardTitle>Proposals</CardTitle>
                <CardDescription>
                  {userType === "advertiser" 
                    ? "Review and manage proposals from game developers." 
                    : "Manage your submitted proposals to advertisers."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Proposals content will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  View performance metrics and insights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Analytics content will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default Dashboard;
