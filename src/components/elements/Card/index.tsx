'use client'
import Questions from "./questions";
import { Title } from "./title";

export const Card = () => {
    return (
        <div className='px-5 py-6 w-[640px]'>
            <Title />

            <Questions />
        </div>
    );
}