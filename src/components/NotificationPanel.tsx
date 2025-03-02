
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle2, Clock, MessageSquare } from "lucide-react";

interface NotificationProps {
  id: string;
  type: "message" | "proposal" | "system";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

interface NotificationPanelProps {
  onClose: () => void;
}

// Mock notification data
const notifications: NotificationProps[] = [
  {
    id: "1",
    type: "proposal",
    title: "New Proposal Received",
    description: "Developer GameMaster has submitted a proposal for your product.",
    time: "Just now",
    read: false,
  },
  {
    id: "2",
    type: "message",
    title: "Message from StreamStudio",
    description: "I have a question about your latest product...",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "system",
    title: "Campaign Started",
    description: "Your 'Energy Drink' campaign is now live in 3 games.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "4",
    type: "proposal",
    title: "Proposal Accepted",
    description: "Brand XYZ accepted your integration proposal!",
    time: "2 days ago",
    read: true,
  },
];

export const NotificationPanel = ({ onClose }: NotificationPanelProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifs, setNotifs] = useState(notifications);
  
  const markAsRead = (id: string) => {
    setNotifs(
      notifs.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  
  const filteredNotifications = 
    activeTab === "all" 
      ? notifs 
      : notifs.filter((notif) => 
          activeTab === "unread" ? !notif.read : notif.type === activeTab
        );
  
  const unreadCount = notifs.filter((notif) => !notif.read).length;

  return (
    <Card className="shadow-lg border animate-scale-in">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-semibold text-lg flex items-center">
          <Bell className="w-4 h-4 mr-2" />
          Notifications
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} new
            </Badge>
          )}
        </h3>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-4 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
            <TabsTrigger value="message" className="flex-1">Messages</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value={activeTab} className="pt-2 m-0">
          <ScrollArea className="h-[300px] px-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-3 mb-2 rounded-md border ${
                    !notification.read 
                      ? "bg-accent/30 border-accent" 
                      : "bg-card hover:bg-accent/10"
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center mb-1">
                      {notification.type === "message" ? (
                        <MessageSquare className="w-4 h-4 mr-1 text-blue-500" />
                      ) : notification.type === "proposal" ? (
                        <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
                      ) : (
                        <Bell className="w-4 h-4 mr-1 text-amber-500" />
                      )}
                      <span className="font-medium text-sm">{notification.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 line-clamp-2">{notification.description}</p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <Bell className="w-8 h-8 mb-2 opacity-20" />
                <p>No notifications to display</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
      
      <div className="p-2 border-t text-center">
        <button 
          className="text-sm text-primary hover:underline"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Card>
  );
};
