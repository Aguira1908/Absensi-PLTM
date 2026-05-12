<?php

namespace App\Filament\Widgets;

use App\Models\Attendance;
use App\Models\User;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class DashboardStatsOverview extends StatsOverviewWidget
{
  protected static ?int $sort = 1;

  protected function getStats(): array
  {
    $totalKaryawan = User::count('*');
    $today = Carbon::today();

    $hadirHariIni = Attendance::whereDate('logical_date', '=', $today, 'and')
      ->where('status', 'hadir')
      ->count('*');

    $terlambatAtauAlpha = $totalKaryawan - $hadirHariIni;

    $trendData = [];
    for ($i = 6; $i >= 0; $i--) {
      $date = Carbon::today()->subDays($i);
      $count = Attendance::whereDate('logical_date', '=', $date, 'and')
        ->where('status', 'hadir')
        ->count('*');
      $trendData[] = $count;
    }

    return [
      Stat::make('Total Karyawan', (string) $totalKaryawan)
        ->description('Seluruh karyawan aktif')
        ->descriptionIcon('heroicon-m-users')
        ->color('primary'),

      Stat::make('Hadir Hari Ini', (string) $hadirHariIni)
        ->description('Karyawan yang telah hadir')
        ->descriptionIcon('heroicon-m-arrow-trending-up')
        ->color('success')
        ->chart($trendData),

      Stat::make('Belum Absen / Alpha', (string) $terlambatAtauAlpha)
        ->description('Perlu ditinjau')
        ->descriptionIcon('heroicon-m-arrow-trending-down')
        ->color('danger'),
    ];
  }
}
