import React, { useEffect, useState, useCallback } from "react";

const notes = ["C", "D", "E", "F", "G", "A", "B"];

const PianoKey = ({ note, isActive, onClick }) => {
    return (
        <div
            id={note}
            onClick={() => onClick(note)}
            className={`w-16 h-48 bg-white border border-gray-400 cursor-pointer hover:bg-gray-200 flex items-end justify-center rounded-bl-md rounded-br-md ${
                isActive ? "bg-gray-300" : ""
            }`}
        >
            {note}
        </div>
    );
};

const Piano = () => {
    const [activeNote, setActiveNote] = useState(null);

    const playNote = useCallback((note) => {
        const audio = new Audio(`/notes/${note}5.mp3`);
        audio.play().catch((error) => {
            console.error("Error playing the audio:", error);
        });

        setActiveNote(note);

        // Remove the active class after 200ms
        setTimeout(() => {
            setActiveNote(null);
        }, 200);
    }, []);

    const handleKeyDown = useCallback(
        (e) => {
            const note = e.key.toUpperCase();

            if (notes.includes(note)) {
                playNote(note);
            }
        },
        [playNote]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className="pt-20 px-8 pb-6 rounded-2xl bg-stone-900">
            <div className="flex gap-x-1">
                {notes.map((note) => (
                    <PianoKey
                        key={note}
                        note={note}
                        isActive={note === activeNote}
                        onClick={playNote}
                    />
                ))}
            </div>
        </div>
    );
};

export default Piano;
