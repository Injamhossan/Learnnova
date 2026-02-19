import { ArrowRight, Check, X } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: 'Free',
    id: 'tier-free',
    href: '#',
    price: '$0',
    description: 'Perfect for getting started with your learning journey.',
    features: ['Access to 5 free courses', 'Community support', 'Basic coding exercises', 'Mobile app access'],
    featured: false,
    cta: 'Start Learning'
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '#',
    price: '$29',
    description: 'Unlock unlimited access to all courses and premium features.',
    features: [
      'Unlimited access to 1,200+ courses',
      'Certificate of completion',
      'Downloadable resources',
      'Priority email support',
      'Offline viewing',
      'Weekly live Q&A sessions'
    ],
    featured: true,
    cta: 'Get Started Pro'
  },
  {
    name: 'Team',
    id: 'tier-team',
    href: '#',
    price: '$99',
    description: 'Empower your team with enterprise-grade learning tools.',
    features: [
      'Everything in Pro',
      'Team analytics dashboard',
      'Single Sign-On (SSO)',
      'Dedicated account manager',
      'Custom learning paths',
      'API access'
    ],
    featured: false,
    cta: 'Contact Sales'
  },
]

export default function PricingPage() {
  return (
    <div className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-yellow-600 font-satoshi">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl font-satoshi">
                Invest in your future, <br className="hidden sm:block" />
                at a price that makes sense.
            </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-600 font-manrope">
            Choose the plan that fits your learning goals. Whether you're a solo learner or a team leader, we have a solution for you.
        </p>

        {/* Pricing Cards */}
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {tiers.map((tier, tierIdx) => (
                <div 
                    key={tier.id}
                    className={`flex flex-col justify-between rounded-3xl p-8 xl:p-10 transition-all duration-300 ${
                        tier.featured 
                        ? 'bg-white ring-2 ring-yellow-400 shadow-xl scale-105 z-10' 
                        : 'bg-white ring-1 ring-slate-200 shadow-sm hover:shadow-md hover:ring-slate-300'
                    }`}
                >
                    <div>
                        <div className="flex items-center justify-between gap-x-4">
                            <h3 id={tier.id} className="text-lg font-bold leading-8 text-slate-900">
                                {tier.name}
                            </h3>
                            {tier.featured && (
                                <span className="rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-semibold leading-5 text-yellow-600 ring-1 ring-inset ring-yellow-600/20">
                                    Most Popular
                                </span>
                            )}
                        </div>
                        <p className="mt-4 text-sm leading-6 text-slate-500">{tier.description}</p>
                        <p className="mt-6 flex items-baseline gap-x-1">
                            <span className="text-4xl font-bold tracking-tight text-slate-900">{tier.price}</span>
                            <span className="text-sm font-semibold leading-6 text-slate-500">/month</span>
                        </p>
                        <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-slate-600">
                            {tier.features.map((feature) => (
                                <li key={feature} className="flex gap-x-3">
                                    <Check className="h-6 w-5 flex-none text-yellow-500" aria-hidden="true" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link
                        href={tier.href}
                        aria-describedby={tier.id}
                        className={`mt-8 block rounded-xl py-3 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all ${
                            tier.featured 
                            ? 'bg-yellow-400 text-slate-900 shadow-lg shadow-yellow-400/20 hover:bg-yellow-500 focus-visible:outline-yellow-400' 
                            : 'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-900'
                        }`}
                    >
                        {tier.cta}
                    </Link>
                </div>
            ))}
        </div>

        {/* FAQ Section Preview */}
        <div className="mt-24 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 font-satoshi">Frequently Asked Questions</h3>
            <dl className="grid grid-cols-1 gap-8 md:grid-cols-2 text-left max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <dt className="font-bold text-slate-900 mb-2">Can I cancel anytime?</dt>
                    <dd className="text-slate-600 text-sm">Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.</dd>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <dt className="font-bold text-slate-900 mb-2">Do you offer student discounts?</dt>
                    <dd className="text-slate-600 text-sm">Absolutely! Students with a valid .edu email address get 50% off the Pro plan. Contact support to apply.</dd>
                </div>
            </dl>
        </div>

      </div>
    </div>
  )
}
