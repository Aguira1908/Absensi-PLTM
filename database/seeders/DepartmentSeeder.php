<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * manager_id di-set null dulu saat insert.
   * Akan diupdate oleh UserSeeder setelah atasan dibuat.
   */
  public function run(): void
  {
    $departments = [
      ['name' => 'IT',          'manager_id' => null, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
      ['name' => 'HRD',         'manager_id' => null, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
      ['name' => 'Operasional', 'manager_id' => null, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
      ['name' => 'Keuangan',    'manager_id' => null, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
    ];

    DB::table('departments')->insert($departments);
  }
}
