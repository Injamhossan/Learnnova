import { Github, Linkedin, MessageSquare, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const mentors = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Full Stack Developer",
    company: "Google",
    bio: "Passionate about building scalable web applications and mentoring the next generation of developers.",
    expertise: ["React", "Node.js", "TypeScript"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    socials: { github: "#", linkedin: "#", twitter: "#" }
  },
  {
    id: 2,
    name: "David Chen",
    role: "Lead Product Designer",
    company: "Apple",
    bio: "Designing intuitive and delightful user experiences for millions of users worldwide.",
    expertise: ["UI/UX", "Figma", "Prototyping"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    socials: { github: "#", linkedin: "#", twitter: "#" }
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Data Scientist",
    company: "Netflix",
    bio: "Uncovering insights from data to drive business decisions and personalize user experiences.",
    expertise: ["Python", "Machine Learning", "Data Analysis"],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
    socials: { github: "#", linkedin: "#", twitter: "#" }
  },
  {
      id: 4,
      name: "Michael Wilson",
      role: "DevOps Engineer",
      company: "Amazon",
      bio: "Automating infrastructure and ensuring reliable software delivery pipelines.",
      expertise: ["AWS", "Docker", "Kubernetes"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
      socials: { github: "#", linkedin: "#", twitter: "#" }
    },
    {
      id: 5,
      name: "Jessica Lee",
      role: "Frontend Architect",
      company: "Spotify",
      bio: "Crafting performant and accessible web interfaces with modern frontend technologies.",
      expertise: ["Vue.js", "Accessibility", "Performance"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
      socials: { github: "#", linkedin: "#", twitter: "#" }
    },
    {
      id: 6,
      name: "Alex Turner",
      role: "Mobile Developer",
      company: "Uber",
      bio: "Building robust and smooth mobile experiences for millions of riders and drivers.",
      expertise: ["React Native", "Swift", "Kotlin"],
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
      socials: { github: "#", linkedin: "#", twitter: "#" }
    }
];

export default function MentorsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl font-satoshi mb-4">
                Learn from the Best
            </h1>
            <p className="text-lg leading-8 text-slate-600 font-manrope">
                Connect with industry experts from top companies who are ready to guide you on your journey.
            </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {mentors.map((mentor) => (
                <div key={mentor.id} className="group relative flex flex-col items-center bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-yellow-400/30">
                    
                    {/* Image */}
                    <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-slate-50 group-hover:scale-105 transition-transform duration-300 shadow-inner">
                        <Image 
                            src={mentor.image} 
                            alt={mentor.name} 
                            fill 
                            className="object-cover" 
                        />
                    </div>

                    {/* Content */}
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-slate-900 font-satoshi mb-1">{mentor.name}</h3>
                        <p className="text-sm font-medium text-yellow-600 mb-2">{mentor.role} @ {mentor.company}</p>
                        <p className="text-slate-500 text-sm font-manrope line-clamp-2">{mentor.bio}</p>
                    </div>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {mentor.expertise.map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full border border-slate-200">
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* Action & Socials */}
                    <div className="w-full mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                        <div className="flex gap-3">
                            <Link href={mentor.socials.github} className="text-slate-400 hover:text-slate-900 transition-colors">
                                <Github className="w-5 h-5" />
                            </Link>
                            <Link href={mentor.socials.linkedin} className="text-slate-400 hover:text-blue-600 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link href={mentor.socials.twitter} className="text-slate-400 hover:text-sky-500 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl active:scale-95">
                            <MessageSquare className="w-4 h-4" />
                            Book Session
                        </button>
                    </div>

                </div>
            ))}
        </div>

      </div>
    </div>
  );
}
