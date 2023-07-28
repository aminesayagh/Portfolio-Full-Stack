import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
interface CircleTextProps {
    text: string;
    size: number;
    radius: number;
    children: React.ReactNode;
}

const CircleText = ({ text, size, radius, children }: CircleTextProps) => {
    const [characters, setCharacters] = useState<(string | JSX.Element)[]>([]);
    const diameter = radius * size * 21;

    useEffect(() => {
        const chars = text.split('');
        const elements: (string | JSX.Element)[] = [];

        chars.forEach((char, index) => {
            const style = {
                fontSize: `${size}rem`,
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${360 / chars.length * index}deg) translateY(${-radius}ch)`,
            };

            elements.push(<span style={style} key={index}>{char}</span>);
        });

        setCharacters(elements);
    }, [text, size, radius])

    return (
        <motion.div viewport={{ once: true }} initial='visible' className="relative" aria-hidden="true" style={{
            width: `${diameter}px`,
            height: `${diameter}px`
        }}>
            {characters}
            <div className='flex flex-col justify-center items-center min-w-full min-h-full' style={{ translate: 'translate(-50%, -50%)' }}>
                {children}
            </div>
        </motion.div>
    );
}

export default CircleText;