const notes = ["C", "D", "E", "F", "G", "A", "B"];

const PianoKey = ({ note }) => {
    return (
        <div
            id={note}
            onClick={() => playNote(note)}
            className={`w-16 h-48 bg-white border border-gray-400 cursor-pointer hover:bg-gray-200 flex items-end justify-center rounded-bl-md rounded-br-md`}
        >
            {note}
        </div>
    );
};

const playNote = (note) => {
    const audio = new Audio(`/notes/${note}5.mp3`);
    audio.play().catch((error) => {
        console.error("Error playing the audio:", error);
    });

    // Add the active class
    const element = document.getElementById(note);
    if (element) {
        element.classList.add("bg-gray-300");

        // Remove the active class after 200ms
        setTimeout(() => {
            element.classList.remove("bg-gray-300");
        }, 200);
    }
};

const handleKeyDown = (e) => {
    const note = e.key;

    if (notes.includes(note)) {
        playNote(note);
    }
};

const Piano = (props) => {
    // Attach event listener to document when component is rendered
    if (!document.hasEventListener) {
        document.addEventListener("keydown", handleKeyDown);
        document.hasEventListener = true;
    }

    return (
        <div className="pt-20 px-8 pb-6 rounded-2xl bg-stone-900">
            <div className="flex gap-x-1">
                {notes.map((note) => (
                    <PianoKey key={note} note={note} />
                ))}
            </div>
        </div>
    );
};

export default Piano;
