import React from "react";
import styled from "styled-components";
import Body from "./body";
import Header from "./header";

export default function Layout( props: { children: React.ReactNode } ) {
    return <div.wrap>
        <Header />
        <Body>
        { props.children }
        </Body>
    </div.wrap>
}

const div = {
    wrap: styled.div`
        position: absolute;
        width: 100vw;
        height: 100vh;
    `
}