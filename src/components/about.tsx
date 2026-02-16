export function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg">
            Passionate about creating exceptional digital experiences
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              I'm a software developer with a passion for creating clean, efficient, and user-friendly applications. 
              With expertise in modern web technologies, I enjoy turning complex problems into simple, beautiful solutions.
            </p>
            <p className="text-lg leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open source projects, 
              or sharing knowledge with the developer community.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-secondary rounded-full text-sm font-medium">
                Full Stack Development
              </div>
              <div className="px-4 py-2 bg-secondary rounded-full text-sm font-medium">
                UI/UX Design
              </div>
              <div className="px-4 py-2 bg-secondary rounded-full text-sm font-medium">
                Problem Solving
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-2xl flex items-center justify-center">
              <div className="text-6xl">👨‍💻</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}