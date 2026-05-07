<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Section;
use Filament\Forms\Form;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Hash;

class UserForm
{
  public static function configure(Schema $schema): Schema
  {
    return $schema
      ->schema([
        \Filament\Schemas\Components\Section::make('Informasi Akun')
          ->description('Detail login dan identitas pengguna.')
          ->icon('heroicon-o-user')
          ->schema([
            TextInput::make('name')
              ->label('Nama Lengkap')
              ->required()
              ->maxLength(255),
            TextInput::make('email')
              ->label('Alamat Email')
              ->email()
              ->required()
              ->unique(ignoreRecord: true)
              ->maxLength(255),
            TextInput::make('password')
              ->label('Password')
              ->password()
              ->dehydrateStateUsing(fn(string $state): string => Hash::make($state))
              ->dehydrated(fn(?string $state): bool => filled($state))
              ->required(fn(string $operation): bool => $operation === 'create')
              ->maxLength(255),
            Toggle::make('is_active')
              ->label('Status Aktif')
              ->default(true),
          ])
          ->columns(2),

        \Filament\Schemas\Components\Section::make('Penempatan & Hak Akses')
          ->description('Atur role, departemen, dan shift default pengguna.')
          ->icon('heroicon-o-briefcase')
          ->schema([
            Select::make('role_id')
              ->label('Role')
              ->relationship('role', 'name')
              ->searchable()
              ->preload(),
            Select::make('department_id')
              ->label('Departemen')
              ->relationship('department', 'name')
              ->searchable()
              ->preload(),
            Select::make('default_shift_id')
              ->label('Shift Default')
              ->relationship('defaultShift', 'name')
              ->searchable()
              ->preload(),
          ])
          ->columns(2),
      ]);
  }
}
