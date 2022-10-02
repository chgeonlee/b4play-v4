import { ReactNode } from "react";
import styled from "styled-components";

export enum TypographySizeType {
    smaller = 0,
    small,
    medium,
    large,
    larger,
    greatest,
}

export enum TypographyWeightType {
    thin = 0,
    medium,
    bold,
    bolder
}

interface TypographyProps {
    size: TypographySizeType,

}

export default function Typography({
    children,
    size = TypographySizeType.medium,
    weight = TypographyWeightType.medium
}: { children: ReactNode, size?: TypographySizeType, weight?: TypographyWeightType }) {

    const sizes = [
        [ 11, 10 ],
        [ 13, 12 ],
        [ 14, 14 ],
        [ 16, 16 ],
        [ 18, 18 ],
        [ 30, 30 ],
    ];

    const weights = [
        [ 300, 300 ],
        [ 400, 400 ],
        [ 600, 600 ],
        [ 700, 700 ],
    ]

    return <text.wrap style={{ fontSize: sizes[ size ][ 0 ], fontWeight: weights[ weight ][ 0 ] }}>
        {children}
    </text.wrap>
}

const text = {
    wrap: styled.text`
        font-family: pretendard, sans-serif;

font-weight: 300;

font-style: normal;


    `
}
