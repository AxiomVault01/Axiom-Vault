import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import VerifyCodePage from "../../components/auth/VerifyCodePage";

export default function VerifyCode() {
  return (
    <>
      <PageMeta
        title="Verify Code"
        description="This is a Verify Code page for Axiom Vault"
      />
      <AuthLayout>
        <VerifyCodePage />
      </AuthLayout>
    </>
  );
}