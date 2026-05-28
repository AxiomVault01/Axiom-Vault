const steps = [
  {
    id:1,
    title:"Upload Your Data",
    desc:"Upload payroll, vendor payments, or expense data to start detecting anomalies."
  },

  {
    id:2,
    title:"Review Alerts",
    desc:"Our AI automatically detects potential issues and create alerts for you to review."
  },

  {
    id:3,
    title:"Create Investigations",
    desc:"Convert alerts into formal investigation cases with evidence tracking and audit trails."
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