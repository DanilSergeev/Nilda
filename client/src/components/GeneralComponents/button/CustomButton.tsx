import { FC } from 'react';

interface IButton {
    children?: any,
    /**
     * May be "Blue" or "Red". Green is default
    */
    themeColor?: string,
    [key: string]: any;
}

const CustomButton: FC<IButton> = ({ children, themeColor, ...props }) => {
    let thisColor = "CustomButtonGreen";
    switch (themeColor) {
        case "Blue":
            thisColor = "CustomButtonBlue";
            break;
        case "Red":
            thisColor = "CustomButtonRed";
            break;
    }

    return (
        <button {...props} className={`CustomButton ${thisColor}`}>
            {children}
        </button>
    );
}

export default CustomButton;
