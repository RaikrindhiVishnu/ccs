/**
 * DesignSystem Page
 * Use this page to build and preview the design system components.
 */
const DesignSystem = () => {
  return (
    <div className="container mx-auto p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Design System
        </h1>
        <p className="text-xl text-muted-foreground mt-2">
          Building the foundation of GLC-UI.
        </p>
      </header>

      <section className="grid gap-8">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Typography</h2>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Heading 1</h1>
            <h2 className="text-3xl font-bold">Heading 2</h2>
            <h3 className="text-2xl font-bold">Heading 3</h3>
            <p className="text-base text-card-foreground">
              This is a standard paragraph with some text to demonstrate typography.
            </p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-20 rounded bg-primary flex items-center justify-center text-primary-foreground font-medium">Primary</div>
            <div className="h-20 rounded bg-secondary flex items-center justify-center text-secondary-foreground font-medium">Secondary</div>
            <div className="h-20 rounded bg-accent flex items-center justify-center text-accent-foreground font-medium">Accent</div>
            <div className="h-20 rounded bg-destructive flex items-center justify-center text-destructive-foreground font-medium">Destructive</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignSystem;
