import styled, {css} from 'styled-components'

export const CustomCheckbox = styled.div`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    border: 1px solid #000;
    border-radius: 3px;
    background: #000;

    &:after {
        content: "";
        position: absolute;
        left: 50%;
        top: 45%;
        transform: translate(-50%, -45%) rotate(45deg);
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
    }

    ${props => props.inverted && css`
        width: 18px;
        height: 18px;
        border: 1px solid #8d8d8d;
        background: #fff;

        &:after {
            width: 3px;
            height: 8px;
            border: solid #000;
            border-width: 0 2px 2px 0;
            top: 40%;
        }
    `}
`

export const FormGroup = styled.div`
    padding: 5px 0;
    position: relative;
    display: flex;
    align-items: center;

    input[type="checkbox"] {
        margin-right: 5px;
        width: 22px;
        height: 22px;
        opacity: 0;
    }

    label {
        font-weight: 400;
        font-size: 16px;
    }
`