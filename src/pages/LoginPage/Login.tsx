import React from "react";
import {StyledContainerDiv, StyledMainDiv, StyledTextInput, StyledForm} from './LoginStyles';

export default function Login() {
    return (
        <>
            <StyledContainerDiv>
                <StyledMainDiv>
                    {/* How dis work again?*/}
                    <StyledForm action="/login" method="post">
                        <StyledTextInput type="text" name="username" placeholder="username"/>
                        <StyledTextInput type="password" name="password" placeholder="password"/>
                    </StyledForm>
                </StyledMainDiv>
            </StyledContainerDiv>
        </>
    )
}