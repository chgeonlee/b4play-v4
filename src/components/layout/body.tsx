import React from "react";
import styled from "styled-components";
import PageContainer from "../container/page";

export default function Body( props: { children: React.ReactNode }) {
    return <div.wrap>
        <PageContainer>
        { props.children }
        </PageContainer>
    </div.wrap>
}

const div = {
    wrap: styled.div`
        overflow-y: scroll;
        width: 100%;
        height: calc( 100% );
        display: flex;
        justify-content: center;
        z-index: 1;
    `
}