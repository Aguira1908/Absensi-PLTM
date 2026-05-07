<?php

namespace App\Filament\Resources\Shifts\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Section;
use Filament\Schemas\Schema;

class ShiftForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Shift')
                    ->description('Detail aturan waktu kerja/shift.')
                    ->icon('heroicon-o-clock')
                    ->schema([
                        TextInput::make('name')
                            ->label('Nama Shift')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Contoh: Shift Pagi, Shift Malam'),
                        TimePicker::make('start_time')
                            ->label('Jam Masuk')
                            ->required()
                            ->seconds(false)
                            ->placeholder('08:00'),
                        TimePicker::make('end_time')
                            ->label('Jam Pulang')
                            ->required()
                            ->seconds(false)
                            ->placeholder('17:00'),
                        Toggle::make('is_cross_day')
                            ->label('Melewati Tengah Malam?')
                            ->helperText('Aktifkan jika shift ini dimulai hari ini tapi berakhir esok hari (contoh: 20:00 - 04:00).')
                            ->default(false)
                            ->required(),
                    ])
                    ->columns(2),
            ]);
    }
}
