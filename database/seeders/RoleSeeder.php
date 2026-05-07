<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'admin',    'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'atasan',   'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'karyawan', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        ];

        DB::table('roles')->insert($roles);
    }
}
