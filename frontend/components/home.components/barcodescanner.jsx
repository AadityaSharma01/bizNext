import { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

export default function BarcodeScanner({ onScan }) {
  const videoRef = useRef(null);
  const codeReader = useRef(null);
  const controlsRef = useRef(null); // <== this controls the scanner

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();

    codeReader.current.decodeFromVideoDevice(
      null,
      videoRef.current,
      (result, error, controls) => {
        if (result) {
          onScan(result.getText());
        }

        if (controls) {
          controlsRef.current = controls;
        }
      }
    );

    return () => {
      if (controlsRef.current) {
        controlsRef.current.stop()
      }
    };
  }, [onScan]);

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} className="w-full max-w-md rounded-xl shadow" />
    </div>
  );
}
