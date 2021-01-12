import config from "./config";
const importHead = config.head.map((component) => component.type);
const importModules = { ...importHead };

import importModules from "@egovernments/digit-ui-react-components";

export const InboxComposer = ({ head, lhs, rhs, main, foot }) => {
  const Head = () => {
    head.map((component) => {});
  };
  const LHS = () => {
    lhs;
  };
  const RHS = () => {
    rhs;
  };
  const Main = () => {
    main;
  };
  const Foot = () => {
    foot;
  };

  return (
    <>
      <Head></Head>
      <LHS></LHS>
      <RHS></RHS>
      <Main></Main>
      <Foot></Foot>
    </>
  );
};
