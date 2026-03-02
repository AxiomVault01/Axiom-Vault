import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import ResetPasswordSuccessfulPage from "../../components/auth/ResetPasswordSuccessfulPage";

export default function ResetPasswordSuccessful() {
  return (
    <>
      <PageMeta
        title="Reset Password Successful"
        description="This is a Reset Password Successful page for Axiom Vault"
      />
      <AuthLayout>
        <ResetPasswordSuccessfulPage />
      </AuthLayout>
    </>
  );
}