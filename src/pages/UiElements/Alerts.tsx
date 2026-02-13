import PageBreadcrumb from "../../components/common/PageBreadCrumb";
// import ComponentCard from "../../components/common/ComponentCard";
// import Alert from "../../components/ui/alert/Alert";
import PageMeta from "../../components/common/PageMeta";
import RiskAlertFilters from "./TabSwitch";

export default function Alerts() {
  return (
    <>
      <PageMeta
        title="Axiom Vault | Alerts"
        description="Axiom Vault is an AI enabled fraud detection and prevention platform that helps businesses identify and mitigate fraudulent activities in real-time, ensuring the security of their operations and customers."
      />
      <PageBreadcrumb pageTitle="Alerts" />

      <div className="space-y-5 sm:space-y-6">

        <RiskAlertFilters /> 
        {/* <Alert
          variant="error"
          title="Multiple Employees Using Same Bank Account"
          message="5 employees from the same department are receiving salaries to the same bank account number"
          showLink={true}
          linkHref="/"
          linkText="Learn more"
          employeeNumber={5}
          dateDetected="20/2/2026"
          reqAction="Investigation Required"
        />
        <Alert
          variant="info"
          title="Multiple Employees Using Same Bank Account"
          message="5 employees from the same department are receiving salaries to the same bank account number"
          showLink={true}
          linkHref="/"
          linkText="Learn more"
          employeeNumber={5}
          dateDetected="20/2/2026"
          reqAction="Investigation Required"
        />
        <Alert
          variant="warning"
          title="Multiple Employees Using Same Bank Account"
          message="5 employees from the same department are receiving salaries to the same bank account number"
          showLink={true}
          linkHref="/"
          linkText="Learn more"
          employeeNumber={5}
          dateDetected="20/2/2026"
          reqAction="Investigation Required"
        />
        <Alert
          variant="success"
          title="Multiple Employees Using Same Bank Account"
          message="5 employees from the same department are receiving salaries to the same bank account number"
          showLink={true}
          linkHref="/"
          linkText="Learn more"
          employeeNumber={5}
          dateDetected="20/2/2026"
          reqAction="Investigation Required"
        /> */}

        {/* <ComponentCard title="Success Alert"> */}
        {/* </ComponentCard> */}
        {/* <ComponentCard title="Warning Alert">
          <Alert
            variant="warning"
            title="Warning Message"
            message="Be cautious when performing this action."
            showLink={true}
            linkHref="/"
            linkText="Learn more"
          />
          <Alert
            variant="warning"
            title="Warning Message"
            message="Be cautious when performing this action."
            showLink={false}
          />
        </ComponentCard>{" "}
        <ComponentCard title="Error Alert">
          <Alert
            variant="error"
            title="Error Message"
            message="Be cautious when performing this action."
            showLink={true}
            linkHref="/"
            linkText="Learn more"
          />
          <Alert
            variant="error"
            title="Error Message"
            message="Be cautious when performing this action."
            showLink={false}
          />
        </ComponentCard>{" "}
        <ComponentCard title="Info Alert">
          <Alert
            variant="info"
            title="Info Message"
            message="Be cautious when performing this action."
            showLink={true}
            linkHref="/"
            linkText="Learn more"
          />
          <Alert
            variant="info"
            title="Info Message"
            message="Be cautious when performing this action."
            showLink={false}
          />
        </ComponentCard> */}
      </div>
    </>
  );
}
