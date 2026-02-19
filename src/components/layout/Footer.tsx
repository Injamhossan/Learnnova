import Link from 'next/link';
import Image from 'next/image';
import NavLogo from '@/assets/NavLogo.png';

const footerSections = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "/#features" },
      { name: "Courses", href: "/#courses" },
      { name: "Pricing", href: "/#pricing" },
      { name: "Enterprise", href: "/enterprise" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "/help" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-24 pb-8" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="xl:grid xl:grid-cols-3 xl:gap-8 border-b border-slate-800 pb-16">
          
          {/* Logo & Subscribe Section */}
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src={NavLogo} 
                alt="EduFlow Logo" 
                width={120} 
                height={40} 
                className="h-10 w-auto object-contain brightness-0 invert" 
              />
            </Link>
            <p className="text-sm leading-6 text-slate-400 font-manrope pr-8">
              Empowering learners worldwide with accessible, high-quality education.
            </p>
            
            <form className="mt-6 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-lg border-0 bg-slate-800 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:w-64 sm:text-sm sm:leading-6 font-manrope"
                placeholder="Enter your email"
              />
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-yellow-500 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 font-satoshi"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {/* Navigation Links Grid */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white font-satoshi">{footerSections[0].title}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerSections[0].links.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-slate-400 hover:text-white transition-colors font-manrope">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white font-satoshi">{footerSections[1].title}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerSections[1].links.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-slate-400 hover:text-white transition-colors font-manrope">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white font-satoshi">{footerSections[2].title}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerSections[2].links.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-slate-400 hover:text-white transition-colors font-manrope">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
        </div>

        {/* Copyright */}
        <div className="mt-8">
          <p className="text-center text-xs leading-5 text-slate-500 font-manrope">
            &copy; {new Date().getFullYear()} Learnova. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
