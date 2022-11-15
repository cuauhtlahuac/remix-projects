import { useEffect, useState } from 'react';

const useRecorder = () => {
    const [audioURL, setAudioURL] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);
    const [blob, setBlob] = useState(null);

    useEffect(() => {
        if (!recorder) return;

        if (isRecording) {
            recorder.start();
        } else {
            recorder.stop();
        }

        const handleData = (e) => {
            setAudioURL(URL.createObjectURL(e.data));
            setBlob(e.data);
        };

        recorder.addEventListener('dataavailable', handleData);
        return () => recorder.removeEventListener('dataavailable', handleData);
    }, [recorder, isRecording]);

    const startRecording = () => {
        if (recorder === null) {
            requestRecorder().then(setRecorder, console.error);
        }
        setIsRecording(true);
    };

    const stopRecording = () => {
        setIsRecording(false);
    };

    return { blob, audioURL, isRecording, startRecording, stopRecording };
};

async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream);
}
export default useRecorder;