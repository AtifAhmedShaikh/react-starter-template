
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FaqSection = () => {

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
          <p className="sm:text-xl text-lg text-muted-foreground max-w-3xl mx-auto">
            Common questions about reporting corruption and our processes
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                How can I ensure my complaint remains anonymous?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our system is designed to protect your identity completely. You don't need to provide any personal
                information to file a complaint. We use advanced encryption and secure servers to ensure your
                anonymity is maintained throughout the process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">What types of corruption can I report?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You can report any form of corruption including bribery, misuse of public funds, nepotism, abuse of
                power, illegal appointments, contract irregularities, and any other corrupt practices in government
                departments or public offices.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">How long does the investigation process take?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Initial assessment begins within 48 hours of complaint submission. Simple cases are typically resolved
                within 30-60 days, while complex cases may take 3-6 months depending on the nature and scope of
                investigation required.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                What evidence should I provide with my complaint?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Provide as much detail as possible including dates, locations, names of officials involved, amounts of
                money, documents, photographs, or any other relevant evidence. However, don't worry if you don't have
                all evidence - our investigation team can gather additional proof.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">Can I track the progress of my complaint?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, you'll receive a unique reference number after submitting your complaint. Use this number on our
                tracking portal to get real-time updates on investigation progress, actions taken, and final
                resolution status.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                What happens to corrupt officials after investigation?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Proven corrupt officials face disciplinary action including suspension, termination, criminal charges,
                asset recovery, and blacklisting. We also implement systemic reforms to prevent future corruption in
                the affected departments.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>


  );
};

export default FaqSection;
