<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   * 
   * Urutan pemanggilan seeder SANGAT PENTING karena ada relasi antar tabel:
   *  1. RoleSeeder        — roles tidak bergantung pada tabel lain
   *  2. ShiftSeeder       — shifts tidak bergantung pada tabel lain
   *  3. DepartmentSeeder  — departments dibuat tanpa FK manager_id (null dulu)
   *  4. UserSeeder        — users butuh roles, shifts, departments;
   *                         setelah insert atasan, langsung update manager_id di departments
   *  5. AttendanceSeeder  — attendances butuh users & shifts
   */
  public function run(): void
  {
    $this->call([
      RoleSeeder::class,
      ShiftSeeder::class,
      DepartmentSeeder::class,
      UserSeeder::class,
      // AttendanceSeeder::class,
    ]);
  }
}
