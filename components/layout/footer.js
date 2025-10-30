"use client";
import styled from 'styled-components'
import { FaGithub } from 'react-icons/fa'

const StyledFooter = styled.div`
    background : black;
    color : white;
    // border-top : 0.1rem solid;
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
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <span>GitHub:</span>
                <a 
                    href="https://github.com/Hangeol-Chang" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                        color: 'white',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    <FaGithub size={20} />
                    Hangeol-Chang
                </a>
            </div>
        </StyledFooter>
    )
}