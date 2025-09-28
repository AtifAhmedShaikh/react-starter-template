
import {
    Mail,
    MapPin,
    Phone
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const ContactUs = () => {
    return (
        <section
            id="contact"
            className="py-20 bg-gradient-to-br from-green-100/70 via-emerald-50/90 to-green-200/50 relative overflow-hidden"
        >
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-green-200/25 to-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-emerald-200/25 to-green-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-100/15 to-emerald-100/15 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-4">Contact E&ACE Sindh</h2>
                    <p className="sm:text-xl text-lg text-muted-foreground max-w-3xl mx-auto">
                        Multiple ways to reach us for complaints, inquiries, and support
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* <Card className="bg-gradient-to-br from-white to-green-50/60 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-green-100/50">
                        <CardHeader className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Phone className="w-8 h-8 text-green-700" />
                            </div>
                            <CardTitle>Phone Support</CardTitle>
                            <CardDescription>24/7 helpline for urgent complaints</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="space-y-2">
                                <div className="font-semibold text-green-700">Toll-Free: 1199</div>
                                <div className="text-muted-foreground">+92-21-99203456</div>
                                <div className="text-muted-foreground">+92-21-99203457</div>
                            </div>
                        </CardContent>
                    </Card> */}

                    <Card className="bg-gradient-to-br from-white to-green-50/60 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-green-100/50">
                        <CardHeader className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Mail className="w-8 h-8 text-green-700" />
                            </div>
                            <CardTitle>Email Support</CardTitle>
                            <CardDescription>Send detailed complaints via email</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="space-y-2">
                                <div className="font-semibold text-primary">support@acesindh.gos.pk</div>
                                {/* <div className="text-muted-foreground">info@eace.sindh.gov.pk</div> */}
                                {/* <div className="text-muted-foreground">director@eace.sindh.gov.pk</div> */}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-white to-green-50/60 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-green-100/50">
                        <CardHeader className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <MapPin className="w-8 h-8 text-primary" />
                            </div>
                            <CardTitle>Office Address</CardTitle>
                            <CardDescription>Visit us for in-person assistance</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="space-y-2">
                                <div className="font-semibold">E&ACE Sindh Headquarters</div>
                                <div className="text-muted-foreground">
                                    Old KDA Building, 2nd Floor, Sindh Secretariat # 03, Karach
                                    <br />
                                    Karachi, Sindh, Pakistan
                                </div>
                                {/* <div className="text-muted-foreground">Office Hours: 9 AM - 5 PM</div> */}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
