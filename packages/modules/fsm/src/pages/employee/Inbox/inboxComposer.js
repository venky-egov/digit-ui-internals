export const InboxComposer = ({ head, lhs, rhs, main, foot }) => {
  const Head = () => {
    head;
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
