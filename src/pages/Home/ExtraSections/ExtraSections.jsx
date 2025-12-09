import React from "react";
import { ArrowRight, HelpCircle, PhoneCall } from "lucide-react";

export default function ExtraSections() {
  return (
    <div className="w-full mt-20 space-y-20">

  
      <section className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">How It Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Follow these 3 simple steps to get started with our platform.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {[ 
            { n: "①", title: "Create an Account", desc: "Sign up using your email to access the dashboard instantly." },
            { n: "②", title: "Customize Your Profile", desc: "Add your details and adjust settings to match your needs." },
            { n: "③", title: "Start Using the Platform", desc: "Explore features and manage everything from one place." }
          ].map((step, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg border border-primary/20 hover:shadow-2xl hover:border-primary transition"
            >
              <div className="text-4xl mb-4 text-primary">{step.n}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
          Find quick answers to the most common questions.
        </p>

        <div className="space-y-4">
          {[
            { q: "How do I get started?", a: "Simply create an account and access your dashboard instantly." },
            { q: "Is this service free?", a: "Yes! You can use the basic features completely free." },
            { q: "Can I upgrade later?", a: "Absolutely. You can upgrade or cancel anytime." },
            { q: "Where can I get support?", a: "Our support team is available 24/7 to assist you." },
          ].map((item, index) => (
            <div key={index} className="p-5 border rounded-xl bg-white shadow-sm border-primary/20">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">{item.q}</h4>
                  <p className="text-gray-600 mt-1">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto text-center px-4 py-16 bg-primary rounded-3xl shadow-xl text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Have Any Questions?</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Our team is always ready to help. Contact us anytime.
        </p>

        <a
          href="mailto:contact@company.com"
          className="inline-flex items-center gap-2 text-lg font-semibold bg-white text-primary px-8 py-3 rounded-xl shadow hover:bg-gray-100 transition"
        >
          <PhoneCall className="w-6 h-6" />
          Contact Us
        </a>
      </section>

    </div>
  );
}
