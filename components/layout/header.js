"use client";
import styled from 'styled-components'
import Image from 'next/image';
import Link from 'next/link';

const StyledHeader = styled.div`
    background : white;
    padding : 10px 30px;
    border : 10px 0px;
    filter : drop-shadow(0 0 0.75rem #AAAAAA);
`;

function HeaderButton({href, children}) {

    return (
        <>
            <Link href={href}>
                {children}
            </Link>
        </>
    )
}


export default function Header() {
    return (
        <>
            <StyledHeader>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Link href='/'>
                        <div style={{
                            display : 'flex',
                            alignItems : 'center',
                        }} >
                            Flip Dot
                        </div>
                    </Link>

                    <div
                        style={{
                            display: 'flex',
                            gap : 30,
                            alignItems : 'center'
                        }}
                    >
                        <HeaderButton href="/about">About</HeaderButton>
                        <HeaderButton href="/terms">Terms</HeaderButton>
                    </div>
                        
                </div>
            </StyledHeader>
        </>
    )
}