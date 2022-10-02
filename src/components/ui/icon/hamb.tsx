import styled from "styled-components"

export default function HamburgerIcon() {
    return <div.wrap>
        <div.line />
        <div.line />
    </div.wrap>
}

const div = {
    wrap: styled.div`
        width: 20px;
        height: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
    `,
    line: styled.div`
        border-top: 1px solid ${ p => p.theme.mode.isdark? "white":"black"};
    `
}