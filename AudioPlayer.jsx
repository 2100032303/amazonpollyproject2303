import { useEffect, useRef, useState} from "react";
import {AiFillPlayCircle} from 'react-icons/ai';
import {BsPauseCircleFill} from 'react-icons/bs';

const AudioPlayer = ({ audioFile }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef();
    const progressBarRef = useRef();

    useEffect(() => {
        if(audioFile){
            const audioArrayBuffer = audioFile.AudioStream.buffer;
            const audioURL = URL.createObjectURL(new Blob([audioArrayBuffer], {type: "audio/mpeg"}));

            const audio = audioRef.current;
            audio.src = audioURL;

            audio.addEventListener('loaddate', () => {
                setDuration(audio.duration);
            })
            audio.addEventListener('timeupdate', updateProgressBar);

            return () =>{
                URL.revokeObjectURL(audioURL);
            }
        }
    }, [audioFile])

    const updateProgressBar = () => {
        const audio = audioRef.current;
        const progress = (audio.currentTime / audio.duration) * 100;

        setCurrentTime(audio.currentTime);
        progressBarRef.current.style.width = `${progress}%`
    }

    const tooglePlay = () => {
        const audio = audioRef.current;
        if(isPlaying)
        {
            audio.pause();
        }
        else
        {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    }

    return(
        <div className="audio-container">
            <audio ref={audioRef}/>
            <div className="progress-container">
                <div 
                    ref={progressBarRef} 
                    className="progress-bar"
                    style={{width: `${(currentTime / duration) * 100}%`}}
                />
            </div>
            <div >
            <button 
                className="audio-button" 
                disabled = {!audioFile}
                onClick={() => tooglePlay()}
            >
                {
                    isPlaying ?
                        <BsPauseCircleFill className="icon-btn"/> :
                        <AiFillPlayCircle className="icon-btn"/>
                }
                </button>
                
            </div>
        </div>
    )
}

export default AudioPlayer;