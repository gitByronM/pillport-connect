
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-pharma-700">PharmaConnect</h3>
            <p className="text-muted-foreground">
              Digitizing pharmacy operations and bringing healthcare closer to people.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-pharma-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-pharma-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-pharma-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold uppercase tracking-wider text-muted-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-foreground hover:text-pharma-600 transition-colors">Products</Link></li>
              <li><Link to="/services" className="text-foreground hover:text-pharma-600 transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-foreground hover:text-pharma-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-foreground hover:text-pharma-600 transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="text-foreground hover:text-pharma-600 transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold uppercase tracking-wider text-muted-foreground">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/delivery" className="text-foreground hover:text-pharma-600 transition-colors">Prescription Delivery</Link></li>
              <li><Link to="/consultation" className="text-foreground hover:text-pharma-600 transition-colors">Online Consultation</Link></li>
              <li><Link to="/reminders" className="text-foreground hover:text-pharma-600 transition-colors">Medication Reminders</Link></li>
              <li><Link to="/rewards" className="text-foreground hover:text-pharma-600 transition-colors">Loyalty Rewards</Link></li>
              <li><Link to="/guidance" className="text-foreground hover:text-pharma-600 transition-colors">Pharmacist Guidance</Link></li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold uppercase tracking-wider text-muted-foreground">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-pharma-600" />
                <span>123 Health Street, Medical District</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-pharma-600" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-pharma-600" />
                <span>contact@pharmaconnect.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-8 mt-8 border-t border-gray-100 text-center text-muted-foreground">
          <p>© {currentYear} PharmaConnect. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4 text-sm">
            <Link to="/privacy" className="hover:text-pharma-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-pharma-600 transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-pharma-600 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
