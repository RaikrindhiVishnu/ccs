import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Search } from "lucide-react";

/**
 * DesignSystem Page
 * Use this page to build and preview the design system components.
 */
const DesignSystem = () => {
  return (
    <div className="container mx-auto p-8">
      <header className="mb-12">
        <Typography variant="h1" className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Design System
        </Typography>
        <Typography variant="p" className="text-xl text-muted-foreground mt-2">
          Building the foundation of GLC-UI.
        </Typography>
      </header>

      <section className="grid gap-8">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <Typography variant="h2" className="text-2xl font-semibold mb-4">Typography</Typography>
          <div className="space-y-4">
            <Typography variant="h1" className="text-4xl font-bold">Heading 1</Typography>
            <Typography variant="h2" className="text-3xl font-bold">Heading 2</Typography>
            <Typography variant="h3" className="text-2xl font-bold">Heading 3</Typography>
            <Typography variant="p" className="text-base text-card-foreground">
              This is a standard paragraph with some text to demonstrate typography.
            </Typography>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <Typography variant="h2" className="text-2xl font-semibold mb-4">Colors</Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-20 rounded bg-primary flex items-center justify-center text-primary-foreground font-medium">Primary</div>
            <div className="h-20 rounded bg-secondary flex items-center justify-center text-secondary-foreground font-medium">Secondary</div>
            <div className="h-20 rounded bg-accent flex items-center justify-center text-accent-foreground font-medium">Accent</div>
            <div className="h-20 rounded bg-destructive flex items-center justify-center text-destructive-foreground font-medium">Destructive</div>
          </div>
        </div>

        {/* Card Component Section */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <Typography variant="h2" className="text-2xl font-semibold mb-4">Cards</Typography>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Standard Card Use-Case */}
            <Card className="border">
              <CardHeader>
                <CardTitle>Standard Card Layout</CardTitle>
                <CardDescription>This showcases the standard Shadcn UI-style architecture</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm p-4 bg-gray-50 border rounded text-muted">
                  The `CardContent` usually holds the main body, form elements, or list of the component.
                  Padding is automatically handled to align with the Header and Footer.
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <button className="px-4 py-2 border rounded text-sm text-foreground hover:bg-gray-100 transition-colors">Cancel</button>
                <button className="px-4 py-2 border-none bg-primary text-white rounded text-sm hover:opacity-90 transition-opacity">Submit</button>
              </CardFooter>
            </Card>

            {/* Custom Radius Card Use-Case */}
            <Card className="rounded-8 border flex items-center justify-center p-6 text-center shadow-lg">
              <div>
                <Typography variant="p" className="font-semibold mb-2">Custom Border Radius</Typography>
                <Typography variant="p" className="text-sm text-muted">
                  This card utilizes the `rounded-8` (or `rounded-4xl`) class to automatically push the radius to a customized 32px based on the default `4px` base scaling multiplier!
                </Typography>
              </div>
            </Card>
          </div>
        </div>

        {/* Input Component Section */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <Typography variant="h2" className="text-2xl font-semibold mb-4">Input Fields</Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 rounded-xl border p-6 bg-white overflow-hidden">
              <Typography variant="p" className="font-semibold text-sm mb-4">Default Variant (Light Gray)</Typography>
              <Input
                label="Email Address"
                placeholder="Enter your email"
                icon={<Mail size={16} strokeWidth={1.8} />}
              />
              <div className="h-4" />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon={<Lock size={16} strokeWidth={1.8} />}
              />
            </div>
            
            <div className="space-y-4 rounded-xl border p-6" style={{ background: "var(--background)" }}>
              <Typography variant="p" className="font-semibold text-sm mb-4">White Variant</Typography>
              <Input
                variant="white"
                label="Search anything"
                placeholder="Search..."
                icon={<Search size={16} strokeWidth={1.8} />}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignSystem;
