import React, { useMemo } from 'react';
import { download } from '../assets';
import { downloadImage, checkWebPSupport } from '../utils';

const Card = ({_id, name, prompt, photo}) => {
    const supportsWebP = useMemo(() => {
        return checkWebPSupport();
    }, []);

    const imageUrl = useMemo(() => {
        if (supportsWebP) {
            // Use WebP image URL if supported
            return photo.replace(/\.png$/, '.webp');
        } else {
            // Otherwise, use PNG image URL
            return photo;
        }
    }, [supportsWebP, photo]);

    return (
        <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card element-to-fade-to-top fade-in-top">
            <img className="w-full h-auto object-cover rounded-xl" 
                 src={imageUrl} 
                 alt={prompt} />
            <div className="group-hover:flex flex-col max-h-[94%] hidden absolute bottom-0 left-0 rright-0 bg-[#10131f] m-2 p-4 rounded-md">
                <p className="text-white text-md overflow-y-auto prompt">
                    {prompt}
                </p>
                <div className="mt-5 flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex object-cover bg-green-700 text-xs justify-center items-center text-white font-bold">
                            {name[0]}
                        </div>
                        <p className="text-white text-sm">{name}</p>
                    </div>
                    <button type="button" 
                        onClick={() => downloadImage(_id, photo)}
                        className="outline-none bg-transparent border-none">
                        <img src={download} 
                            alt={download} 
                            className="w-6 h-6 object-contain invert" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;