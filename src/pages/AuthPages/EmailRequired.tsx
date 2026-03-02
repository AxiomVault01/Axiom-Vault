import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import EmailRequiredPage from "../../components/auth/EmailRequiredPage";

export default function EmailRequired() {
  return (
    <>
      <PageMeta
        title="Email Required"
        description="This is an Email Required page for Axiom Vault"
      />
      <AuthLayout>
        <EmailRequiredPage />
      </AuthLayout>
    </>
  );
}