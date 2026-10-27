import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import AddTeamMemberForm from "../../components/team/AddTeamMemberForm";

export default function AddTeamMember() {
  return (
    <>
      <PageMeta
        title="Add Team Member"
        description="Add a team member to your Axiom Vault workspace"
      />
      <AuthLayout>
        <AddTeamMemberForm />
      </AuthLayout>
    </>
  );
}
