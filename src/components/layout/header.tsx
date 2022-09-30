import styled from "styled-components";
import PageContainer from "../container/page";
import HamburgerIcon from "../ui/icon/hamb";
import Typography, { TypographySizeType, TypographyWeightType } from "../ui/typography";

export default function Header() {
    return <div.wrap>
        <PageContainer>
            <div.content>
                <Typography weight={TypographyWeightType.bold} size={TypographySizeType.large}>
                    CHUNGGEON LEE
                </Typography>
                <HamburgerIcon />
            </div.content>
        </PageContainer>
    </div.wrap>
}

const div = {
    wrap: styled.div`
        display: flex;
        height: 60px;
        align-items: center;        
        justify-content: center;        
    `,
    content: styled.div`
        display: flex;
        justify-content: space-between;
        padding-left: 20px;
        padding-right: 20px;
    `
}