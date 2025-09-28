import {
    Clock,
    Mail,
    Phone,
    Shield
} from "lucide-react"
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-foreground text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                <img src="/ace.png" alt="eace logo" className="w1-2 h-12" />
                                {/* <Shield className="w-5 h-5 text-white" /> */}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">ACE Sindh</h3>
                                <p className="text-sm opacity-80">
                                    Enquiries & Anti-Corruption Establishment
                                </p>
                            </div>
                        </div>
                        <p className="text-sm opacity-80 leading-relaxed">
                            Enquiries & Anti-Corruption Establishment Sindh is committed to creating a transparent and accountable
                            government for the people of Sindh.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/about" className="opacity-80 hover:opacity-100 transition-opacity">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/services" className="opacity-80 hover:opacity-100 transition-opacity">
                                    Our Services
                                </a>
                            </li>
                            <li>
                                <a href="/mobile-app-release" className="opacity-80 hover:opacity-100 transition-opacity">
                                    Mobile App
                                </a>
                            </li>
                            <li>
                                <a href="/statistics" className="opacity-80 hover:opacity-100 transition-opacity">
                                    Statistics
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="opacity-80 hover:opacity-100 transition-opacity">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/privacy-policy" className="opacity-80 hover:opacity-100 transition-opacity">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="/terms-and-condition" className="opacity-80 hover:opacity-100 transition-opacity">
                                    Terms of Service
                                </a>
                            </li>

                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Support Contact</h4>
                        <div className="space-y-3 text-sm">
                            {/* <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>Toll-Free: 1199</span>
                            </div> */}
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>support@acesindh.gos.pk</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm opacity-80">
                    <p>&copy; {new Date().getFullYear()} Enquiries & Anti-Corruption Establishment Sindh. All rights reserved.</p>
                    <p className="mt-2">Government of Sindh | Pakistan</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
