import { ReactNode } from "react";

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
        [ 12, 10 ],
        [ 13, 12 ],
        [ 14, 14 ],
        [ 16, 16 ],
        [ 18, 18 ],
        [ 23, 30 ],
    ];

    const weights = [
        [ 300, 300 ],
        [ 400, 400 ],
        [ 600, 600 ],
        [ 700, 700 ],
    ]

    return <text style={{ fontSize: sizes[ size ][ 0 ], fontWeight: weights[ weight ][ 0 ] }}>
        {children}
    </text>
}

