import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

export default function Absensi({ auth, todayAttendance }) {
  const hasClockedIn = !!todayAttendance;
  const isLocked =
    todayAttendance &&
    ['izin', 'sakit', 'alpa'].includes(todayAttendance.status);
  const hasClockedOut =
    todayAttendance && todayAttendance.clock_out_time !== null;
  const isFullyCompleted = isLocked || hasClockedOut;

  // URL foto absen masuk yang sudah tersimpan
  const savedClockInPhoto = todayAttendance?.clock_in_photo_url ?? null;

  const { data, setData, post, processing, errors, reset } = useForm({
    type: hasClockedIn && !isFullyCompleted ? 'pulang' : 'masuk',
    status: 'hadir',
    reason: '',
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

  // Auto-fetch location if required
  useEffect(() => {
    if (data.status === 'hadir' || data.type === 'pulang') {
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
    }
  }, [data.status, data.type]);

  const capturePhoto = useCallback(
    (e) => {
      e.preventDefault();
      if (!webcamRef.current) return;
      const imageSrc = webcamRef.current.getScreenshot();
      setPreviewImage(imageSrc);

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

  const retakePhoto = () => {
    setPreviewImage(null);
    setData('photo', '');
  };

  const submitAttendance = (e) => {
    e.preventDefault();
    post(route('absensi.store'));
  };

  const handleTypeChange = (newType) => {
    setData((prev) => ({
      ...prev,
      type: newType,
      status: 'hadir', // Reset status when switching type
      reason: '',
    }));
    setPreviewImage(null);
  };

  const isHadirMode = data.type === 'pulang' || data.status === 'hadir';

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

      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="mx-auto max-w-lg sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl sm:rounded-2xl p-6 md:p-8 flex flex-col gap-8 border border-gray-100">
            {isFullyCompleted ? (
              <div className="flex flex-col items-center justify-center py-12 gap-5 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Absensi Selesai!
                </h3>
                <p className="text-gray-600 max-w-sm">
                  Anda sudah menyelesaikan seluruh proses absensi untuk shift
                  ini. Tidak ada tindakan lebih lanjut yang diperlukan.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Catat Kehadiran
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Silakan pilih tipe dan status absensi Anda hari ini.
                  </p>
                </div>
                {/* Type Selector (Masuk / Pulang) */}
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => handleTypeChange('masuk')}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
                      data.type === 'masuk'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Absen Masuk
                    {hasClockedIn && (
                      <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      !isFullyCompleted && handleTypeChange('pulang')
                    }
                    disabled={isFullyCompleted}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      data.type === 'pulang'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    } ${isFullyCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Absen Pulang
                  </button>
                </div>
                {/* Status Selector (Only show if type is 'masuk') */}
                {data.type === 'masuk' && !hasClockedIn && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {['hadir', 'izin', 'sakit', 'alpa'].map((statusOption) => (
                      <button
                        key={statusOption}
                        type="button"
                        onClick={() => {
                          setData('status', statusOption);
                          setPreviewImage(null);
                        }}
                        disabled={isFullyCompleted}
                        className={`py-3 px-2 rounded-xl text-sm font-medium capitalize border-2 transition-all duration-200 flex flex-col items-center gap-1 ${
                          data.status === statusOption
                            ? statusOption === 'hadir'
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : statusOption === 'izin'
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : statusOption === 'sakit'
                                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                                  : 'border-red-500 bg-red-50 text-red-700'
                            : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200 hover:bg-gray-50'
                        } ${isFullyCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {statusOption}
                      </button>
                    ))}
                  </div>
                )}
                {Object.keys(errors).length > 0 && (
                  <div className="w-full text-left p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 font-medium text-sm">
                    <ul className="list-disc pl-4 space-y-1">
                      {Object.entries(errors).map(([key, error]) => (
                        <li key={key}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* ── Jika sudah absen masuk & tab masuk aktif: tampilkan foto saja ── */}
                {hasClockedIn && data.type === 'masuk' ? (
                  <div className="flex flex-col gap-4">
                    {/* Banner sukses */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
                      <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-green-800">
                          Absen masuk telah tercatat!
                        </p>
                        <p className="text-xs text-green-600 mt-0.5">
                          {todayAttendance?.clock_in_time
                            ? `Tercatat pukul ${new Date(todayAttendance.clock_in_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`
                            : 'Kehadiran Anda sudah dicatat hari ini.'}
                        </p>
                      </div>
                    </div>

                    {/* Foto absen masuk */}
                    {savedClockInPhoto ? (
                      <div className="relative w-full rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100">
                        <img
                          src={savedClockInPhoto}
                          alt="Foto Absen Masuk"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                          <p className="text-white text-xs font-semibold">
                            Foto Absen Masuk
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full rounded-2xl bg-gray-100 aspect-[4/3] flex items-center justify-center">
                        <p className="text-sm text-gray-400">
                          Tidak ada foto tersimpan
                        </p>
                      </div>
                    )}

                    <p className="text-xs text-center text-gray-400">
                      Klik{' '}
                      <span className="font-semibold text-gray-600">
                        Absen Pulang
                      </span>{' '}
                      untuk mencatat kepulangan Anda.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={submitAttendance}
                    className="flex flex-col gap-6"
                  >
                    {isHadirMode ? (
                      <>
                        <div
                          className={`w-full text-center p-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
                            isLocationReady
                              ? 'bg-green-50 text-green-700'
                              : 'bg-yellow-50 text-yellow-700'
                          }`}
                        >
                          {isLocationReady ? (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5 animate-spin"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                          )}
                          {locationStatus}
                        </div>

                        <div className="w-full relative rounded-2xl overflow-hidden bg-gray-100 shadow-inner aspect-[4/3] flex items-center justify-center border-2 border-gray-200">
                          {!previewImage ? (
                            isLocationReady ? (
                              <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={{ facingMode: 'user' }}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex flex-col items-center gap-3 text-gray-400">
                                <svg
                                  className="w-10 h-10 animate-pulse"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                <span className="text-sm font-medium">
                                  Menunggu GPS...
                                </span>
                              </div>
                            )
                          ) : (
                            <img
                              src={previewImage}
                              alt="Preview Absensi"
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        <div className="flex flex-col gap-3">
                          {!previewImage ? (
                            <button
                              type="button"
                              onClick={capturePhoto}
                              disabled={!isLocationReady || processing}
                              className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 hover:shadow-lg transition-all flex justify-center items-center gap-2"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              Jepret Wajah
                            </button>
                          ) : (
                            <div className="flex gap-3">
                              <button
                                type="button"
                                onClick={retakePhoto}
                                disabled={processing}
                                className="flex-1 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                  />
                                </svg>
                                Ulangi
                              </button>
                              <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 py-3.5 bg-green-600 text-white rounded-xl font-semibold shadow-md hover:bg-green-700 hover:shadow-lg transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                {processing ? 'Mengirim...' : 'Kirim'}
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-full text-left p-4 rounded-xl bg-blue-50 border border-blue-100">
                          <p className="text-sm text-blue-700 font-medium">
                            Anda memilih status{' '}
                            <span className="uppercase font-bold">
                              {data.status}
                            </span>
                            . Foto wajah dan lokasi tidak diwajibkan.
                          </p>
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="reason"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Catatan / Alasan (Opsional)
                          </label>
                          <textarea
                            id="reason"
                            name="reason"
                            rows="3"
                            value={data.reason}
                            onChange={(e) => setData('reason', e.target.value)}
                            disabled={processing}
                            className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none p-3 disabled:opacity-50 disabled:bg-gray-100"
                            placeholder="Masukkan alasan atau keterangan tambahan..."
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={processing}
                          className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                          {processing ? 'Mengirim Data...' : 'Kirim Laporan'}
                        </button>
                      </>
                    )}
                  </form>
                )}{' '}
                {/* end hasClockedIn && masuk check */}
              </>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
