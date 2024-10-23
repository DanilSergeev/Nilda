import { FC } from 'react';

interface IButton {
    children?: any,
    /**
     * May be "Green" or "Red". Blue is default
    */
    themeColor?: string,
    [key: string]: any;
}

const CustomButton: FC<IButton> = ({ children, themeColor, ...props }) => {
    let thisColor = "CustomButtonBlue";
    switch (themeColor) {
        case "Green":
            thisColor = "CustomButtonGreen";
            break;
        case "Red":
            thisColor = "CustomButtonRed";
            break;
    }

    return (
        <button {...props} className={`CustomButton ${thisColor}  ${props.disabled ? 'CustomButtonDisabled' : ''}`}>
            {children}
        </button>
    );
}

export default CustomButton;
