import { useState, useEffect } from "react";
import { supabase, type Message } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  Mail, 
  MailOpen, 
  Reply, 
  Search, 
  Filter, 
  Calendar,
  User,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Code2
} from "lucide-react";
import { format } from "date-fns";

export function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "read" | "replied">("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error fetching messages",
        description: "Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (messageId: string, status: Message['status']) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ status })
        .eq('id', messageId);

      if (error) throw error;

      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, status } : msg
        )
      );

      if (selectedMessage?.id === messageId) {
        setSelectedMessage(prev => prev ? { ...prev, status } : null);
      }

      toast({
        title: "Status updated",
        description: `Message marked as ${status}.`,
      });
    } catch (error) {
      console.error('Error updating message status:', error);
      toast({
        title: "Error updating status",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || message.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: messages.length,
    unread: messages.filter(m => m.status === 'unread').length,
    read: messages.filter(m => m.status === 'read').length,
    replied: messages.filter(m => m.status === 'replied').length,
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'unread':
        return <Mail className="h-4 w-4" />;
      case 'read':
        return <MailOpen className="h-4 w-4" />;
      case 'replied':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Message['status']) => {
    switch (status) {
      case 'unread':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'read':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'replied':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Header */}
      <header className="border-b border-border/30 bg-card/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg">
                <Code2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Portfolio Dashboard
                </h1>
                <p className="text-sm text-muted-foreground font-medium">
                  Manage your messages and portfolio
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-card via-card to-card/90 border-border/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                All time messages
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card via-card to-card/90 border-border/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <Mail className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.unread}</div>
              <p className="text-xs text-muted-foreground">
                Need attention
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card via-card to-card/90 border-border/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Read</CardTitle>
              <MailOpen className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.read}</div>
              <p className="text-xs text-muted-foreground">
                Reviewed messages
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card via-card to-card/90 border-border/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Replied</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.replied}</div>
              <p className="text-xs text-muted-foreground">
                Completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Messages List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <Card className="bg-gradient-to-br from-card via-card to-card/90 border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters & Search
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-10"
                    />
                  </div>
                  <Tabs value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="unread">Unread</TabsTrigger>
                      <TabsTrigger value="read">Read</TabsTrigger>
                      <TabsTrigger value="replied">Replied</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardContent>
            </Card>

            {/* Messages */}
            <div className="space-y-4">
              {filteredMessages.length === 0 ? (
                <Card className="bg-gradient-to-br from-card via-card to-card/90 border-border/20">
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No messages found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm || statusFilter !== "all" 
                        ? "Try adjusting your filters or search terms."
                        : "Messages will appear here when people contact you through your portfolio."
                      }
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredMessages.map((message) => (
                  <Card 
                    key={message.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-border/20 ${
                      selectedMessage?.id === message.id 
                        ? 'ring-2 ring-primary/50 bg-gradient-to-br from-primary/5 via-card to-card/90' 
                        : 'bg-gradient-to-br from-card via-card to-card/90 hover:from-card/95'
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{message.name}</h3>
                            <p className="text-sm text-muted-foreground">{message.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getStatusColor(message.status)} border`}>
                            {getStatusIcon(message.status)}
                            <span className="ml-1 capitalize">{message.status}</span>
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(message.created_at), 'MMM d, yyyy')}
                          </span>
                        </div>
                      </div>
                      <h4 className="font-medium mb-2">{message.subject}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {message.message}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-1">
            {selectedMessage ? (
              <Card className="bg-gradient-to-br from-card via-card to-card/90 border-border/20 sticky top-24">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Message Details
                    </CardTitle>
                    <Badge className={`${getStatusColor(selectedMessage.status)} border`}>
                      {getStatusIcon(selectedMessage.status)}
                      <span className="ml-1 capitalize">{selectedMessage.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">From</label>
                      <p className="font-semibold">{selectedMessage.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Subject</label>
                      <p className="font-medium">{selectedMessage.subject}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Date</label>
                      <p className="text-sm flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(selectedMessage.created_at), 'PPP p')}
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Message</label>
                      <div className="mt-2 p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Actions</h4>
                    <div className="flex flex-col gap-2">
                      {selectedMessage.status === 'unread' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateMessageStatus(selectedMessage.id, 'read')}
                          className="justify-start"
                        >
                          <MailOpen className="h-4 w-4 mr-2" />
                          Mark as Read
                        </Button>
                      )}
                      
                      {selectedMessage.status !== 'replied' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateMessageStatus(selectedMessage.id, 'replied')}
                          className="justify-start"
                        >
                          <Reply className="h-4 w-4 mr-2" />
                          Mark as Replied
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`)}
                        className="justify-start"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Reply via Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-to-br from-card via-card to-card/90 border-border/20">
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a message</h3>
                  <p className="text-muted-foreground">
                    Click on a message from the list to view its details.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}