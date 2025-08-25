import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Mail, Send, User, MessageSquare, Code2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('messages')
        .insert([data]);

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      form.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="relative overflow-hidden border border-border/20 bg-gradient-to-br from-card/95 via-card to-card/90 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500">
      {/* Programming Stamp */}
      <div className="absolute -top-3 -right-3 p-3 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-2xl shadow-lg border border-primary/30 rotate-12 hover:rotate-0 transition-transform duration-500">
        <Code2 className="h-5 w-5 text-primary-foreground" />
      </div>

      <CardHeader className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg">
            <Mail className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
              Get In Touch
            </CardTitle>
            <CardDescription className="text-muted-foreground font-medium">
              Let's discuss your next project
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-semibold">
                      <User className="h-4 w-4 text-primary" />
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your full name" 
                        className="h-12 border-border/50 focus:border-primary/50 transition-colors"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-semibold">
                      <Mail className="h-4 w-4 text-primary" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="your.email@example.com" 
                        className="h-12 border-border/50 focus:border-primary/50 transition-colors"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 font-semibold">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    Subject
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="What's this about?" 
                      className="h-12 border-border/50 focus:border-primary/50 transition-colors"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 font-semibold">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell me about your project, ideas, or just say hello!"
                      className="min-h-[120px] border-border/50 focus:border-primary/50 transition-colors resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary via-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 hover:shadow-xl transition-all duration-300 group"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}