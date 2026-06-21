const steps = [
  {
    id:1,
    title:"Check Your Email Inbox",
    desc:"Look for an automated notification wth the subject line format (Case Assignment)."
  },

  {
    id:2,
    title:"Follow the Secure Case Link",
    desc:"Click the direct portal link provided in the email to automatically open case assigned to you."
  },

  {
    id:3,
    title:"Investigate and Resolve",
    desc:"Investigate cases, upload evidence, and submit findings for approval."
  }
];

export default function GettingStartedCard() {
  return (
    <div className="rounded-xl border border-stroke bg-white p-8 shadow-sm">
      <h3 className="mb-6 font-semibold">
        How to Get Started
      </h3>

      <div className="space-y-5">

        {steps.map((step)=>(
          <div key={step.id} className="flex items-start gap-4">
           <div className="flex h-8 w-8 items-center flex-shrink-0 justify-center rounded-full bg-brand-500 text-white">
              {step.id}
            </div>

            <div>
              <h4 className="font-medium">
                {step.title}
              </h4>

              <p className="text-sm text-gray-500">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}