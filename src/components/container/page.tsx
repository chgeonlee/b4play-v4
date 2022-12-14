import { ReactNode } from "react";
import styled from "styled-components";

export default function PageContainer( props: { children: ReactNode }) {
    return <div.wrap>
        { props.children }
    </div.wrap>
}

const div = {
    wrap: styled.div`
        max-width: 1080px;
        width: 100%;
        overflow: visible;
    `
}
