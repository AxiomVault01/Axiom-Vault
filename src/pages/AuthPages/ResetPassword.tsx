import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import ResetPasswordPage from "../../components/auth/ResetPasswordPage";

export default function ResetPassword() {
  return (
    <>
      <PageMeta
        title="Reset Password"
        description="This is a Reset Password page for Axiom Vault"
      />
      <AuthLayout>
        <ResetPasswordPage />
      </AuthLayout>
    </>
  );
}