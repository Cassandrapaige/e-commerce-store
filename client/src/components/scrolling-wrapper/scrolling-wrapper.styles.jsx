import styled from 'styled-components'

export const ScrollingWrapperContainer = styled.div`
padding: 50px 0 50px 0px;
max-width: 100vw;
overflow-x: hidden;
opacity: 0;
animation: 1s fadeIn ease 1s forwards;
background: #fff
` 

export const ScrollingWrapper = styled.div`
    position: relative;
    min-height: 400px;

    h2 {
        margin-bottom: 30px;
    }
`

export const ScrollingContent = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 31%);
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
    overflow-y: hidden;
    gap: 20px;
    scrollbar-width: none;
    transition: all 1s ease;

    &::-webkit-scrollbar {
    display: none
    }

    @media(max-width: 800px) {
        grid-template-columns: repeat(12, 50%);
        gap: 5px;
    }
`
    
export const WrapperItem = styled.div`  
    height: 300px;
`
  
export const Arrow = styled.div`
    position: absolute;
    top: 0px;
    bottom: 0;
    width: 65px;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .5s ease-in-out;
    right: ${props => props.isRight ? '0px' : ''};

    .fas { 
        font-size: 25px;
        color: rgba(109, 109, 109, .6);
        background: rgba(255, 255, 255, .9);
        height: 50px;
        width: 50px;
        border-radius: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all .3s ease;

        &:hover {
            background: white;
        }
    }
`

export const ProgressBarContainer = styled.div`
    width: 95%;
    margin-top: 50px;

    @media(max-width: 800px) {
        margin-top: 30px;
    }
`

export const Scrollbar = styled.div`
    width: 100%;
    margin: auto;
    height: 2px;
    background: rgba(169, 169, 169, .7);
    border-radius: 100px;
    overflow: hidden;
`

export const ProgressBar = styled.div`
    background: rgba(55, 55, 55, .8);
    height: 100%;
    width: 30%;
    border-radius: 100px;
    transition: all .5s ease;
    margin-left: ${props => `${props.scrollProgress}%`};
    transform: ${props => `translateX: -${props.scrollProgress}%`}
`