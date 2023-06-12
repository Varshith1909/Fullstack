import React, {useState} from "react";

export const ExmapleButton = () => {
    const [clicks, setClicks] = useState(0);

    return (
        <button
            onClick={() => {
                console.log("Clicked!");
                setClicks(clicks + 1);
            }}
        >
            Clicks: {clicks}
        </button>
    );
};
