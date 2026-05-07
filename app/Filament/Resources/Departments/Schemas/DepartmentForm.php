<?php

namespace App\Filament\Resources\Departments\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Section;
use Filament\Schemas\Schema;

class DepartmentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Departemen')
                    ->description('Detail nama departemen dan status aktifnya.')
                    ->icon('heroicon-o-building-office')
                    ->schema([
                        TextInput::make('name')
                            ->label('Nama Departemen')
                            ->required()
                            ->maxLength(255),
                        Toggle::make('is_active')
                            ->label('Status Aktif')
                            ->default(true)
                            ->required(),
                    ])
                    ->columns(1),

                Section::make('Manajer Departemen')
                    ->description('Tentukan siapa yang menjadi atasan/manajer di departemen ini.')
                    ->icon('heroicon-o-user-circle')
                    ->schema([
                        Select::make('manager_id')
                            ->label('Manajer (Atasan)')
                            ->relationship('manager', 'name')
                            ->searchable()
                            ->preload()
                            ->placeholder('Pilih Manajer (Opsional)'),
                    ])
                    ->columns(1),
            ]);
    }
}
