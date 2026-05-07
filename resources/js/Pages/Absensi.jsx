import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

export default function Absensi({ auth }) {
  // Inertia useForm untuk state management & submit
  const { data, setData, post, processing, errors } = useForm({
    latitude: '',
    longitude: '',
    photo: '',
  });

  const [locationStatus, setLocationStatus] = useState(
    'Mencari lokasi satelit...'
  );
  const [isLocationReady, setIsLocationReady] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const webcamRef = useRef(null);

  // 1. Ambil Lokasi otomatis saat halaman dibuka
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus('Browser Anda tidak mendukung Geolocation.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setData((prevData) => ({
          ...prevData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
        setLocationStatus('Lokasi akurat ditemukan.');
        setIsLocationReady(true);
      },
      (error) => {
        setLocationStatus(`Gagal mendapatkan lokasi: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  // 2. Fungsi Jepret Foto
  const capturePhoto = useCallback(
    (e) => {
      e.preventDefault();
      const imageSrc = webcamRef.current.getScreenshot();
      setPreviewImage(imageSrc);

      // Convert base64 to File object
      const arr = imageSrc.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const file = new File([u8arr], 'photo.jpg', { type: mime });

      setData('photo', file);
    },
    [webcamRef]
  );

  // 3. Fungsi Ulangi Foto
  const retakePhoto = () => {
    setPreviewImage(null);
    setData('photo', '');
  };

  // 4. Kirim Data ke Laravel
  const submitAttendance = (e) => {
    e.preventDefault();
    post(route('absensi.store'));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Absensi Harian
        </h2>
      }
    >
      <Head title="Absensi" />

      <div className="py-12">
        <div className="mx-auto max-w-lg sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 flex flex-col items-center gap-6">
            <div
              className={`w-full text-center p-3 rounded-md font-medium ${isLocationReady ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
            >
              {locationStatus}
            </div>

            {Object.keys(errors).length > 0 && (
              <div className="w-full text-left p-3 rounded-md bg-red-100 text-red-700 font-medium text-sm">
                <ul className="list-disc pl-4">
                  {Object.entries(errors).map(([key, error]) => (
                    <li key={key}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="w-full relative rounded-lg overflow-hidden border-2 border-gray-200">
              {!previewImage ? (
                isLocationReady ? (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode: 'user' }}
                    className="w-full h-auto"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500 animate-pulse">
                      Menunggu GPS...
                    </span>
                  </div>
                )
              ) : (
                <img
                  src={previewImage}
                  alt="Preview Absensi"
                  className="w-full h-auto"
                />
              )}
            </div>

            <div className="w-full flex flex-col gap-3">
              {!previewImage ? (
                <button
                  type="button"
                  onClick={capturePhoto}
                  disabled={!isLocationReady}
                  className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition"
                >
                  📸 Jepret Wajah
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={submitAttendance}
                    disabled={processing}
                    className="w-full py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition"
                  >
                    {processing ? 'Mengirim Data...' : '✅ Kirim Absensi'}
                  </button>
                  <button
                    type="button"
                    onClick={retakePhoto}
                    disabled={processing}
                    className="w-full py-2 bg-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-300 transition"
                  >
                    Ulangi Foto
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
