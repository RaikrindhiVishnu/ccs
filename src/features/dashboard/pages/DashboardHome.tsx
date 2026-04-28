import { Typography } from "@/components/ui/typography";

const DashboardHome = () => {
  return (
    <div className="p-8">
      <Typography variant="h1" className="text-3xl font-bold">Welcome to the Dashboard</Typography>
      <Typography variant="p" className="text-muted-foreground mt-2"> This is a protected route.</Typography>
    </div>
  );
};

export default DashboardHome;
