import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import WelcomePage from "../../components/auth/WelcomePage";

export default function Welcome() {
  return (
    <>
      <PageMeta
        title="Welcome"
        description="This is a Welcome page for Axiom Vault"
      />
      <AuthLayout>
        <WelcomePage />
      </AuthLayout>
    </>
  );
}
