const steps = [
  {
    id: 1,
    title: "Check Your Email Inbox",
    desc: "Look for an automated notification with the subject line format (Case Assignment).",
  },
  {
    id: 2,
    title: "Follow the Secure Case Link",
    desc: "Click the direct portal link provided in the email to automatically open case assigned to you",
  },
  {
    id: 3,
    title: "Investigate and Resolve",
    desc: "Investigate cases, upload evidence, and submit findings for approval",
  },
];

export default function GettingStartedCard() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 text-left dark:border-gray-700 dark:bg-white/3">
      <h3 className="mb-5 text-sm font-semibold text-gray-900 dark:text-gray-200">
        How to Get Started
      </h3>

      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
              {step.id}
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                {step.title}
              </h4>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
