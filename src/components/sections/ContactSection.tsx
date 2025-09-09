"use client";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import Heading from "../ui/Heading";
import Card from "../ui/Card";
import { CONTACT } from "../../constants";

export default function ContactSection() {

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in your services. Can we discuss my project?`;
    const whatsappUrl = `${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailClick = () => {
    const subject = "Inquiry about your services";
    const body = "Hi,\n\nI'm interested in your services and would like to discuss my project requirements.\n\nPlease let me know when would be a good time to connect.\n\nBest regards";
    const emailUrl = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(emailUrl);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="text-sm font-semibold text-yellow-400 bg-yellow-400/10 px-6 py-3 rounded-full border border-yellow-400/20 backdrop-blur-sm flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Get In Touch
            </span>
          </div>
          
          <Heading 
            level={2} 
            size="5xl" 
            className="text-white mb-6 leading-tight"
          >
            Ready to Start Your
            <span className="block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Next Project?
            </span>
          </Heading>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Get in touch with us directly. We&apos;re here to help you succeed and turn your ideas into reality.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information & Quick Actions */}
          <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Get In Touch</h3>
                <p className="text-slate-400 mb-8">
                  Choose your preferred way to contact us. We&apos;re here to help with your project.
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-6 h-6" />
                  Chat on WhatsApp
                </button>
                
                <button
                  onClick={handleEmailClick}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl flex items-center justify-center gap-3"
                >
                  <Mail className="w-6 h-6" />
                  Send Email
                </button>
              </div>

              {/* Contact Details */}
              <Card className="p-8 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <h4 className="text-xl font-semibold text-white mb-6">Contact Information</h4>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-1">Phone</h5>
                      <p className="text-slate-400">{CONTACT.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-1">Email</h5>
                      <p className="text-slate-400">{CONTACT.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-1">Location</h5>
                      <p className="text-slate-400">{CONTACT.address}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Response Time */}
              <Card className="p-6 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/20">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-white mb-2">Quick Response</h4>
                  <p className="text-slate-300 text-sm">
                    We typically respond within 2-4 hours during business hours
                  </p>
                </div>
              </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
