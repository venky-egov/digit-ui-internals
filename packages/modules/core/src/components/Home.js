import React, { useContext } from "react";

const CitizenHome = ({ modules }) => {
  const ComponentProvider = Digit.Contexts.ComponentProvider;
  const registry = useContext(ComponentProvider);

  console.log(registry);
  const paymentModule = modules.filter(({ code }) => code === "Payment")[0];
  const moduleArr = modules.filter(({ code }) => code !== "Payment");
  const moduleArray = [paymentModule, ...moduleArr];

  return (
    <React.Fragment>
      {moduleArray.map(({ code }, index) => {
        //console.log("in module map", code);
        const Links = Digit.ComponentRegistryService.getComponent(`${code}Links`) || (() => <React.Fragment />);
        return <Links key={index} matchPath={`/digit-ui/citizen/${code.toLowerCase()}`} userType={"citizen"} />;
      })}
    </React.Fragment>
  );
};

const EmployeeHome = ({ modules }) => {
  const fsmAllModules = modules.filter(({ code }) => code === "FSM");
  const pgrAllModules = modules.filter(({ code }) => code === "PGR");
  const fsmModuleCards = fsmAllModules.map((module) => Digit.ComponentRegistryService.getComponent(`${module.code}Card`));
  const pgrModuleCards = pgrAllModules.map((module) => Digit.ComponentRegistryService.getComponent(`${module.code}Card`));

  const addFsmModuleCards = () => {
    return fsmModuleCards.map((Card, index) => <Card key={index} />);
  };

  const addPgrModuleCards = () => {
    return pgrModuleCards.map((Card, index) => <Card key={index} />);
  };

  const pgr = Digit.Utils.pgrAccess();
  console.log("%c 🇩🇪: EmployeeHome -> pgr ", "font-size:16px;background-color:#97bd46;color:white;", pgr);
  const fsm = Digit.Utils.fsmAccess();
  console.log("%c 🌉: EmployeeHome -> fsm ", "font-size:16px;background-color:#adc888;color:black;", fsm);

  return (
    <div className="employee-app-container">
      <div className="ground-container">
        {pgr ? addPgrModuleCards() : null}
        {fsm ? addFsmModuleCards() : null}
      </div>
    </div>
  );
};

export const AppHome = ({ userType, modules }) => {
  if (userType === "citizen") {
    return <CitizenHome modules={modules} />;
  }
  return <EmployeeHome modules={modules} />;
};
