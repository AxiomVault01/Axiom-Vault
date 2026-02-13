import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="SignUp"
        description="This is a SignUp Page for Axiom Vault"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
