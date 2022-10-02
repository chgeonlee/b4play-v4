import { createGlobalStyle, ThemeProvider } from "styled-components";
import Layout from "../components/layout";
import useThemeStore, { ThemeType } from "../store/theme";

export default function App({ Component, pageProps }) {

    const themeType = useThemeStore(p => p.type);

    return <>
        <GlobalStyle />
        <ThemeProvider theme={{
            mode: {
                type: themeType,
                isdark: themeType === ThemeType.dark,
                islight: themeType === ThemeType.light
            }
        }}>
            <Layout>

                <Component {...pageProps} />
            </Layout>

        </ThemeProvider>
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