import {
  Award,
  Lock,
  Shield
} from "lucide-react";

const TeamLeadSection = () => {
  return (
    <div>
      {/* Leadership Section */}
      <div className="mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-10">
          👥 Our Leadership |
          <span className="font-nastaliq">
            ہماری قیادت
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mx-auto px-5 my-10">
          <LeaderCard
            name="Mr. Syed Murad Ali Shah"
            position="Chief Minister Sindh"
            urduPosition="وزیر اعلیٰ سندھ"
            image="https://bucket-name-basic.s3.us-east-2.amazonaws.com/ace/complaints/murad%20ali%20shah_2025-01-28T05-31-24.jpg"
          />
          <LeaderCard
            name="Mr. Syed Sardar Ali Shah"
            position="Minister, E&ACE Sindh"
            urduPosition="وزیر اینٹی کرپشن سندھ"
            image="https://res.cloudinary.com/dsdtmsuyq/image/upload/v1733719587/bpoodv2dsw9vqnkpoyce.jpg"
          />
          <LeaderCard
            name="Mr. Syed Asif Hyder Shah"
            position="Chief Secretary Sindh"
            urduPosition="چیف سیکریٹری سندھ"
            image="https://bucket-name-basic.s3.us-east-2.amazonaws.com/ace/complaints/secretary%20sindh_2025-01-28T05-32-12.jpg"
          />
        </div>
        <div className="grid sm:grid-cols-12 w-full justify-center place-self-center gap-10 px-5">
          <div className="sm:col-span-2" />
          <LeaderCard
            name="Mr. Zulfiqar Ali Shah"
            position="Chairman, E&ACE Sindh"
            urduPosition="چیئرمین اینٹی کرپشن سندھ"
            // image="https://bucket-name-basic.s3.us-east-2.amazonaws.com/ace/complaints/chariman%20sahab_2025-01-28T05-26-53.jpg"
            image="https://bucket-name-basic.s3.us-east-2.amazonaws.com/ace/complaints/chhhh_2025-08-28T07-35-13.jpg"
            className="sm:col-span-4"
          />
          <LeaderCard
            name="Mr. Imtiaz Ali Abro"
            position="Director General E&ACE"
            urduPosition="ڈائریکٹر جنرل اینٹی کرپشن سندھ"
            image="https://bucket-name-basic.s3.us-east-2.amazonaws.com/ace/complaints/director_2025-01-28T05-22-09.jpg"
            className="sm:col-span-4"
          />
        </div>

      </div>

      {/* Bottom Trust Badges */}
      <div className="mt-16 flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-green-600" />
          <span>high Security</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-600" />
          <span>Legal Protection</span>
        </div>
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-green-600" />
          <span>Govt of Sindh Authorized</span>
        </div>
      </div>
    </div>
  )
}

export default TeamLeadSection
