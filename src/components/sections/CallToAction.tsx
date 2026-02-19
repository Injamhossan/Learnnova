import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-slate-900 px-6 py-12 shadow-2xl rounded-3xl sm:px-12 lg:py-16">
          
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-satoshi">
              Ready to start your journey?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300 font-manrope">
              Join thousands of learners already transforming their careers on EduFlow. Your first course is on us.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-lg bg-yellow-500 px-8 py-3.5 text-sm font-bold text-slate-900 shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 font-satoshi"
              >
                Get Started for Free
              </Link>
            </div>
          </div>
          
          {/* Decorative background effects could go here */}
          
        </div>
      </div>
    </section>
  );
}
