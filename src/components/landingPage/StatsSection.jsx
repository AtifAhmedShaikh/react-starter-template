import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    CheckCircle,
    Gavel,
    TrendingUp,
    Users
} from "lucide-react"

const StatsSection = () => {

    return (
        <section
            id="statistics"
            className="py-20 bg-gradient-to-br from-green-100/60 via-emerald-50/80 to-green-200/40 relative overflow-hidden"
        >
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-200/30 to-green-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-100/20 to-emerald-100/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Impact (Jan 2024-Dec 2024)</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Measurable results in the fight against corruption across Sindh
                    </p>
                    
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Card className="text-center bg-gradient-to-br from-white to-green-50/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border-green-100/50">
                        <CardContent className="pt-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <TrendingUp className="w-8 h-8 text-green-700" />
                            </div>
                            <div className="sm:text-4xl text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2">
                                17,722
                            </div>
                            <div className="text-muted-foreground">Total Complaints Received</div>
                        </CardContent>
                    </Card>
                    <Card className="text-center bg-gradient-to-br from-white to-green-50/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border-green-100/50">
                        <CardContent className="pt-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <CheckCircle className="w-8 h-8 text-green-700" />
                            </div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2">
                                1,673
                            </div>
                            <div className="text-muted-foreground">Number of Alloted Complaints</div>
                        </CardContent>
                    </Card>
                    <Card className="text-center bg-gradient-to-br from-white to-green-50/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border-green-100/50">
                        <CardContent className="pt-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Gavel className="w-8 h-8 text-green-700" />
                            </div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2">
                                7,710
                            </div>
                            <div className="text-muted-foreground">Disposed Off </div>
                        </CardContent>
                    </Card>
                    <Card className="text-center bg-gradient-to-br from-white to-green-50/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border-green-100/50">
                        <CardContent className="pt-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Users className="w-8 h-8 text-green-700" />
                            </div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2">
                                43.51%
                            </div>
                            <div className="text-muted-foreground">% of Disposal</div>
                        </CardContent>
                    </Card>
                </div>

                {/* <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <Card className="bg-gradient-to-br from-white to-green-50/40 shadow-lg border-green-100/50">
                        <CardHeader>
                            <CardTitle>Recovery Statistics</CardTitle>
                            <CardDescription>Financial recovery from corruption cases</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Total Recovery</span>
                                    <span className="font-bold text-primary">PKR 2.5 Billion</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">This Year</span>
                                    <span className="font-bold text-primary">PKR 450 Million</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Average per Case</span>
                                    <span className="font-bold text-primary">PKR 2.1 Million</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-white to-green-50/40 shadow-lg border-green-100/50">
                        <CardHeader>
                            <CardTitle>Department-wise Cases</CardTitle>
                            <CardDescription>Corruption cases by government departments</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Revenue Department</span>
                                    <span className="font-bold">1,245 cases</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Police Department</span>
                                    <span className="font-bold">987 cases</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Health Department</span>
                                    <span className="font-bold">654 cases</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Education Department</span>
                                    <span className="font-bold">432 cases</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div> */}

            </div>
        </section>

    );
};

export default StatsSection;
