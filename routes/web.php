<?php

use App\Http\Controllers\AttenddanceController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    // 'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
  ]);
});

Route::get('/dashboard', function () {
  $user = auth()->user();
  $attendances = $user->attendances()
    ->orderByDesc('logical_date')
    ->limit(10)
    ->get(['logical_date', 'clock_in_time', 'clock_out_time', 'status', 'clock_in_photo', 'clock_out_photo'])
    ->map(fn($a) => [
      'logical_date'    => $a->logical_date,
      'clock_in_time'   => $a->clock_in_time,
      'clock_out_time'  => $a->clock_out_time,
      'status'          => $a->status,
      'clock_in_photo'  => $a->clock_in_photo  ? asset('storage/' . $a->clock_in_photo)  : null,
      'clock_out_photo' => $a->clock_out_photo ? asset('storage/' . $a->clock_out_photo) : null,
    ]);

  $totalHadir  = $user->attendances()->where('status', 'hadir')->count();
  $totalIzin   = $user->attendances()->whereIn('status', ['izin', 'sakit'])->count();
  $totalAbsen  = $user->attendances()->where('status', 'alpha')->count();

  return Inertia::render('Dashboard', [
    'attendances' => $attendances,
    'summary'     => [
      'hadir' => $totalHadir,
      'izin'  => $totalIzin,
      'absen' => $totalAbsen,
    ],
  ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/absensi', function () {
//   return Inertia::render('Absensi');
// })->middleware(['auth', 'verified'])->name('absensi');



Route::middleware(['auth', 'verified'])->group(function () {

  Route::get('/absensi', [AttenddanceController::class, 'create'])->name('absensi');
  Route::post('/absensi', [AttenddanceController::class, 'store'])->name('absensi.store');

  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
