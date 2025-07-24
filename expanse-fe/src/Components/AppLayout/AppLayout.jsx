import styled from "styled-components";
import bg from "../../img/bg.png";
import { MainLayout } from "../../styles/Layouts";
import Orb from "../Orb/Orb";
import Navigation from "../Navigation/Navigation";
import Dashboard from "../Dashboard/Dashboard";
import { useMemo, useState } from "react";
import Income from "../Income/Income";
import Expenses from "../Expenses/Expenses";
import { useGlobalContext } from "../context/globalContext";

function AppLayout() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();

  const displayData = () => {
    switch (active) {
      case 1: return <Dashboard />;
      case 2: return <Dashboard />;
      case 3: return <Income />;
      case 4: return <Expenses />;
      default: return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => <Orb />, []);

  return (
    <AppStyled bg={bg}>
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default AppLayout;
