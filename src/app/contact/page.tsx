import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="relative isolate bg-white pt-24 pb-12 sm:pt-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        
        {/* Left Column - Contact Info */}
        <div className="relative px-6 pb-20 lg:static lg:px-8 lg:py-24">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-slate-50 ring-1 ring-slate-900/10 lg:w-1/2">
                <div className="absolute -left-56 top-[calc(100%-13rem)] transform-gpu blur-3xl lg:left-[max(-14rem,calc(100%-59rem))] lg:top-[calc(50%-7rem)]" aria-hidden="true">
                    <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-yellow-200 to-yellow-400 opacity-20" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-satoshi">Get in touch</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600 font-manrope">
              We'd love to hear from you. Whether you have a question about our courses, pricing, or just want to say hi, our team is ready to answer all your questions.
            </p>
            
            <dl className="mt-10 space-y-4 text-base leading-7 text-slate-600 font-manrope">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <MapPin className="h-7 w-6 text-slate-400" aria-hidden="true" />
                </dt>
                <dd>545 Mavis Island<br />Chicago, IL 99191</dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <Phone className="h-7 w-6 text-slate-400" aria-hidden="true" />
                </dt>
                <dd><a className="hover:text-slate-900" href="tel:+1 (555) 234-5678">+1 (555) 234-5678</a></dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <Mail className="h-7 w-6 text-slate-400" aria-hidden="true" />
                </dt>
                <dd><a className="hover:text-slate-900" href="mailto:hello@example.com">hello@example.com</a></dd>
              </div>
            </dl>

          </div>
        </div>

        {/* Right Column - Contact Form */}
        <form action="#" method="POST" className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              
              <div>
                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-slate-900">First name</label>
                <div className="mt-2.5">
                  <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6 font-manrope" />
                </div>
              </div>

              <div>
                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-slate-900">Last name</label>
                <div className="mt-2.5">
                  <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6 font-manrope" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900">Email</label>
                <div className="mt-2.5">
                  <input type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6 font-manrope" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-slate-900">Phone number</label>
                <div className="mt-2.5">
                  <input type="tel" name="phone-number" id="phone-number" autoComplete="tel" className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6 font-manrope" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-slate-900">Message</label>
                <div className="mt-2.5">
                  <textarea name="message" id="message" rows={4} className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6 font-manrope" defaultValue={""} />
                </div>
              </div>

            </div>
            
            <div className="mt-8 flex justify-end">
              <button type="submit" className="rounded-md bg-yellow-400 px-3.5 py-2.5 text-center text-sm font-semibold text-slate-900 shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 transition-colors font-satoshi">
                Send message
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}
