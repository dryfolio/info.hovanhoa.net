import styled from "styled-components";

export default function Layout({ children }) {
  return <Main>{children}</Main>;
}

const Main = styled.main`
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--bg);
`;
