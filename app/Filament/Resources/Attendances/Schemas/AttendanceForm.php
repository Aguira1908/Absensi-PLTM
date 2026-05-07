<?php

namespace App\Filament\Resources\Attendances\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Form;
use Filament\Schemas\Schema;

class AttendanceForm
{
  public static function configure(Schema $schema): Schema
  {
    return $schema
      ->schema([
        \Filament\Schemas\Components\Section::make('Informasi Dasar')
          ->description('Data karyawan, shift, dan tanggal logis absensi.')
          ->icon('heroicon-o-information-circle')
          ->schema([
            Select::make('user_id')
              ->label('Karyawan')
              ->relationship('user', 'name')
              ->searchable()
              ->preload()
              ->required(),
            Select::make('shift_id')
              ->label('Shift')
              ->relationship('shift', 'name')
              ->searchable()
              ->preload()
              ->required(),
            DatePicker::make('logical_date')
              ->label('Tanggal Logis')
              ->required(),
            Select::make('status')
              ->label('Status')
              ->options([
                'hadir' => 'Hadir',
                'izin' => 'Izin',
                'sakit' => 'Sakit',
                'alpa' => 'Alpa',
              ])
              ->required(),
            TextInput::make('reason')
              ->label('Catatan/Alasan')
              ->maxLength(255)
              ->columnSpanFull(),
          ])
          ->columns(2),

        \Filament\Schemas\Components\Section::make('Data Clock In (Masuk)')
          ->icon('heroicon-o-arrow-right-on-rectangle')
          ->schema([
            DateTimePicker::make('clock_in_time')
              ->label('Waktu Masuk'),
            TextInput::make('clock_in_lat')
              ->label('Latitude')
              ->numeric(),
            TextInput::make('clock_in_lng')
              ->label('Longitude')
              ->numeric(),
            FileUpload::make('clock_in_photo')
              ->label('Foto Masuk')
              ->image()
              ->directory('attendances/clock_in')
              ->columnSpanFull(),
          ])
          ->columns(3),

        \Filament\Schemas\Components\Section::make('Data Clock Out (Pulang)')
          ->icon('heroicon-o-arrow-left-on-rectangle')
          ->schema([
            DateTimePicker::make('clock_out_time')
              ->label('Waktu Pulang'),
            TextInput::make('clock_out_lat')
              ->label('Latitude')
              ->numeric(),
            TextInput::make('clock_out_lng')
              ->label('Longitude')
              ->numeric(),
            FileUpload::make('clock_out_photo')
              ->label('Foto Pulang')
              ->image()
              ->directory('attendances/clock_out')
              ->columnSpanFull(),
          ])
          ->columns(3),
      ]);
  }
}
