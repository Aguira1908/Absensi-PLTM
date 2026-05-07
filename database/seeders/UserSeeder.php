<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Struktur data:
     *  - 1 Admin  (role: admin, tidak perlu department)
     *  - 4 Atasan (role: atasan), 1 per departemen → langsung update manager_id
     *  - 8 Karyawan (role: karyawan), 2 per departemen
     */
    public function run(): void
    {
        // Ambil ID roles & shifts yang sudah di-seed
        $adminRoleId    = DB::table('roles')->where('name', 'admin')->value('id');
        $atasanRoleId   = DB::table('roles')->where('name', 'atasan')->value('id');
        $karyawanRoleId = DB::table('roles')->where('name', 'karyawan')->value('id');

        $shiftPagiId  = DB::table('shifts')->where('name', 'Shift Pagi')->value('id');
        $shiftSiangId = DB::table('shifts')->where('name', 'Shift Siang')->value('id');
        $shiftSoreId  = DB::table('shifts')->where('name', 'Shift Sore')->value('id');
        $shiftMalamId = DB::table('shifts')->where('name', 'Shift Malam')->value('id');

        $deptIT          = DB::table('departments')->where('name', 'IT')->value('id');
        $deptHRD         = DB::table('departments')->where('name', 'HRD')->value('id');
        $deptOperasional = DB::table('departments')->where('name', 'Operasional')->value('id');
        $deptKeuangan    = DB::table('departments')->where('name', 'Keuangan')->value('id');

        // -------------------------------------------------------
        // 1. Admin
        // -------------------------------------------------------
        DB::table('users')->insert([
            'name'             => 'Super Admin',
            'email'            => 'admin@pltm.com',
            'password'         => Hash::make('password'),
            'is_active'        => true,
            'role_id'          => $adminRoleId,
            'department_id'    => null,
            'default_shift_id' => null,
            'created_at'       => now(),
            'updated_at'       => now(),
        ]);

        // -------------------------------------------------------
        // 2. Atasan per Departemen
        // -------------------------------------------------------
        $atasanData = [
            ['name' => 'Budi Santoso',  'email' => 'atasan.it@pltm.com',          'department_id' => $deptIT,          'default_shift_id' => $shiftSiangId],
            ['name' => 'Sari Dewi',     'email' => 'atasan.hrd@pltm.com',         'department_id' => $deptHRD,         'default_shift_id' => $shiftSiangId],
            ['name' => 'Agus Setiawan', 'email' => 'atasan.operasional@pltm.com', 'department_id' => $deptOperasional, 'default_shift_id' => $shiftPagiId],
            ['name' => 'Rina Marlina',  'email' => 'atasan.keuangan@pltm.com',    'department_id' => $deptKeuangan,    'default_shift_id' => $shiftSiangId],
        ];

        $atasanIds = [];
        foreach ($atasanData as $atasan) {
            $atasanIds[] = DB::table('users')->insertGetId([
                'name'             => $atasan['name'],
                'email'            => $atasan['email'],
                'password'         => Hash::make('password'),
                'is_active'        => true,
                'role_id'          => $atasanRoleId,
                'department_id'    => $atasan['department_id'],
                'default_shift_id' => $atasan['default_shift_id'],
                'created_at'       => now(),
                'updated_at'       => now(),
            ]);
        }

        // Update manager_id di departments setelah atasan terbuat
        DB::table('departments')->where('id', $deptIT)->update(['manager_id' => $atasanIds[0]]);
        DB::table('departments')->where('id', $deptHRD)->update(['manager_id' => $atasanIds[1]]);
        DB::table('departments')->where('id', $deptOperasional)->update(['manager_id' => $atasanIds[2]]);
        DB::table('departments')->where('id', $deptKeuangan)->update(['manager_id' => $atasanIds[3]]);

        // -------------------------------------------------------
        // 3. Karyawan (2 per departemen)
        // -------------------------------------------------------
        $karyawanData = [
            // IT
            ['name' => 'Andi Firmansyah', 'email' => 'andi@pltm.com',   'department_id' => $deptIT,          'default_shift_id' => $shiftPagiId],
            ['name' => 'Cahyo Nugroho',   'email' => 'cahyo@pltm.com',  'department_id' => $deptIT,          'default_shift_id' => $shiftSiangId],
            // HRD
            ['name' => 'Desi Ratnasari',  'email' => 'desi@pltm.com',   'department_id' => $deptHRD,         'default_shift_id' => $shiftSiangId],
            ['name' => 'Eka Prasetyo',    'email' => 'eka@pltm.com',    'department_id' => $deptHRD,         'default_shift_id' => $shiftSiangId],
            // Operasional
            ['name' => 'Fajar Ramadhan',  'email' => 'fajar@pltm.com',  'department_id' => $deptOperasional, 'default_shift_id' => $shiftMalamId],
            ['name' => 'Gilang Saputra',  'email' => 'gilang@pltm.com', 'department_id' => $deptOperasional, 'default_shift_id' => $shiftSoreId],
            // Keuangan
            ['name' => 'Hani Kusumawati', 'email' => 'hani@pltm.com',   'department_id' => $deptKeuangan,    'default_shift_id' => $shiftSiangId],
            ['name' => 'Irwan Hidayat',   'email' => 'irwan@pltm.com',  'department_id' => $deptKeuangan,    'default_shift_id' => $shiftSiangId],
        ];

        foreach ($karyawanData as $karyawan) {
            DB::table('users')->insert([
                'name'             => $karyawan['name'],
                'email'            => $karyawan['email'],
                'password'         => Hash::make('password'),
                'is_active'        => true,
                'role_id'          => $karyawanRoleId,
                'department_id'    => $karyawan['department_id'],
                'default_shift_id' => $karyawan['default_shift_id'],
                'created_at'       => now(),
                'updated_at'       => now(),
            ]);
        }
    }
}
