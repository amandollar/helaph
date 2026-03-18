import Image from "next/image";
import Card from "../ui/Card";
import Heading from "../ui/Heading";
import { SERVICES, STATS } from "../../constants";

export default function StatsSection() {
  return (
    <section className="w-full flex justify-center py-12">
      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* Services */}
        <Card animated className="flex flex-col">
          <Heading level={2} size="xl" className="mb-4">
            Services
          </Heading>
          <div className="flex flex-wrap gap-3">
            {SERVICES.map((service, index) => (
              <span 
                key={service}
                className={`px-4 py-2 rounded-full text-sm font-indie font-normal ${
                  index % 3 === 0 
                    ? "bg-black text-white" 
                    : index % 3 === 1 
                    ? "bg-white border border-gray-300 text-black"
                    : "bg-yellow-400 text-black"
                }`}
              >
                {service}
              </span>
            ))}
          </div>
        </Card>

        {/* Stats */}
        <div className="flex flex-col gap-6">
          <Card animated>
            <Heading level={3} size="3xl" className="text-slate-800">
              {STATS.users}
            </Heading>
            <p className="text-sm mt-2 font-indie font-normal tracking-wide text-slate-600">
              users have interacted with websites built by us.
            </p>
          </Card>
          
          <Card animated>
            <Heading level={3} size="3xl" className="text-slate-800">
              7
            </Heading>
            <p className="text-sm mt-2 font-indie font-normal tracking-wide text-slate-600">
              successful projects delivered to satisfied clients.
            </p>
          </Card>
        </div>

        {/* Testimonial */}
        <Card animated padding="lg" className="flex flex-col justify-between">
          {/* Quote */}
          <div className="mb-6">
            <div className="flex items-start mb-4">
              <svg className="w-8 h-8 text-yellow-400 mr-3 mt-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
              <div>
                <p className="text-lg font-indie font-normal tracking-wide text-slate-700 leading-relaxed">
                  &ldquo;The final product exceeded my expectations. Impressed with the results!&rdquo;
                </p>
              </div>
            </div>
          </div>
          
          {/* Author Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                <Image
                  src="https://i.pravatar.cc/40?img=1"
                  alt="Sarah Johnson"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border-3 border-white shadow-md"
                />
                <Image
                  src="https://i.pravatar.cc/40?img=2"
                  alt="Mike Chen"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border-3 border-white shadow-md"
                />
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-bold border-3 border-white shadow-md">
                  AS
                </div>
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm font-indie font-normal text-slate-600">5.0</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
