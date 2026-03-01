import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import ForgotPasswordPage from "../../components/auth/ForgotPasswordPage";

export default function ForgotPassword() {
  return (
    <>
      <PageMeta
        title="Forgot Password"
        description="This is a Forgot Password page for Axiom Vault"
      />
      <AuthLayout>
        <ForgotPasswordPage />
      </AuthLayout>
    </>
  );
}