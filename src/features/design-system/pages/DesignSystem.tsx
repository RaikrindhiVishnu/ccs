import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import AgentForm from "@/features/role-manager/pages/AgentForm";
import { Typography } from "@/components/ui/typography";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Lock,
  Search,
  LayoutDashboard,
  Download,
  ArrowRight,
  Plus,
} from "lucide-react";
import {
  PillDropdown,
  WeekDropdown,
  TagPillDropdown,
  SquareDropdown,
  CheckboxDropdown,
} from "@/components/ui/Dropdown";
/**
 * DesignSystem Page
 * Use this page to build and preview the design system components.
 */
const DesignSystem = () => {
  return (
    <div className="container mx-auto p-8">
      <header className="mb-12">
        <Typography
          variant="h1"
          className="text-4xl font-extrabold tracking-tight lg:text-5xl"
        >
          Design System
        </Typography>
        <Typography variant="p" className="text-xl text-muted-foreground mt-2">
          Building the foundation of GLC-UI.
        </Typography>
      </header>

      <section className="grid gap-8">
        {/* ── Typography ── */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <Typography variant="h2" className="text-2xl font-semibold mb-4">
            Typography
          </Typography>
          <div className="space-y-4">
            <Typography variant="h1" className="text-4xl font-bold">
              Heading 1
            </Typography>
            <Typography variant="h2" className="text-3xl font-bold">
              Heading 2
            </Typography>
            <Typography variant="h3" className="text-2xl font-bold">
              Heading 3
            </Typography>
            <Typography variant="p" className="text-base text-card-foreground">
              This is a standard paragraph with some text to demonstrate
              typography.
            </Typography>
          </div>
        </div>

        {/* ── Colors ── */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <Typography variant="h2" className="text-2xl font-semibold mb-4">
            Colors
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-20 rounded bg-primary flex items-center justify-center text-primary-foreground font-medium">
              Primary
            </div>
            <div className="h-20 rounded bg-secondary flex items-center justify-center text-secondary-foreground font-medium">
              Secondary
            </div>
            <div className="h-20 rounded bg-accent flex items-center justify-center text-accent-foreground font-medium">
              Accent
            </div>
            <div className="h-20 rounded bg-destructive flex items-center justify-center text-destructive-foreground font-medium">
              Destructive
            </div>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <Typography variant="h2" className="text-2xl font-semibold mb-4">
            Cards
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border">
              <CardHeader>
                <CardTitle>Standard Card Layout</CardTitle>
                <CardDescription>
                  This showcases the standard Shadcn UI-style architecture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm p-4 bg-gray-50 border rounded text-muted">
                  The `CardContent` usually holds the main body, form elements,
                  or list of the component. Padding is automatically handled to
                  align with the Header and Footer.
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <button className="px-4 py-2 border rounded text-sm text-foreground hover:bg-gray-100 transition-colors">
                  Cancel
                </button>
                <button className="px-4 py-2 border-none bg-primary text-white rounded text-sm hover:opacity-90 transition-opacity">
                  Submit
                </button>
              </CardFooter>
            </Card>

            <Card className="rounded-8 border flex items-center justify-center p-6 text-center shadow-lg">
              <div>
                <Typography variant="p" className="font-semibold mb-2">
                  Custom Border Radius
                </Typography>
                <Typography variant="p" className="text-sm text-muted">
                  This card utilizes the `rounded-8` class to automatically push
                  the radius to a customized 32px.
                </Typography>
              </div>
            </Card>
          </div>
        </div>

        {/* ── Inputs ── */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <Typography variant="h2" className="text-2xl font-semibold mb-4">
            Input Fields
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 rounded-xl border p-6 bg-white overflow-hidden">
              <Typography variant="p" className="font-semibold text-sm mb-4">
                Default Variant (Light Gray)
              </Typography>
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
            <div
              className="space-y-4 rounded-xl border p-6"
              style={{ background: "var(--background)" }}
            >
              <Typography variant="p" className="font-semibold text-sm mb-4">
                White Variant
              </Typography>
              <Input
                variant="white"
                label="Search anything"
                placeholder="Search..."
                icon={<Search size={16} strokeWidth={1.8} />}
              />
            </div>
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <Typography variant="h2" className="text-2xl font-semibold mb-6">
            Buttons
          </Typography>

          <div className="grid gap-8">
            {/* Solid */}
            <div>
              <Typography
                variant="p"
                className="text-sm font-semibold text-muted mb-3"
              >
                Solid
              </Typography>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Login</Button>
                <Button variant="secondary">View</Button>
                <Button
                  variant="navy"
                  badgeIcon={<LayoutDashboard size={16} />}
                >
                  Dashboard
                </Button>
                <Button variant="purple">Edit</Button>
                <Button variant="lime">Amount</Button>
              </div>
            </div>

            {/* Solid — small / compact */}
            <div>
              <Typography
                variant="p"
                className="text-sm font-semibold text-muted mb-3"
              >
                Solid — Small / Compact
              </Typography>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary-sm">GIS MAP ACTIVITY</Button>
                <Button variant="dark" showDot>
                  Government Road
                </Button>
              </div>
            </div>

            {/* Outline */}
            <div>
              <Typography
                variant="p"
                className="text-sm font-semibold text-muted mb-3"
              >
                Outline
              </Typography>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="outline-primary">Cancel</Button>
                <Button variant="outline-dark">View Reason</Button>
                <Button variant="outline-danger">Reject</Button>
                <Button variant="outline-square">Connect to GIS</Button>
                <Button variant="export" rightIcon={<Download size={14} />}>
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Gradient */}
            <div>
              <Typography
                variant="p"
                className="text-sm font-semibold text-muted mb-3"
              >
                Gradient
              </Typography>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="gradient-blue">Choose File</Button>
                <Button variant="gradient-dark">Enter Audit Room</Button>
                <Button
                  variant="gradient-dark-sm"
                  rightIcon={<ArrowRight size={13} />}
                >
                  View Profile
                </Button>
              </div>
            </div>

            {/* With Icons */}
            <div>
              <Typography
                variant="p"
                className="text-sm font-semibold text-muted mb-3"
              >
                With Icons
              </Typography>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" leftIcon={<Plus size={15} />}>
                  Add Record
                </Button>
                <Button
                  variant="outline-primary"
                  rightIcon={<ArrowRight size={14} />}
                >
                  Next
                </Button>
                <Button variant="secondary" leftIcon={<Download size={14} />}>
                  Download
                </Button>
              </div>
            </div>

            {/* States */}
            <div>
              <Typography
                variant="p"
                className="text-sm font-semibold text-muted mb-3"
              >
                States
              </Typography>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" loading>
                  Saving...
                </Button>
                <Button variant="primary" disabled>
                  Disabled
                </Button>
                <Button variant="outline-primary" disabled>
                  Disabled Outline
                </Button>
              </div>
            </div>

            {/* Full Width */}
            <div>
              <Typography
                variant="p"
                className="text-sm font-semibold text-muted mb-3"
              >
                Full Width
              </Typography>
              <div className="flex flex-col gap-3">
                <Button variant="primary" fullWidth>
                  Submit Form
                </Button>
                <Button variant="outline-primary" fullWidth>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* ── Dropdowns ── */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <Typography variant="h2" className="text-2xl font-semibold mb-6">
            Dropdowns
          </Typography>

          <div className="grid gap-8">
            {/* Pill Dropdown */}
            <div className="space-y-3">
              <Typography
                variant="p"
                className="text-sm font-semibold text-muted"
              >
                Pill Dropdown
              </Typography>

              <div className="flex flex-wrap gap-4 items-center">
                <PillDropdown options={["January", "February", "March"]} />
              </div>
            </div>

            {/* Week Dropdown */}
            <div className="space-y-3">
              <Typography
                variant="p"
                className="text-sm font-semibold text-muted"
              >
                Week Dropdown
              </Typography>

              <div className="flex flex-wrap gap-4 items-center">
                <WeekDropdown />
              </div>
            </div>

            {/* Tag Pill Dropdown */}
            <div className="space-y-3">
              <Typography
                variant="p"
                className="text-sm font-semibold text-muted"
              >
                Tag Pill Dropdown
              </Typography>

              <div className="flex flex-wrap gap-4 items-center">
                <TagPillDropdown
                  label="Filters"
                  options={["Active", "Pending", "Completed"]}
                />
              </div>
            </div>

            {/* Square Dropdown */}
            <div className="space-y-3">
              <Typography
                variant="p"
                className="text-sm font-semibold text-muted"
              >
                Multi Select
              </Typography>

              <div className="flex flex-wrap gap-4 items-center">
                <SquareDropdown options={["Rice", "Corn", "Cotton", "Wheat"]} />
              </div>
            </div>

            {/* Checkbox Dropdown */}
            <div className="space-y-3">
              <Typography
                variant="p"
                className="text-sm font-semibold text-muted"
              >
                Auto Complete
              </Typography>

              <div className="flex flex-wrap gap-4 items-center">
                <CheckboxDropdown
                  options={["Rice", "Corn", "Cotton", "Wheat", "Sun Flower"]}
                />
              </div>
            </div>
          </div>
        </div>
        {/* ── Agent Creation UI ── */}

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <Typography variant="h2" className="text-2xl font-semibold mb-6">
            Agent Creation UI
          </Typography>

          <AgentForm />
        </div>
      </section>
    </div>
  );
};

export default DesignSystem;
