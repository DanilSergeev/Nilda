import { FC } from 'react';

interface ILine{
    title: string,
    text: string,
}

const CommonLine: FC<ILine> = (  {title = "",  text = ""} ) => {
    return (
        <div className="line">
            <div>
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default CommonLine;