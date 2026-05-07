<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Services\AttendanceLogicService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setting;

class AttenddanceController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('Absensi');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request, AttendanceLogicService $attendanceLogicService)
  {
    $request->validate([
      'type' => 'required|in:masuk,pulang',
      'status' => 'required|in:hadir,izin,sakit,alpa',
      'latitude' => 'required_if:status,hadir|numeric|nullable',
      'longitude' => 'required_if:status,hadir|numeric|nullable',
      'photo' => 'required_if:status,hadir|file|image|mimes:png,jpg,jpeg|max:2048|nullable',
      'reason' => 'nullable|string|max:255',
    ]);

    $user = $request->user();

    // Ambil shift user
    $shift = \App\Models\Shift::find($user->default_shift_id);
    if (!$shift) {
      return back()->withErrors(['type' => 'Anda belum memiliki jadwal shift.']);
    }

    // Hitung tanggal logis dan rentang waktu valid untuk absensi
    $shiftWindow = $attendanceLogicService->getShiftWindow($shift);
    $today = $shiftWindow['logical_date'];

    // Cek apakah di dalam rentang jam kerja shift (termasuk buffer)
    if (!$shiftWindow['is_within_window']) {
      $startAllowed = $shiftWindow['allowed_start']->format('H:i');
      $endAllowed = $shiftWindow['allowed_end']->format('H:i');
      return back()->withErrors(['type' => "Absensi ditolak. Anda hanya bisa melakukan absensi untuk shift ini antara pukul $startAllowed hingga $endAllowed."]);
    }

    $attendance = $user->attendances()->where('logical_date', $today)->first();

    // Jika bukan hadir, tidak perlu foto dan lokasi
    if ($request->status !== 'hadir') {
      if ($attendance) {
        $attendance->update([
          'status' => $request->status,
          'reason' => $request->reason,
        ]);
      } else {
        $user->attendances()->create([
          'shift_id' => $user->default_shift_id,
          'logical_date' => $today,
          'status' => $request->status,
          'reason' => $request->reason,
        ]);
      }
      return redirect()->route('dashboard')->with('success', 'Status absensi berhasil dicatat!');
    }

    // Jika hadir, wajib cek jarak dan foto
    // $kantorLat = env('KANTOR_LAT');
    // $kantorLng = env('KANTOR_LNG');

    $setting = Setting::query()->first();

    // Validasi pencegahan jika Admin belum pernah mengatur lokasi di Filament
    if (!$setting || !$setting->office_latitude || !$setting->office_longitude) {
      return back()->withErrors(['lokasi' => 'Sistem gagal mendeteksi lokasi kantor. Silakan hubungi Admin.']);
    }

    $distance = $attendanceLogicService->calculateDistance(
      $request->latitude,
      $request->longitude,
      $setting->office_latitude,
      $setting->office_longitude
    );

    if ($distance > $setting->attendance_radius) {
      return back()->withErrors([
        'lokasi' => 'Anda berada di luar jangkauan kantor. jarak: ' . round($distance) . ' meter.'
      ]);
    }

    $photoPath = $attendanceLogicService->savePhotoFile(
      $request->file('photo'),
      $user->id
    );

    if ($request->type === 'masuk') {
      if ($attendance) {
        if ($attendance->clock_in_time) {
          return back()->withErrors(['type' => 'Anda sudah melakukan absen masuk untuk shift ini.']);
        }
        $attendance->update([
          'status' => 'hadir',
          'clock_in_time' => now(),
          'clock_in_lat' => $request->latitude,
          'clock_in_lng' => $request->longitude,
          'clock_in_photo' => $photoPath,
          'reason' => $request->reason,
        ]);
      } else {
        $user->attendances()->create([
          'shift_id' => $user->default_shift_id,
          'logical_date' => $today,
          'status' => 'hadir',
          'clock_in_time' => now(),
          'clock_in_lat' => $request->latitude,
          'clock_in_lng' => $request->longitude,
          'clock_in_photo' => $photoPath,
          'reason' => $request->reason,
        ]);
      }
      return redirect()->route('dashboard')->with('success', 'Absensi masuk berhasil dicatat!');
    } else { // type === 'pulang'
      if (!$attendance || !$attendance->clock_in_time) {
        return back()->withErrors(['type' => 'Anda belum melakukan absen masuk hari ini.']);
      }
      if ($attendance->clock_out_time) {
        return back()->withErrors(['type' => 'Anda sudah melakukan absen pulang hari ini.']);
      }

      $attendance->update([
        'clock_out_time' => now(),
        'clock_out_lat' => $request->latitude,
        'clock_out_lng' => $request->longitude,
        'clock_out_photo' => $photoPath,
      ]);
      return redirect()->route('dashboard')->with('success', 'Absensi pulang berhasil dicatat!');
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Attendance $attenddance)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Attendance $attenddance)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Attendance $attenddance)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Attendance $attenddance)
  {
    //
  }
}
