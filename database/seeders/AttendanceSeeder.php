<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Membuat data absensi contoh untuk 7 hari terakhir
     * bagi semua karyawan (role: karyawan & atasan).
     */
    public function run(): void
    {
        $users = DB::table('users')
            ->join('roles', 'users.role_id', '=', 'roles.id')
            ->whereIn('roles.name', ['karyawan', 'atasan'])
            ->select('users.id', 'users.default_shift_id')
            ->get();

        $statuses  = ['hadir', 'hadir', 'hadir', 'hadir', 'hadir', 'izin', 'sakit'];
        $records   = [];

        for ($dayOffset = 6; $dayOffset >= 0; $dayOffset--) {
            $logicalDate = Carbon::today()->subDays($dayOffset);

            // Skip hari Minggu
            if ($logicalDate->isSunday()) {
                continue;
            }

            foreach ($users as $user) {
                $shiftId = $user->default_shift_id;
                $shift   = $shiftId ? DB::table('shifts')->find($shiftId) : null;
                $status  = $statuses[array_rand($statuses)];

                $clockInTime  = null;
                $clockOutTime = null;

                if ($status === 'hadir' && $shift) {
                    // Buat waktu clock-in (dalam ±15 menit dari jam masuk)
                    $startBase    = Carbon::parse($logicalDate->format('Y-m-d') . ' ' . $shift->start_time);
                    $clockInTime  = $startBase->copy()->addMinutes(rand(-5, 15))->toDateTimeString();

                    // Buat waktu clock-out
                    $endBase      = Carbon::parse($logicalDate->format('Y-m-d') . ' ' . $shift->end_time);
                    if ($shift->is_cross_day) {
                        $endBase->addDay();
                    }
                    $clockOutTime = $endBase->copy()->addMinutes(rand(-10, 30))->toDateTimeString();
                }

                $records[] = [
                    'user_id'        => $user->id,
                    'shift_id'       => $shiftId,
                    'logical_date'   => $logicalDate->toDateString(),
                    'status'         => $status,
                    'clock_in_time'  => $clockInTime,
                    'clock_in_photo' => $status === 'hadir' ? 'clock_in/' . $user->id . '_' . $logicalDate->format('Ymd') . '.jpg' : null,
                    'clock_in_lat'   => $status === 'hadir' ? -6.200000 + (rand(-100, 100) / 10000) : null,
                    'clock_in_lng'   => $status === 'hadir' ? 106.816666 + (rand(-100, 100) / 10000) : null,
                    'clock_out_time' => $clockOutTime,
                    'clock_out_photo'=> $status === 'hadir' ? 'clock_out/' . $user->id . '_' . $logicalDate->format('Ymd') . '.jpg' : null,
                    'clock_out_lat'  => $status === 'hadir' ? -6.200000 + (rand(-100, 100) / 10000) : null,
                    'clock_out_lng'  => $status === 'hadir' ? 106.816666 + (rand(-100, 100) / 10000) : null,
                    'created_at'     => $clockInTime ?? now(),
                    'updated_at'     => now(),
                ];
            }
        }

        // Insert dalam batch agar lebih efisien
        foreach (array_chunk($records, 50) as $chunk) {
            DB::table('attendances')->insert($chunk);
        }
    }
}
