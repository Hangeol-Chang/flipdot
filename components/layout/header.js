"use client";
import styled from 'styled-components'
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

const StyledHeader = styled.div`
    background : black;
    color : white;
    padding : 10px 30px;
    border : 10px 0px;
    // filter : drop-shadow(0 0 0.75rem #AAAAAA);
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
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                    }}>
                        <Link href='/'>
                            <div style={{
                                display : 'flex',
                                alignItems : 'center',
                            }} >
                                Flip Dot
                            </div>
                        </Link>
                        <a 
                            href="https://github.com/Hangeol-Chang/flipdot" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                transition: 'opacity 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                        >
                            <FaGithub size={24} />
                        </a>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            gap : 30,
                            alignItems : 'center'
                        }}
                    >
                        <HeaderButton href="/example">API Example</HeaderButton>
                        <HeaderButton href="/terms">Terms</HeaderButton>
                    </div>
                        
                </div>
            </StyledHeader>
        </>
    )
}