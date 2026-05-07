<?php

namespace App\Services;

class AttendanceLogicService
{

  public function calculateDistance($lat1, $lon1, $lat2, $lon2)
  {
    $earthRadius = 6371000; // Radius bumi dalam meter

    $latDelta = deg2rad($lat2 - $lat1);
    $lonDelta = deg2rad($lon2 - $lon1);

    // PERBAIKAN 1: Pastikan ini menggunakan $lat1 dan $lat2
    $a = sin($latDelta / 2) * sin($latDelta / 2) +
      cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
      sin($lonDelta / 2) * sin($lonDelta / 2);

    // PERBAIKAN 2: Menggunakan atan2(), bukan atan()
    $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

    return $earthRadius * $c;
  }

  public function savePhotoFile($file, $userId)
  {
    $fileName = $userId . '_' . time() . '.' . $file->getClientOriginalExtension();

    return $file->storeAs('attendances', $fileName, 'public');
  }

  public function getShiftWindow(\App\Models\Shift $shift, \Carbon\Carbon $now = null)
  {
    $now = $now ?? now();
    $start = \Carbon\Carbon::parse($shift->start_time);
    $end = \Carbon\Carbon::parse($shift->end_time);

    if ($shift->is_cross_day) {
      if ($now->hour < 12) {
        $start->subDay();
        $logicalDate = $now->copy()->subDay()->toDateString();
      } else {
        $end->addDay();
        $logicalDate = $now->toDateString();
      }
    } else {
      // If it's early morning (before 5 AM) and shift doesn't cross day, it might be a very late clock out for yesterday's shift
      if ($now->hour < 5 && $end->hour > 12) {
        $start->subDay();
        $end->subDay();
        $logicalDate = $now->copy()->subDay()->toDateString();
      } else {
        $logicalDate = $now->toDateString();
      }
    }

    // Add buffers: e.g. 2 hours before start, 4 hours after end
    $allowedStart = $start->copy()->subHours(2);
    $allowedEnd = $end->copy()->addHours(4);

    return [
      'logical_date' => $logicalDate,
      'allowed_start' => $allowedStart,
      'allowed_end' => $allowedEnd,
      'is_within_window' => $now->between($allowedStart, $allowedEnd),
    ];
  }
}
