function About() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto text-center">
      <div className="inline-block p-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 mb-8">
        <div className="px-4 py-1 rounded-full bg-background text-[10px] font-black uppercase tracking-[0.2em] text-primary">Our Philosophy</div>
      </div>
      <p className="text-2xl md:text-3xl font-black text-foreground/80 leading-snug tracking-tight text-balance">
        We believe in <span className="text-primary italic">time-optimized learning.</span> Our tool is designed to give you the data you need to master your content consumption without the fluff.
      </p>
    </section>
  );
}

export default About;
