"use client";
import styled from 'styled-components'

const StyledFooter = styled.div`
    background : #FFFFFF;
    filter : drop-shadow(0 0 0.1rem #CCCCCC);
    border-top : 0.1rem solid;
    border-color : #AAAAAA;
    
    display : flex;
    flex-direction : column;
    align-items : center;
    padding : 10px 10px
`;

export default function Footer() {
    return (
        <StyledFooter>
            <div>
                @Hangeol-Chang All rights reserved
            </div>
            <div>
                connect Info
            </div>
        </StyledFooter>
    )
}