<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShiftSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shifts = [
            [
                'name'         => 'Shift Pagi',
                'start_time'   => '07:00:00',
                'end_time'     => '15:00:00',
                'is_cross_day' => false,
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'name'         => 'Shift Siang',
                'start_time'   => '08:00:00',
                'end_time'     => '17:00:00',
                'is_cross_day' => false,
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'name'         => 'Shift Sore',
                'start_time'   => '13:00:00',
                'end_time'     => '21:00:00',
                'is_cross_day' => false,
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'name'         => 'Shift Malam',
                'start_time'   => '20:00:00',
                'end_time'     => '04:00:00',
                'is_cross_day' => true,
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
        ];

        DB::table('shifts')->insert($shifts);
    }
}
