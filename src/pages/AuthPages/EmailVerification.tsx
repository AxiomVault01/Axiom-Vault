import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import EmailVerificationPage from "../../components/auth/EmailVerificationPage";

export default function EmailVerification() {
  return (
    <>
      <PageMeta
        title="Email Verification"
        description="This is an Email Verification page for Axiom Vault"
      />
      <AuthLayout>
        <EmailVerificationPage />
      </AuthLayout>
    </>
  );
}