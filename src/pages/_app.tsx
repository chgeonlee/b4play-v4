import { createGlobalStyle } from "styled-components";
import Layout from "../components/layout";

export default function App({ Component, pageProps }) {
    return <>
    <GlobalStyle />
    <Layout>
        <Component {...pageProps} />
    </Layout>
    </>
}


export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0px;
       
    }

    * { 
    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
     box-sizing: border-box;      
     ::-webkit-scrollbar {
            display: none;
        } 
        -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
`;