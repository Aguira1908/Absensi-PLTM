<?php

namespace App\Filament\Widgets;

use App\Models\Attendance;
use App\Models\User;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;

class AttendanceTrendChart extends ChartWidget
{
  protected static ?int $sort = 2;
  protected ?string $heading = 'Tren Kehadiran 7 Hari Terakhir';
  protected ?string $maxHeight = '280px'; // Mengurangi tinggi grafik
  // Membuat grafik mengambil ruang lebar penuh (full width)
  protected int | string | array $columnSpan = 'full';
  protected ?string $pollingInterval = '10s';

  protected function getData(): array
  {
    $totalKaryawan = User::count('*');
    $tepatWaktuData = [];
    $terlambatAlphaData = [];
    $labels = [];

    $daysIndo = [
      'Sunday' => 'Min',
      'Monday' => 'Sen',
      'Tuesday' => 'Sel',
      'Wednesday' => 'Rab',
      'Thursday' => 'Kam',
      'Friday' => 'Jum',
      'Saturday' => 'Sab',
    ];

    for ($i = 6; $i >= 0; $i--) {
      $date = Carbon::today()->subDays($i);

      $hadirCount = Attendance::whereDate('logical_date', '=', $date, 'and')
        ->where('status', 'hadir')
        ->count('*');

      $tepatWaktuData[] = $hadirCount;
      $terlambatAlphaData[] = $totalKaryawan - $hadirCount;

      $labels[] = $daysIndo[$date->format('l')];
    }

    return [
      'datasets' => [
        [
          'label' => 'Hadir',
          'data' => $tepatWaktuData,
          'borderColor' => '#10b981', // Warna Emerald/Hijau Tailwind
          'backgroundColor' => 'rgba(16, 185, 129, 0.2)',
          'fill' => true, // Memberikan efek blok warna di bawah garis
          'tension' => 0.4, // Membuat garis menjadi melengkung (smooth)
        ],
        [
          'label' => 'Belum Absen / Alpha',
          'data' => $terlambatAlphaData,
          'borderColor' => '#ef4444', // Warna Merah Tailwind
          'backgroundColor' => 'rgba(239, 68, 68, 0.2)',
          'fill' => true,
          'tension' => 0.4,
        ],
      ],
      // Label sumbu X (Bawah)
      'labels' => $labels,
    ];
  }

  protected function getType(): string
  {
    return 'line';
  }
}
