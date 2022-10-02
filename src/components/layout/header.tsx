import styled from "styled-components";
import PageContainer from "../container/page";
import HamburgerIcon from "../ui/icon/hamb";
import Typography, { TypographySizeType, TypographyWeightType } from "../ui/typography";

export default function Header() {
    return <div.wrap>
        <PageContainer>
            <div.content>
                <Typography weight={TypographyWeightType.bold} size={TypographySizeType.large}>
                    Beggle
                </Typography>
                <HamburgerIcon />
            </div.content>
        </PageContainer>
    </div.wrap>
}

const div = {
    wrap: styled.div`
        position: absolute;
        display: flex;
        width: 100%;
        height: 60px;
        background-color: #ffffff99;
        backdrop-filter: blur(10px);
        align-items: center;        
        justify-content: center;     
        z-index   : 10;

        //for dark
        
        ${ p => p.theme.mode.isdark ?   `background-color: #00000033;`: `background-color: #ffffff99;`}
    `,
    content: styled.div`
        display: flex;
        justify-content: space-between;
        padding-left: 20px;
        padding-right: 20px;
    `
}