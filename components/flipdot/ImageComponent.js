'use client';
const { useState, useEffect } = require("react");

export default function ImageComponent({ queryString = '' }) {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        let timer;

        const debounce = (func, delay) => {
            clearTimeout(timer);
            timer = setTimeout(func, delay);
        };

        const fetchImage = async () => {
            const response = await fetch(`/api?${queryString}`);
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageSrc(imageUrl);
        };

        debounce(() => {
            fetchImage();
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [queryString]);

    return <img src={imageSrc} alt="Flip Dot" />;
}