import React from "react";
import styled from "styled-components";
import useThemeStore, { ThemeType } from "../../store/theme";
import Body from "./body";
import Header from "./header";

export default function Layout(props: { children: React.ReactNode }) {

    const theme = useThemeStore(p => p.type);
    const setTheme = useThemeStore(p => p.setType);

    return <div.wrap>
        <Header />
        <Body>
            {props.children}
        </Body>
        <div style={{ position: "fixed", bottom: "calc(0% + 50px)", right: "calc(0% + 100px)" }}>
            <button.switch isdark={theme === ThemeType.dark} onClick={() => { setTheme(theme === ThemeType.light ? ThemeType.dark : ThemeType.light) }}>
                {theme === ThemeType.light ? "다크" : "밝은"} 모드로 전환
            </button.switch>
        </div>
    </div.wrap>
}

const div = {
    wrap: styled.div`
        position: absolute;
        width: 100vw;
        height: 100vh;

        //for dark
        ${p => p.theme.mode.isdark ? `
        background-color:black;
        color: white;
        ` : ``}
        
    `
};

const button = {
    switch: styled.button<{ isdark?: boolean }>`
        color: ${p => p.isdark ? "white" : "black"};
        background-color: inherit;
    `
}