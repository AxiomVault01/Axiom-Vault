import PageMeta from "../components/common/PageMeta";
import AccountSettingsForm from "../components/settings/AccountSettingsForm";

export default function MemberSettingsPage() {
  return (
    <>
      <PageMeta title="Axiom Vault | Settings" description="Manage your account." />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200">Settings</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your account information</p>
        </div>

        <AccountSettingsForm />
      </div>
    </>
  );
}
