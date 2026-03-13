import styled from 'styled-components'
import ReactDOM from 'react-dom';



export default function Layout({ children }) {
    return (
        <Main >
            {children}
        </Main>
    )
}

const Main = styled.main`
  min-height: 100vh;
  background: url('/bg3.png') center / cover no-repeat fixed;
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    background-attachment: scroll;
    background-position: center;
   }
`;
